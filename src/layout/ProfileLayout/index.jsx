import { Row, Col, Card, notification } from "antd";
import { FaCamera } from "react-icons/fa";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, Outlet } from "react-router-dom";

import { changeAvatarRequest } from "../../redux/slices/auth.slice";
import { convertImageToBase64 } from "../../utils/file";
import { PROFILE_MENU } from "./constants";

import * as S from "./style";

function ProfileLayout() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const handleChangeAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      return notification.error({ message: "File không đúng định dạng" });
    }
    const imgBase64 = await convertImageToBase64(file);
    await dispatch(
      changeAvatarRequest({
        id: userInfo.data.id,
        data: {
          avatar: imgBase64,
        },
      })
    );
  };
  const renderProfileMenuItem = useMemo(
    () =>
      PROFILE_MENU.map((item, index) => (
        <Link key={index} to={item.path}>
          <S.ProfileMenuItem active={item.path === pathname}>
            {item.label}
          </S.ProfileMenuItem>
        </Link>
      )),
    [pathname]
  );
  return (
    <S.ProfileWrapper>
      <Row gutter={[20, 20]}>
        <Col span={6}>
          <Card>
            <S.AvatarWrapper
              style={{ backgroundImage: `url(${userInfo.data.avatar})` }}
            >
              <input
                type="file"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => handleChangeAvatar(e)}
              />
              <label htmlFor="imageUpload">
                <FaCamera />
              </label>
            </S.AvatarWrapper>
            <div>
              <S.UserTitle>Tên đăng nhập:</S.UserTitle>
              <S.UserContent>{userInfo.data.fullName}</S.UserContent>
            </div>
            <div>
              <S.UserTitle>Email:</S.UserTitle>
              <S.UserContent>{userInfo.data.email}</S.UserContent>
            </div>
          </Card>
          <Row>
            <Col span={24}>
              <S.ProfileMenu>{renderProfileMenuItem}</S.ProfileMenu>
            </Col>
          </Row>
        </Col>
        <Col span={18}>
          <Card>
            <Outlet />
          </Card>
        </Col>
      </Row>
    </S.ProfileWrapper>
  );
}
export default ProfileLayout;
