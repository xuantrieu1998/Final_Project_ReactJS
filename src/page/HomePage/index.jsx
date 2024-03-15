import { Row, Col, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";

import * as S from "./style";
import SlideShow from "./SlideShow";
import { getProductListRequest } from "../../redux/slices/product.slice";
import ProductItem from "../Product/ProductItem";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductListRequest({}));
  }, []);
  const sortBy = require("lodash/sortBy");
  const reverse = require("lodash/reverse");
  const productHot = useMemo(
    () => sortBy(productList.data, "visit"),
    [productList.data]
  );
  const productNew = useMemo(() => reverse(productHot), [productHot]);

  const iphoneProduct = useMemo(
    () => productList.data.filter((item) => item.typeId === 1),
    [productList.data]
  );
  const renderIphoneProduct = useMemo(
    () =>
      iphoneProduct.map((item, index) => {
        return <ProductItem key={index} data={item} />;
      }),
    [productList.data]
  );

  const ipadProduct = useMemo(
    () => productList.data.filter((item) => item.typeId === 3),
    [productList.data]
  );
  const accesspryProduct = useMemo(
    () => productList.data.filter((item) => item.typeId === 6),
    [productList.data]
  );
  const renderAccesspryProduct = useMemo(
    () =>
      accesspryProduct.map((item, index) => {
        return <ProductItem key={index} data={item} />;
      }),
    [productList.data]
  );
  const renderIpadProduct = useMemo(
    () =>
      ipadProduct.map((item, index) => {
        return <ProductItem key={index} data={item} />;
      }),
    [productList.data]
  );

  const macBookProduct = useMemo(
    () => productList.data.filter((item) => item.typeId === 2),
    [productList.data]
  );
  const renderMacbookProduct = useMemo(
    () =>
      macBookProduct.map((item, index) => {
        return <ProductItem key={index} data={item} />;
      }),
    [productList.data]
  );
  const appleWatchProduct = useMemo(
    () => productList.data.filter((item) => item.typeId === 5),
    [productList.data]
  );
  const renderAppleWatchProduct = useMemo(
    () =>
      appleWatchProduct.map((item, index) => {
        return <ProductItem key={index} data={item} />;
      }),
    [productList.data]
  );
  const airPodProduct = useMemo(
    () => productList.data.filter((item) => item.typeId === 4),
    [productList.data]
  );
  const renderAirPodProduct = useMemo(
    () =>
      airPodProduct.map((item, index) => {
        return <ProductItem key={index} data={item} />;
      }),
    [productList.data]
  );

  const renderProductNew = useMemo(
    () =>
      productNew.map((item, index) => {
        return <ProductItem key={index} data={item} />;
      }),
    [productNew]
  );

  return (
    <S.HomePageWrapper>
      <S.HomePageContainer>
        <S.TitleHomPage>Sản phẩm hot</S.TitleHomPage>
        <Card>
          <Row
            style={{ overflow: "auto", padding: "32px 0 32px 0" }}
            wrap={false}
            gutter={[22, 22]}
          >
            {renderProductNew}
          </Row>
        </Card>
        <S.TitleHomPage>Iphone</S.TitleHomPage>
        <Card>
          <Row
            style={{ overflow: "auto", padding: "12px 0 24px 0" }}
            wrap={false}
            gutter={[22, 22]}
          >
            {renderIphoneProduct}
          </Row>
        </Card>
        <S.TitleHomPage>Tin tức</S.TitleHomPage>
        <Card>
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={14}>
              <img src="/assets/img/AppleVisonPro.webp" alt="" />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={10}>
              <h2>
                Apple Vision Pro - Công nghệ điện toán không gian tiên tiến với hiệu
                suất chip kép vượt trội
              </h2>
              <p style={{ marginTop: 12 }}>
                <strong>Apple Vision Pro</strong> là siêu phẩm công nghệ điện toán
                không gian thế hệ mới, kết hợp hoàn hảo giữa nội dung kỹ thuật số với
                không gian vật lý của bạn. Với những thao tác điều hướng hết sức đơn
                giản bằng mắt, tay và giọng nói, Apple Vision Pro sẽ đem tới cho bạn
                những trải nghiệm sử dụng thực sự mới mẻ, đột phá mà bạn chưa từng
                thấy trước đây.
              </p>
              <p>
                <strong>Thiết kế nhỏ gọn tích hợp nhiều công nghệ tân tiến</strong>
              </p>
              <p style={{ marginTop: 12 }}>
                Apple Vision Pro là kết quả của công trình nghiên cứu kéo dài hàng
                thập kỷ. Sản phẩm được thiết kế bởi mảnh kính nhiều lớp tạo hình ba
                chiều. Bao quanh tấm kính là khung nhôm được uốn cong ôm sát khuôn
                mặt của người dùng.
              </p>
              <Link>Xem thêm...</Link>
            </Col>
          </Row>
        </Card>
        <S.TitleHomPage>Ipad</S.TitleHomPage>
        <Card>
          <Row
            style={{ overflow: "auto", padding: "12px 0 24px 0" }}
            wrap={false}
            gutter={[22, 22]}
          >
            {renderIpadProduct}
          </Row>
        </Card>
        <S.TitleHomPage>MacBook</S.TitleHomPage>
        <Card>
          <Row
            style={{ overflow: "auto", padding: "12px 0 24px 0" }}
            wrap={false}
            gutter={[22, 22]}
          >
            {renderMacbookProduct}
          </Row>
        </Card>
        <S.TitleHomPage>Apple Watch</S.TitleHomPage>
        <Card>
          <Row
            style={{ overflow: "auto", padding: "12px 0 24px 0" }}
            wrap={false}
            gutter={[22, 22]}
          >
            {renderAppleWatchProduct}
          </Row>
        </Card>
        <S.TitleHomPage>Air Pod</S.TitleHomPage>
        <Card style={{ marginBottom: 20 }}>
          <Row
            style={{ overflow: "auto", padding: "12px 0 24px 0" }}
            wrap={false}
            gutter={[22, 22]}
          >
            {renderAirPodProduct}
          </Row>
        </Card>
        <S.TitleHomPage>Phụ kiện</S.TitleHomPage>
        <Card style={{ marginBottom: 20 }}>
          <Row
            style={{ overflow: "auto", padding: "12px 0 24px 0" }}
            wrap={false}
            gutter={[22, 22]}
          >
            {renderAccesspryProduct}
          </Row>
        </Card>
        <Row>
          <Col span={24}>
            <S.VideoWrapper>
              <video
                src="/assets/img/videoTopZone.mp4"
                width="100%"
                height="100%"
                autoPlay
                muted
                loop
              />
              <S.ContentVideoContainer>
                <Row justify={"center"}>
                  <Col span={4}>
                    <img src="/assets/img/xoanenLogo.png" alt="" />
                  </Col>
                </Row>
                <Row justify={"center"}>
                  <Col span={18}>
                    <S.ContentVideo>
                      Tại Apple MeoMeo, khách hàng yêu mến hệ sinh thái Apple sẽ tìm
                      thấy đầy đủ và đa dạng nhất các sản phẩm như iPhone, iPad,
                      Apple Watch, MacBook và các phụ kiện Apple... với không gian
                      mua sắm đẳng cấp, hiện đại.
                    </S.ContentVideo>
                  </Col>
                </Row>
              </S.ContentVideoContainer>
            </S.VideoWrapper>
          </Col>
        </Row>
      </S.HomePageContainer>
    </S.HomePageWrapper>
  );
}
export default HomePage;
