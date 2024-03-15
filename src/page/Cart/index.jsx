import {
  Button,
  Table,
  ConfigProvider,
  InputNumber,
  Card,
  Row,
  Col,
  notification,
} from "antd";
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import {
  updateCartListRequest,
  deleteCartListRequest,
  orderProductList,
} from "../../redux/slices/cart.slice";
import * as S from "./style";

function Cart() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartList, orderList } = useSelector((state) => state.cart);

  const cartListUser = useMemo(
    () => cartList.data.filter((item) => item.userId === userInfo.data.id),
    [cartList.data, userInfo.data.id]
  );
  const totalPrice = useMemo(
    () =>
      orderList.data.reduce((total, item) => total + item.price * item.quantity, 0),
    [orderList]
  );
  const SalePrice = useMemo(
    () =>
      orderList.data.reduce(
        (total, item) => total + item.price * item.quantity * item.sale,
        0
      ),
    [orderList]
  );
  const dispatch = useDispatch();
  const handleChangeQuantity = (productId, value) => {
    dispatch(
      updateCartListRequest({
        id: productId,
        quantity: value,
      })
    );
  };
  const handleDeleteCart = (id) => {
    dispatch(deleteCartListRequest({ id: id }));
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Bộ nhớ",
      dataIndex: "option",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Giá gốc",
      dataIndex: "price",
    },
    {
      title: "Giá sau khi giảm",
      dataIndex: "priceSale",
    },

    {
      title: "Xóa",
      dataIndex: "delete",
    },
  ];
  console.log(cartListUser);
  const data = [];
  cartListUser.map((item, index) => {
    const priceSum = Number(
      item.sale === 0
        ? item.price * item.quantity
        : item.price * item.quantity - item.price * item.quantity * item.sale
    );
    data.push({
      key: index,
      name: item.productName,
      image: <img style={{ width: 70 }} src={item.image} alt="" />,
      option: item.option,
      id: item.id,
      userId: item.userId,
      quantityCart: item.quantity,
      imageCart: item.image,
      priceCart: item.price,
      sale: item.sale,
      productId: item.productId,
      priceSum: priceSum,
      quantity: (
        <InputNumber
          onChange={(value) => handleChangeQuantity(item.id, value)}
          value={item.quantity}
          min={1}
          max={99}
        />
      ),
      price: (
        <div
          style={{
            fontStyle: "italic",
            textDecoration: "line-through",
            color: "gray",
          }}
        >
          {(item.price * item.quantity).toLocaleString()}đ
        </div>
      ),
      priceSale:
        item.sale === 0
          ? (item.price * item.quantity).toLocaleString() + "đ"
          : (
              item.price * item.quantity -
              item.price * item.quantity * item.sale
            ).toLocaleString() + "đ",
      delete: <Button onClick={() => handleDeleteCart(item.id)}>Xóa</Button>,
    });
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (index, value) => {
    dispatch(
      orderProductList({
        data: value.map((item) => {
          return {
            userId: item.userId,
            id: item.id,
            name: item.name,
            option: item.option,
            image: item.imageCart,
            price: item.priceCart,
            quantity: item.quantityCart,
            sale: item.sale,
            productId: item.productId,
            priceSum: item.priceSum,
          };
        }),
      })
    );
    setSelectedRowKeys(index);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#595959",
            borderRadius: "0",
          },
        }}
      >
        <Table
          pagination={false}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
        <Row>
          <Card title="Thành tiền" style={{ width: "100%" }}>
            <Row>
              <Col span={24}>
                <S.TitlePrice>Tổng tiền hàng:</S.TitlePrice>
                <S.TitlePriceSum>{totalPrice.toLocaleString()}</S.TitlePriceSum>
                <S.Vnd> đ</S.Vnd>
              </Col>
              <Col span={24}>
                <S.TitlePrice>Giảm giá:</S.TitlePrice>
                <span
                  style={{
                    color: "gray",
                    fontStyle: "italic",
                    textDecoration: "line-through",
                    fontSize: 14,
                  }}
                >
                  {SalePrice.toLocaleString()}
                </span>{" "}
                <S.Vnd>đ</S.Vnd>
              </Col>
              <Col span={24}>
                <S.TitlePrice>Tổng thanh toán:</S.TitlePrice>
                <S.TitlePriceSum>
                  {(totalPrice - SalePrice).toLocaleString()}
                </S.TitlePriceSum>
                <S.Vnd> đ</S.Vnd>
              </Col>
            </Row>
          </Card>
        </Row>
      </ConfigProvider>
      <Row style={{ marginTop: 12 }}>
        <Col span={24}>
          <Button
            onClick={() =>
              orderList.data.length === 0
                ? notification.error({
                    message: "Bạn chưa lựa chọn sản phẩm!",
                  })
                : navigate(ROUTES.USER.CHECKOUT)
            }
            type="primary"
            style={{ width: "100%", fontWeight: "bold" }}
          >
            Mua hàng
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
