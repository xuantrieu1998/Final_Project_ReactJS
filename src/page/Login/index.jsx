import { Row, Col, Form, Input, Button, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import { registerRequest, loginRequest } from "../../redux/slices/auth.slice";

import * as S from "./style";

function Login() {
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [moveBg, setMoveBg] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerData, loginData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (registerData.error) {
      registerForm.setFields([
        {
          name: "email",
          errors: [registerData.error],
        },
      ]);
    }
  }, [registerData.error]);
  useEffect(() => {
    if (loginData.error) {
      loginForm.setFields([
        {
          name: "email",
          errors: [" "],
        },
        {
          name: "password",
          errors: [loginData.error],
        },
      ]);
    }
  }, [loginData.error]);

  const handleLoginSubmit = (values) => {
    dispatch(
      loginRequest({
        data: values,
        callback: () => navigate(ROUTES.USER.HOME_PAGE),
      })
    );
  };
  const handleRegisterSubmit = (values) => {
    dispatch(
      registerRequest({
        data: {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          role: "user",
          birthday: null,
          phoneNumber: null,
          avatar: null,
        },
        callback: null,
      })
    );
    setMoveBg(false);
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: "gray",
          colorText: "white",
          colorPrimaryText: "black",
          borderRadius: "0",
        },
      }}
    >
      <S.LoginWrapper>
        <Row align={"middle"} justify={"center"} gutter={[20, 20]}>
          <Col span={16}>
            <S.LoginContainer>
              <S.BackgroundLogin moveBg={moveBg}>
                {!moveBg ? (
                  <>
                    <S.TitleBackground>Chào mừng bạn trở lại!</S.TitleBackground>
                    <S.ContentBackground>
                      Vui lòng đăng nhập để trải nghiệm đầy đủ các tính năng của
                      Apple MeoMeo
                    </S.ContentBackground>
                    <S.ContentBackground>or</S.ContentBackground>
                    <S.ButtonBackground
                      onClick={() => {
                        setMoveBg(true);
                        loginForm.resetFields();
                      }}
                    >
                      Đăng kí
                    </S.ButtonBackground>
                  </>
                ) : (
                  <>
                    <S.TitleBackground>Xin chào!</S.TitleBackground>
                    <S.ContentBackground>
                      Khách hàng vui lòng điền đầy đủ thông tin để đăng ký tài khoản
                      tại cửa hàng Apple MeoMeo
                    </S.ContentBackground>
                    <S.ContentBackground>or</S.ContentBackground>
                    <S.ButtonBackground
                      onClick={() => {
                        setMoveBg(false);
                        registerForm.resetFields();
                      }}
                    >
                      Đăng nhập
                    </S.ButtonBackground>
                  </>
                )}
              </S.BackgroundLogin>
              <Row>
                <Col span={12}>
                  <S.LoginBox>
                    <Form
                      layout="vertical"
                      form={loginForm}
                      name="loginForm"
                      onFinish={(values) => handleLoginSubmit(values)}
                    >
                      <S.Title>Đăng nhập</S.Title>
                      <Form.Item
                        label="Email:"
                        name="email"
                        rules={[
                          { required: true, message: "Không được để trống!!!" },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Mật khẩu:"
                        name="password"
                        rules={[
                          { required: true, message: "Không được để trống!!!" },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                      <Button
                        style={{ backgroundColor: "black" }}
                        htmlType="submit"
                        block
                      >
                        Đăng nhập
                      </Button>
                    </Form>
                  </S.LoginBox>
                </Col>
                <Col span={12}>
                  <S.LoginBox>
                    <Form
                      layout="vertical"
                      form={registerForm}
                      name="registerForm"
                      onFinish={(values) => handleRegisterSubmit(values)}
                    >
                      <S.Title>Đăng ký</S.Title>
                      <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Họ và tên là bắt buộc",
                          },
                          {
                            type: "string",
                            min: 3,
                            max: 32,
                            message: "Họ và tên phải từ 3-32 kí tự",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Email:"
                        name="email"
                        rules={[
                          { required: true, message: "Không được để trống!!!" },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Mật khẩu:"
                        name="password"
                        rules={[
                          { required: true, message: "Không được để trống!!!" },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                      <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirmPassword"
                        rules={[
                          {
                            required: true,
                            message: "Mật khẩu là bắt buộc",
                          },
                          (params) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                params.getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("Mật khẩu xác nhận không khớp")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                      <Button
                        style={{ backgroundColor: "black" }}
                        htmlType="submit"
                        block
                      >
                        Đăng ký
                      </Button>
                    </Form>
                  </S.LoginBox>
                </Col>
              </Row>
            </S.LoginContainer>
          </Col>
        </Row>
      </S.LoginWrapper>
    </ConfigProvider>
  );
}

export default Login;
