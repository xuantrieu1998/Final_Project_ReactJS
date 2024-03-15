
import { Row, Col, DatePicker, Form, Input, Button } from "antd";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { upDateUserInfoRequest } from "../../redux/slices/auth.slice";
import * as S from "./style";

function UserInfo() {
  const dispatch = useDispatch()
  const [userInfoForm] = Form.useForm()
  const { userInfo } = useSelector((state) => state.auth)
  useEffect(() => {
    userInfoForm.setFieldsValue({
      fullName: userInfo.data.fullName,
      email: userInfo.data.email,
      phoneNumber: userInfo.data.phoneNumber,
      birthday: userInfo.data.birthday ? dayjs(userInfo.data.birthday) : undefined,
  })
  }, [])
  const handleUpdateUserInfo = (values) => {
    console.log(userInfo.data.id)
    dispatch(upDateUserInfoRequest({
      id: userInfo.data.id,
      data: {
        ...values,
        birthday: dayjs(values.birthday).valueOf()
      }
    }))
  }
  return <S.UserInfo>
    <S.UserInfoTitle>Thông tin cá nhân</S.UserInfoTitle>
    <Form onFinish={(values)=>handleUpdateUserInfo(values)} name="userInfoForm" form={userInfoForm} layout="vertical">
    <Row gutter={[16]}>
        <Col span={24}>
          <Form.Item
            name="fullName"
            label="Họ và tên:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="email"
          label="Email:"
          >
            <Input disabled/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="birthday"
            label="Ngày sinh:"
            rules={[
              {
                required: true,
              },
            ]} 
          >
            <DatePicker style={{width:"100%"}} placeholder="Chọn ngày" />
          </Form.Item>
      </Col>
      <Col span={24}><Button type="primary" style={{width:"100%"}}  htmlType="submit">Cập nhật thông tin</Button></Col>
      </Row>
    </Form>
  </S.UserInfo>;
}
export default UserInfo;
