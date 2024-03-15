import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Radio,
  Button,
  notification,
} from "antd";
import * as S from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";

import { ROUTES } from "../../constants/routes";
import {
  getCityRequest,
  getDistrictRequest,
  getWardRequest,
} from "../../redux/slices/location.slice";
import { orderListRequest } from "../../redux/slices/order.slice";

function Checkout() {
  const [checkoutForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderList } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );
  console.log(orderList);
  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.setFieldsValue({
        fullName: userInfo.data.fullName,
        email: userInfo.data.email,
        phoneNumber: userInfo.data.phoneNumber,
      });
    }
  }, []);
  useEffect(() => {
    dispatch(getCityRequest());
    dispatch(getDistrictRequest());
    dispatch(getWardRequest());
  }, []);
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
  const handleSubmitForm = (values) => {
    const cityData = cityList.data.find((item) => item.code === values.city);
    const districtData = districtList.data.find(
      (item) => item.code === values.district
    );
    const wardData = wardList.data.find((item) => item.code === values.ward);
    dispatch(
      orderListRequest({
        data: {
          ...values,
          userId: userInfo.data.id,
          totalPrice: totalPrice - SalePrice,
          status: "Đang chờ xác nhận đơn hàng",
          cityName: cityData.name,
          districtName: districtData.name,
          wardName: wardData.name,
          cartList: orderList.data,
        },
        callback: () => {
          navigate(ROUTES.USER.HOME_PAGE);
          notification.success({
            message:"Đặt hàng thành công!!!"
          })
        },
      })
    );
  };
  const renderCityOptions = useMemo(() => {
    return cityList.data.map((city) => (
      <Select.Option key={city.code} value={city.code}>
        {city.name}
      </Select.Option>
    ));
  }, [cityList.data]);

  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((district) => (
      <Select.Option key={district.code} value={district.code}>
        {district.name}
      </Select.Option>
    ));
  }, [districtList.data]);

  const renderWardOptions = useMemo(() => {
    return wardList.data.map((ward) => (
      <Select.Option key={ward.code} value={ward.code}>
        {ward.name}
      </Select.Option>
    ));
  }, [wardList.data]);

  const renderOrderList = useMemo(
    () =>
      orderList.data.map((item) => {
        return (
          <Row
            style={{ textAlign: "center", borderBottom: "1px solid #bababa" }}
            gutter={[4, 4]}
          >
            <Col span={5}>
              <S.ImageProduct>
                <img src={item.image} alt="" />
              </S.ImageProduct>
            </Col>
            <Col span={13}>
              <div>
                {item.name} phiên bản {item.option}
              </div>
            </Col>
            <Col span={6}>{item.quantity}</Col>
          </Row>
        );
      }),
    [orderList.data]
  );
  if (orderList.data.length === 0) {
    return navigate(ROUTES.USER.CART);
  }
  return (
    <>
      <S.Title>Thanh toán đơn hàng</S.Title>
      <Row gutter={[30, 30]}>
        <Col span={16}>
          <Card>
            <Form
              name="checkoutForm"
              form={checkoutForm}
              layout="vertical"
              onFinish={(values) => handleSubmitForm(values)}
            >
              <Row gutter={[24, 12]}>
                <Col span={12}>
                  <Form.Item
                    name="fullName"
                    label="Họ và tên:"
                    rules={[
                      {
                        required: true,
                        message: "không được để trống",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại:"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="email" label="Email:">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      placeholder="Tỉnh/Thành"
                      onChange={(value) => {
                        dispatch(getDistrictRequest({ cityCode: value }));
                        checkoutForm.setFieldsValue({
                          district: undefined,
                          ward: undefined,
                        });
                      }}
                    >
                      {renderCityOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="district"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      disabled={!checkoutForm.getFieldValue("city")}
                      onChange={(value) => {
                        dispatch(getWardRequest({ districtCode: value }));
                        checkoutForm.setFieldValue({
                          ward: undefined,
                        });
                      }}
                      placeholder="Quận/Huyện"
                    >
                      {renderDistrictOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="ward"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      disabled={!checkoutForm.getFieldValue("district")}
                      placeholder="Phường/Xã"
                    >
                      {renderWardOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="address"
                    label="Địa chỉ:"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <h3>Phương thức thanh toán</h3>
                </Col>
                <Col>
                  <Form.Item
                    name="payment"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value="cod">Tiền mặt</Radio> <br />
                      <Radio value="atm">Paypal</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Button htmlType="submit" style={{ width: "100%" }} type="primary">
                    Xác nhận đặt hàng
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <S.Title>Sản phẩm</S.Title>
            <Card>
              <Row
                style={{ textAlign: "center", fontWeight: "bold", marginBottom: 12 }}
                gutter={[4, 4]}
              >
                <Col span={5}>Ảnh</Col>
                <Col span={13}>Tên sản phẩm</Col>
                <Col span={6}>Số lượng</Col>
              </Row>
              {renderOrderList}
            </Card>
            <Row>
              <Col span={24}>
                <S.TitlePrice>Tổng tiền hàng:</S.TitlePrice>
                <S.Price>{totalPrice.toLocaleString() + " đ"}</S.Price>
              </Col>
              <Col span={24}>
                <S.TitlePrice>Khuyến mãi :</S.TitlePrice>
                {SalePrice.toLocaleString() + " đ"}
              </Col>
              <Col span={23}>
                <S.TitlePrice>Tổng tiền cần thanh toán:</S.TitlePrice>
                <S.PriceSum>
                  {(totalPrice - SalePrice).toLocaleString()}
                </S.PriceSum>{" "}
                đ
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default Checkout;
