import { Row, Col, Input, Badge, Dropdown, Button } from "antd";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, generatePath, Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { RiAdminLine, RiProfileLine, RiLogoutBoxRLine } from "react-icons/ri";

import { NAVIGATE_LIST } from "./constants";
import { ROUTES } from "../../../constants/routes";

import { logOutRequest } from "../../../redux/slices/auth.slice";
import { deleteCartListRequest } from "../../../redux/slices/cart.slice";

import * as S from "./style";

function Header() {
  const { Search } = Input;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayProductList, setDisplayProductList] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);
  const { productList } = useSelector((state) => state.product);
  const cartListUser = useMemo(
    () => cartList.data.filter((item) => item.userId === userInfo.data.id),
    [cartList.data, userInfo.data.id]
  );
  const handleDeleteCart = (id) => {
    dispatch(deleteCartListRequest({ id: id }));
  };
  const handleFinishFilter = (value) =>
    navigate(`${ROUTES.USER.PRODUCT}?keyword=${value}`);

  const filterSearch = useMemo(
    () =>
      productList.data.filter((item) =>
        item.name.toLowerCase().includes(valueSearch.toLowerCase())
      ),
    [valueSearch, productList.data]
  );
  const renderSearchList = useMemo(
    () =>
      filterSearch.map((item) => (
        <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
          <S.ElementProductList>{item.name}</S.ElementProductList>
        </Link>
      )),
    [filterSearch]
  );
  const renderCartList = useMemo(
    () =>
      cartListUser.map((item) => {
        return (
          <S.ElementCartList>
            <Row align={"middle"} gutter={[12, 12]} style={{ textAlign: "center" }}>
              <Col span={3}>
                <img src={item.image} alt="" />
              </Col>
              <Col span={6}>{item.productName}</Col>
              <Col span={3}>{item.option}</Col>
              <Col span={4}>{item.quantity}</Col>
              <Col span={5}>{item.price}</Col>
              <Col span={3}>
                <Button
                  onClick={() => handleDeleteCart(item.id)}
                  type="primary"
                  size="small"
                >
                  Xóa
                </Button>
              </Col>
            </Row>
          </S.ElementCartList>
        );
      }),
    [cartListUser]
  );
  const renderNavList = useMemo(() => {
    return NAVIGATE_LIST.map((item, index) => {
      return (
        <Link to={item.path}>
          <S.NavigateItem key={index}>{item.name}</S.NavigateItem>
        </Link>
      );
    });
  }, [NAVIGATE_LIST]);
  return (
    <S.HeaderWrapper>
      <Row align={"middle"} gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={3}>
          <Row justify={"center"}>
            <Col xs={3} sm={3} md={2} lg={12}>
              <S.HeaderLogo>
                <Link to={ROUTES.USER.HOME_PAGE}>
                  <img src="/assets/img/Final-logo.png" alt="" />
                </Link>
              </S.HeaderLogo>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={13}>
          <S.NavigateList>{renderNavList}</S.NavigateList>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8}>
          <Row align={"middle"} justify={"space-between"} gutter={[16, 16]}>
            <Col style={{ position: "relative" }} xs={20} sm={20} md={20} lg={18}>
              <Search
                allowClear
                onFocus={() => setDisplayProductList(true)}
                onBlur={() => setDisplayProductList(false)}
                onSearch={(values) => handleFinishFilter(values)}
                onChange={(e) => setValueSearch(e.target.value)}
                placeholder="Nhập sản phẩm bạn cần tìm..."
              />
              <S.productListWrapper displayProductList={displayProductList}>
                {renderSearchList}
              </S.productListWrapper>
            </Col>
            <Col xs={4} sm={4} md={4} lg={6}>
              <Row align={"middle"} gutter={[20, 20]}>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <Badge size="small" count={cartListUser.length} showZero>
                    <S.ItemCartLogin>
                      <Link to={ROUTES.USER.CART}>
                        <FaShoppingCart style={{ color: "white" }} />
                      </Link>
                      <S.CartListWrapper>
                        <S.ElementCartList style={{ backgroundColor: "white" }}>
                          <Row
                            gutter={[12, 12]}
                            style={{
                              textAlign: "center",
                              marginBottom: 12,
                              fontWeight: "bold",
                            }}
                          >
                            <Col span={3}>Ảnh</Col>
                            <Col span={6}>Tên sản phẩm</Col>
                            <Col span={3}>Option</Col>
                            <Col span={4}>Số lượng</Col>
                            <Col span={5}>Giá</Col>
                            <Col span={3}></Col>
                          </Row>
                        </S.ElementCartList>
                        {renderCartList}
                      </S.CartListWrapper>
                    </S.ItemCartLogin>
                  </Badge>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <S.ItemCartLogin>
                    <Dropdown
                      menu={{
                        items: [
                          userInfo.data.role === "admin"&&{
                            key: "1",
                            icon: <RiAdminLine />,
                            label: "Dashboard",
                            onClick: () => navigate(ROUTES.ADMIN.DASHBOARD),
                          },
                          userInfo.data.id &&
                          {
                            key: "2",
                            icon: <RiProfileLine />,
                            label: "Thông tin cá nhân",
                            onClick: () => navigate(ROUTES.USER.PROFILE),
                          },
                          {
                            key: "3",
                            icon: <RiLogoutBoxRLine />,
                            label: `${userInfo.data.id ? "Đăng xuất" : "Đăng nhập"}`,
                            onClick: () => {
                              if (userInfo.data.id) {
                                dispatch(logOutRequest());
                                navigate(ROUTES.USER.HOME_PAGE);
                              } else {
                                navigate(ROUTES.LOGIN);
                              }
                            },
                          },
                        ],
                      }}
                    >
                      {userInfo.data.id ? (
                        <S.UserAvatar
                          style={{
                            backgroundImage: `url(${
                              userInfo.data.avatar
                                ? userInfo.data.avatar
                                : "/assets/img/avatarUser.jpeg"
                            })`,
                          }}
                        />
                      ) : (
                        <FaUser />
                      )}
                    </Dropdown>
                  </S.ItemCartLogin>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </S.HeaderWrapper>
  );
}
export default Header;
