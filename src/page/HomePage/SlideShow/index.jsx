import { Row, Col, Card } from "antd";
import * as S from "./style";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
function SlideShow() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    autoplay: true,
    arrows: false,
  };
  return (
    <S.SlideShowWrapper>
      <Row justify={"center"}>
        <Col span={24}>
          <Slider {...settings}>
            <S.SlideShowElement>
              <img src="/assets/img/SlideShow1.webp" alt="" />
            </S.SlideShowElement>
            <S.SlideShowElement>
              <img src="/assets/img/SlideShow2.webp" alt="" />
            </S.SlideShowElement>
            <S.SlideShowElement>
              <img src="/assets/img/SlideShow3.webp" alt="" />
            </S.SlideShowElement>
            <S.SlideShowElement>
              <img src="/assets/img/SlideShow4.webp" alt="" />
            </S.SlideShowElement>
            <S.SlideShowElement>
              <img src="/assets/img/SlideShow5.webp" alt="" />
            </S.SlideShowElement>
          </Slider>
        </Col>
      </Row>
    </S.SlideShowWrapper>
  );
}
export default SlideShow;
