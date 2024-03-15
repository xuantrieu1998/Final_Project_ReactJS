import { Row, Col, Card, Radio, notification, Form } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, Link } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaEye } from "react-icons/fa";

import * as S from "./styled";
import { ROUTES } from "../../../constants/routes";
import {
  addCartListRequest,
  updateCartListRequest,
} from "../../../redux/slices/cart.slice";
function ProductItem({ data }) {
  const [indexPrice, setIndexPrice] = useState(data.options[0]);
  const renderOptions = useMemo(
    () =>
      data.options.map((item, index) => {
        setIndexPrice(data.options[0]);
        return (
          <Radio.Button
            key={index}
            style={{ fontSize: 10, marginRight: 1 }}
            value={item}
          >
            {item}
          </Radio.Button>
        );
      }),
    [data.options]
  );

  const dispatch = useDispatch();

  const { cartList } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const handleAddToCart = () => {
    if (!userInfo.data.id) {
      return notification.error({
        message: "Bạn cần đăng nhập để sử dụng tính năng này",
      });
    }
    const indexIdProduct = cartList.data.findIndex(
      (item) =>
        item.productId === data.id &&
        userInfo.data.id === item.userId &&
        item.option === indexPrice
    );
    if (indexIdProduct === -1) {
      dispatch(
        addCartListRequest({
          productId: data.id,
          userId: userInfo.data.id,
          name: data.name,
          option: indexPrice,
          price: data.prices[indexPrice],
          quantity: 1,
          image: data.image.main,
          sale: data.sale,
        })
      );
      notification.success({
        message: "Đã thêm vào giỏ hàng thành công!!!",
      });
    } else {
      dispatch(
        updateCartListRequest({
          id: cartList.data[indexIdProduct].id,
          quantity: cartList.data[indexIdProduct].quantity + 1,
        })
      );
      notification.success({
        message: "Đã thêm vào giỏ hàng thành công!!!",
      });
    }
  };

  return (
    <>
      <Col xs={12} sm={12} md={8} lg={8} xl={6}>
        <S.productBox>
          <Card>
            <S.ProductImage>
              <img src={data.image.main} alt="" />
            </S.ProductImage>
            <S.ProductName>{data.name}</S.ProductName>
            {data.sale !== 0 ? (
              <>
                <S.ProductPrice>
                  <S.ProductPriceSale>
                    {data.prices[indexPrice]?.toLocaleString() + "đ"}
                  </S.ProductPriceSale>
                  {(
                    data.prices[indexPrice] -
                    data.prices[indexPrice] * data.sale
                  )?.toLocaleString()}
                  <S.ProductVnd>đ</S.ProductVnd>
                </S.ProductPrice>
                <S.ProductPercentSale>{data.sale * 100}%</S.ProductPercentSale>
              </>
            ) : (
              <S.ProductPrice>
                {data.prices[indexPrice]?.toLocaleString()}
                <S.ProductVnd>đ</S.ProductVnd>
              </S.ProductPrice>
            )}

            <Row justify={"center"}>
              <Col>
                <Radio.Group
                  buttonStyle="solid"
                  value={indexPrice}
                  onChange={(e) => setIndexPrice(e.target.value)}
                >
                  {renderOptions}
                </Radio.Group>
              </Col>
            </Row>
          </Card>
          <S.AddCart>
            <S.Item>
              <MdOutlineAddShoppingCart onClick={() => handleAddToCart()} />
            </S.Item>

            <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: data.id })}>
              <S.Item>
                <FaEye />
              </S.Item>
            </Link>
          </S.AddCart>
        </S.productBox>
      </Col>
    </>
  );
}
export default ProductItem;
