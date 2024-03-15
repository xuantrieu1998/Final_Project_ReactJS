import {
  Row,
  Col,
  Card,
  Rate,
  Radio,
  Button,
  InputNumber,
  notification,
  Form,
  Input,
  Space,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import * as S from "./style";
import { ROUTES } from "../../constants/routes";
import ReviewListComment from "./ReviewList";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import ProductItem from "../Product/ProductItem";

import {
  getProductDetailRequest,
  getProductListRequest,
} from "../../redux/slices/product.slice";
import {
  addCartListRequest,
  updateCartListRequest,
  orderProductList,
} from "../../redux/slices/cart.slice";
import { getOrderListRequest } from "../../redux/slices/order.slice";
import { addReviewRequest, getReviewRequest } from "../../redux/slices/review.slice";
import {
  unFavoriteProductRequest,
  favoriteProductRequest,
} from "../../redux/slices/favorite.slice";
function ProductDetail() {
  const [reviewForm] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);
  const { reviewList } = useSelector((state) => state.review);
  const { productDetail } = useSelector((state) => state.product);
  const { productList } = useSelector((state) => state.product);
  const { orderList } = useSelector((state) => state.order);

  const [indexPrice, setIndexPrice] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [inputQuantity, setInputQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: parseInt(id) }));
    dispatch(getReviewRequest({ productId: parseInt(id) }));
    dispatch(getProductListRequest({}));
    dispatch(getOrderListRequest({ userId: userInfo.data.id }));
  }, []);
  const isFavorite = useMemo(() => {
    return productDetail.data.favorites?.some(
      (item) => item.userId === userInfo.data.id
    );
  }, [productDetail.data, userInfo.data.id]);

  const productRate = useMemo(() => {
    const totalRate = reviewList.data?.reduce((total, item) => total + item.rate, 0);
    return reviewList.data?.length ? totalRate / reviewList.data?.length : 0;
  }, [reviewList.data]);

  const handleAddToCart = () => {
    if (!userInfo.data.id) {
      return notification.error({
        message: "Bạn cần đăng nhập để sử dụng tính năng này",
      });
    }
    const indexIdProduct = cartList.data.findIndex(
      (item) =>
        item.productId === productDetail.data.id &&
        userInfo.data.id === item.userId &&
        item.option === indexPrice
    );
    if (indexIdProduct === -1) {
      dispatch(
        addCartListRequest({
          productId: productDetail.data.id,
          userId: userInfo.data.id,
          name: productDetail.data.name,
          option: indexPrice,
          price: productDetail.data.prices[indexPrice],
          quantity: inputQuantity,
          image: productDetail.data.image.main,
          sale: productDetail.data.sale,
        })
      );
      notification.success({
        message: "Đã thêm vào giỏ hàng thành công!!!",
      });
    } else {
      dispatch(
        updateCartListRequest({
          id: cartList.data[indexIdProduct].id,
          quantity: cartList.data[indexIdProduct].quantity + inputQuantity,
        })
      );
      notification.success({
        message: "Đã thêm vào giỏ hàng thành công!!!",
      });
    }
  };
  const handleToggleFavorite = () => {
    if (!userInfo.data.id)
      return notification.error({
        message: "Bạn cần đăng nhập để thực hiện tính năng này",
      });
    if (isFavorite) {
      const favoriteData = productDetail.data.favorites.find(
        (item) => item.userId === userInfo.data.id
      );
      if (favoriteData) {
        dispatch(unFavoriteProductRequest({ id: favoriteData.id }));
        dispatch(getProductDetailRequest({ id: parseInt(id) }));
      }
    } else {
      dispatch(
        favoriteProductRequest({
          data: {
            userId: userInfo.data.id,
            productId: productDetail.data.id,
          },
        })
      );
      dispatch(getProductDetailRequest({ id: parseInt(id) }));
    }
  };
  const handleBuyNow = () => {
    if (!userInfo.data.id) {
      return notification.error({
        message: "Bạn cần đăng nhập để sử dụng tính năng này",
      });
    }
    const PriceSum =
      productDetail.data.prices[indexPrice] * inputQuantity -
      productDetail.data.prices[indexPrice] *
        inputQuantity *
        productDetail.data.sale;
    dispatch(
      orderProductList({
        data: [
          {
            userId: userInfo.data.id,
            id: "user",
            name: productDetail.data.name,
            option: indexPrice,
            image: productDetail.data.image.main,
            price: productDetail.data.prices[indexPrice],
            quantity: inputQuantity,
            sale: productDetail.data.sale,
            productId: productDetail.data.id,
            priceSum: PriceSum,
          },
        ],
      })
    );
    navigate(ROUTES.USER.CHECKOUT);
  };
  const handleAddReview = (value) => {
    dispatch(
      addReviewRequest({
        data: {
          ...value,
          productId: productDetail.data.id,
          userId: userInfo.data.id,
          userAvatar: userInfo.data.avatar,
          fullName: userInfo.data.fullName,
        },
      })
    );
    reviewForm.setFieldsValue({
      rate: 0,
      comment: "",
    });
    dispatch(getReviewRequest({ productId: parseInt(id) }));
  };
  const renderSlideProduct = useMemo(
    () =>
      productDetail.data.image?.slideShow.map((item, index) => (
        <div key={index}>
          <img src={item} alt="" />
        </div>
      )),
    [productDetail.data]
  );
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const renderOptions = useMemo(
    () =>
      productDetail.data.options?.map((item, index) => {
        setIndexPrice(productDetail.data.options[0]);
        return (
          <Radio.Button key={index} value={item}>
            {item}
          </Radio.Button>
        );
      }),
    [productDetail.data]
  );
  const renderReviewForm = useMemo(() => {
    const isCheck = orderList.data?.some(
      (item) => item.productId === productDetail.data.id
    );
    if (!isCheck) {
      return (
        <Row>
          <Col>Bạn cần mua sản phẩm để có thể đánh giá</Col>
        </Row>
      );
    }

    if (userInfo.data.id) {
      const isReview = reviewList.data?.some(
        (item) => item.userId === userInfo.data.id
      );
      if (isReview) {
        return (
          <Row style={{ marginBottom: 12 }}>
            <Col span={24}>
              <Card style={{ backgroundColor: "gray" }}>
                Bạn đã đánh giá sản phẩm này rồi!!
              </Card>
            </Col>
          </Row>
        );
      }

      return (
        <S.FormReviewWrapper>
          <Form
            name="reviewForm"
            form={reviewForm}
            initialValues={{
              rate: 0,
              comment: "",
            }}
            layout="vertical"
            onFinish={(value) => handleAddReview(value)}
          >
            <Form.Item
              name="rate"
              rules={[
                { required: true, message: "vui lòng chọn đánh giá" },
                {
                  min: 1,
                  type: "number",
                  message: " Đánh giá ít nhất 1 sao",
                },
              ]}
              label="Đánh giá chất lượng:"
            >
              <Rate style={{ color: "#ffa940" }} />
            </Form.Item>
            <Form.Item
              name="comment"
              rules={[{ required: true, message: "Không được để trống!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Button htmlType="submit" type="primary">
              Gửi đánh giá
            </Button>
          </Form>
        </S.FormReviewWrapper>
      );
    }
    return (
      <Row>
        <Col>Bạn chưa đăng nhập</Col>
      </Row>
    );
  }, [reviewList.data, userInfo.data.id, orderList.data, productDetail.data]);
  const renderReviewList = useMemo(
    () =>
      reviewList.data?.map((item, index) => {
        return <ReviewListComment key={index} data={item} />;
      }),
    [reviewList.data]
  );
  const productSimilar = useMemo(
    () =>
      productList.data.filter(
        (item) => item.type.id === productDetail.data.type?.id
      ),
    [productList.data, productDetail.data]
  );
  const renderProductSimilar = useMemo(
    () =>
      productSimilar.map((item, index) => {
        return <ProductItem key={index} data={item} />;
      }),
    [productSimilar, productList.data, productDetail.data]
  );
  return (
    <S.ProductDetailWrapper>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card>
            <Slider autoplay={true} {...settings}>
              {renderSlideProduct}
            </Slider>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <S.ProductDetailType>
              {productDetail.data.type?.name}
            </S.ProductDetailType>
            <S.ProductDetailName>{productDetail.data.name}</S.ProductDetailName>
            <S.ProductDetailRate>
              <Rate
                value={productRate}
                disabled
                style={{ color: "#ffa940", marginRight: 8 }}
                allowHalf
              />
              ( {reviewList.data?.length} ) Đánh giá |
              <Button
                size="large"
                type="text"
                danger={isFavorite}
                icon={
                  isFavorite ? (
                    <HeartFilled style={{ fontSize: 24 }} />
                  ) : (
                    <HeartOutlined style={{ fontSize: 24, color: "#414141" }} />
                  )
                }
                onClick={() => handleToggleFavorite()}
              ></Button>
              {productDetail.data?.favorites?.length || 0} Lượt thích
            </S.ProductDetailRate>

            <S.ProductOptions>
              <Radio.Group
                buttonStyle="solid"
                value={indexPrice}
                onChange={(e) => setIndexPrice(e.target.value)}
              >
                {renderOptions}
              </Radio.Group>
            </S.ProductOptions>
            {!productDetail.data.sale !== 0 ? (
              <>
                <S.ProductPrice>
                  <S.ProductPriceSale>
                    {indexPrice !== "" &&
                      (
                        productDetail.data.prices[indexPrice] * inputQuantity
                      )?.toLocaleString()}
                  </S.ProductPriceSale>
                  {indexPrice !== ""
                    ? (
                        (productDetail.data.prices[indexPrice] -
                          productDetail.data.prices[indexPrice] *
                            productDetail.data.sale) *
                        inputQuantity
                      )?.toLocaleString()
                    : 0}
                  <S.ProductVnd> đ</S.ProductVnd>
                </S.ProductPrice>
              </>
            ) : (
              <S.ProductPrice>
                {indexPrice !== ""
                  ? productDetail.data.prices[indexPrice] *
                    inputQuantity?.toLocaleString()
                  : 0}
                <S.ProductVnd>đ</S.ProductVnd>
              </S.ProductPrice>
            )}

            <InputNumber
              value={inputQuantity}
              min={1}
              max={99}
              onChange={(value) => setInputQuantity(value)}
            />
            <Card
              style={{ backgroundColor: "#bfbfbf", marginTop: 16, borderRadius: 8 }}
              title="Khuyến mãi:"
            >
              Giá trị khuyến mãi dự kiến áp dụng đến 23:00 | 31/3
              <ul>
                <li>
                  Thu cũ đổi mới: Giảm đến 2 triệu (Tùy Model máy cũ, Không kèm thanh
                  toán qua cổng online, mua kèm) <a href="">Xem chi tiết</a>
                </li>
                <li>
                  Hoàn tiền nếu ở đâu rẻ hơn(Trong vòng 7 ngày, Chỉ áp dụng tại siêu
                  thị) <a href="">Xem chi tiết</a>
                </li>
                <li>
                  Nhập mã VNPAYTGDD1 giảm từ 50,000đ đến 200,000đ (Áp dụng tùy giá
                  trị đơn hàng) khi thanh toán qua VNPAY-QR{" "}
                  <a href="">Xem chi tiết</a>
                </li>
              </ul>
            </Card>
            <Row style={{ marginTop: 15 }} gutter={[16, 16]}>
              <Col span={12}>
                <Button
                  onClick={() => handleBuyNow()}
                  size="large"
                  type="primary"
                  style={{ width: "100%" }}
                >
                  Mua ngay
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  onClick={() => handleAddToCart()}
                  size="large"
                  style={{ width: "100%" }}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <S.ContentWrapper showMore={showMore}>
            <Card title="Giới thiệu chi tiết sản phẩm">
              <div
                dangerouslySetInnerHTML={{ __html: productDetail.data.content }}
              ></div>
            </Card>
            <S.BackGroundContent>
              {showMore ? (
                <S.ShowMoreContent onClick={() => setShowMore(false)}>
                  Thu gọn
                </S.ShowMoreContent>
              ) : (
                <S.ShowMoreContent onClick={() => setShowMore(true)}>
                  Xem thêm
                </S.ShowMoreContent>
              )}
            </S.BackGroundContent>
          </S.ContentWrapper>
        </Col>
        <Col span={12}>
          <Card title="Đánh giá sản phẩm">
            {renderReviewForm}
            {renderReviewList}
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Sản phẩm tương tự">
            <Row gutter={[20, 20]} wrap={false} style={{ overflow: "auto" }}>
              {renderProductSimilar}
            </Row>
          </Card>
        </Col>
      </Row>
    </S.ProductDetailWrapper>
  );
}

export default ProductDetail;
