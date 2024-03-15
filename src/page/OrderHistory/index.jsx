import { Row, Table, Col, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useEffect } from "react";
import { useNavigate, generatePath, Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import {
  getOrderListRequest,
  deleteOrderDetailRequest,
} from "../../redux/slices/order.slice";
import * as S from "./style";

function OderHistory() {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);
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
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Hủy",
      dataIndex: "delete",
    },
  ];
  useEffect(() => {
    dispatch(
      getOrderListRequest({
        userId: userInfo.data.id,
      })
    );
  }, []);

  const handleDeleteOrderDetail = (id) => {
    dispatch(deleteOrderDetailRequest({ id: id }));
  };
  const data = [];

  orderList.data.map((item, index) =>
    data.push({
      id: item.id,
      image: <img style={{ width: 70 }} src={item.image} alt="" />,
      name: item.productName,
      status: item.status,
      quantity: item.quantity,
      price: item.priceSum?.toLocaleString() + " VND",
      delete:
        item.status !== "Giao hàng thành công" ? (
          <Button
            disabled={item.status !== "Đang chờ xác nhận đơn hàng"}
            onClick={() => handleDeleteOrderDetail(item.id)}
            type="primary"
          >
            Hủy
          </Button>
        ) : (
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.productId })}
          >
            <Button type="primary">Đánh giá</Button>
          </Link>
        ),
      order: item.order,
    })
  );
  return (
    <S.OrderHistoryWrapper>
      <S.OrderHistoryTitle>Lịch sử mua hàng</S.OrderHistoryTitle>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            rowKey="id"
            dataSource={data}
            pagination={false}
            expandable={{
              expandedRowRender: (item) => (
                <Row>
                  <Col span={24}>
                    <S.OrderRowTitle>
                      <S.orderTitle>Mã đơn hàng: </S.orderTitle> {item.order.id}
                    </S.OrderRowTitle>
                    <S.OrderRowTitle>
                      <S.orderTitle>Tên khách hàng: </S.orderTitle>
                      {item.order.fullName}
                    </S.OrderRowTitle>
                    <S.OrderRowTitle>
                      <S.orderTitle>Địa chỉ giao hàng: </S.orderTitle>
                      {item.order.address},{item.order.wardName},
                      {item.order.districtName}, {item.order.cityName}
                    </S.OrderRowTitle>
                  </Col>
                </Row>
              ),
            }}
          />
        </Col>
      </Row>
    </S.OrderHistoryWrapper>
  );
}

export default OderHistory;
