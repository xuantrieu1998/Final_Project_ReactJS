import { Row, Col } from "antd";

import * as S from "./style";

function Footer() {
  return (
    <S.FooterWrapper>
      <Row>
        <Col xs={3} sm={3} md={2} xl={1}>
          <img src="/assets/img/Final-logo.png" alt="" />
        </Col>
      </Row>
      <Row justify={"space-between"}>
        <Col xs={12} sm={12} md={8} xl={4}>
          <S.FooterList>
            <S.FooterElement>
              <S.FooterTitle>Tổng đài:</S.FooterTitle>
            </S.FooterElement>
            <S.FooterElement>
              <S.FooterElementTitle>Mua hàng:</S.FooterElementTitle> 0901927763
            </S.FooterElement>
            <S.FooterElement>
              <S.FooterElementTitle>Khiếu nại:</S.FooterElementTitle> 0901927763
            </S.FooterElement>
          </S.FooterList>
        </Col>
        <Col xs={12} sm={12} md={8} xl={4}>
          <S.FooterList>
            <S.FooterElement>
              <S.FooterTitle>Hệ thống cửa hàng</S.FooterTitle>
              <S.FooterElement>Xem 97 cửa hàng</S.FooterElement>
              <S.FooterElement>Nội quy cửa hàng</S.FooterElement>
              <S.FooterElement>Chất lượng phục vụ</S.FooterElement>
              <S.FooterElement>Chính sách bảo hành & đổi trả</S.FooterElement>
            </S.FooterElement>
          </S.FooterList>
        </Col>
        <Col xs={12} sm={12} md={8} xl={4}>
          <S.FooterList>
            <S.FooterElement>
              <S.FooterTitle>Hỗ trợ khách hàng</S.FooterTitle>
              <S.FooterElement>Điều kiện giao dịch chung</S.FooterElement>
              <S.FooterElement>Hướng dẫn mua hàng online</S.FooterElement>
              <S.FooterElement>Chính sách giao hàng</S.FooterElement>
              <S.FooterElement>Hướng dẫn thanh toán</S.FooterElement>
            </S.FooterElement>
          </S.FooterList>
        </Col>
        <Col xs={12} sm={12} md={8} xl={4}>
          <S.FooterList>
            <S.FooterElement>
              <S.FooterTitle>AppleMeoMeo</S.FooterTitle>
              <S.FooterElement>Giới thiệu AppleMeoMeo</S.FooterElement>
              <S.FooterElement>Bán hàng danh nghiệp</S.FooterElement>
              <S.FooterElement>Chính sách xử lí dữ liệu cá nhân</S.FooterElement>
              <S.FooterElement>Xem bản mobile</S.FooterElement>
            </S.FooterElement>
          </S.FooterList>
        </Col>
        <Col xs={12} sm={12} md={8} xl={4}>
          <S.FooterList>
            <S.FooterElement>
              <S.FooterTitle>Trung tâm bảo hành AppleCare</S.FooterTitle>
              <S.FooterElement>Giới thiệu AppleCare</S.FooterElement>
            </S.FooterElement>
          </S.FooterList>
        </Col>
      </Row>
      <S.FooterLine />
      <S.FooterDes>
        © 2018. Công ty cổ phần Thế Giới Di Động. GPDKKD: 0303217354 do sở KH & ĐT
        TP.HCM cấp ngày 02/01/2007.
      </S.FooterDes>
    </S.FooterWrapper>
  );
}
export default Footer;
