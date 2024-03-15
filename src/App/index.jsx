import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ConfigProvider, Row } from "antd";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import UserLayout from "../layout/UserLayout";
import ProfileLayout from "../layout/ProfileLayout";

import { ROUTES } from "../constants/routes";

import HomePage from "../page/HomePage";
import Product from "../page/Product";
import Login from "../page/Login";
import Cart from "../page/Cart";
import Checkout from "../page/Checkout";
import UserInfo from "../page/UserInfo";
import ChangePassword from "../page/ChangePassword";
import FavoriteProduct from "../page/FavoriteProduct";
import OrderHistory from "../page/OrderHistory";
import ProductDetail from "../page/ProductDetail";
import AdminLayout from "../layout/AdminLayout";
import OrderManage from "../page/OrderManage";
import LoginLayout from "../layout/LoginLayout";

import { getUserInfoRequest } from "../redux/slices/auth.slice";
import { getCartListRequest } from "../redux/slices/cart.slice";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenData = jwtDecode(accessToken);
      dispatch(getUserInfoRequest({ id: parseInt(tokenData.sub) }));
    }
  }, []);
  useEffect(() => {
    dispatch(getCartListRequest());
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "black",
          borderRadius: "0",
        },
      }}
    >
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME_PAGE} element={<HomePage />} />
          <Route path={ROUTES.USER.PRODUCT} element={<Product />} />
          <Route path={ROUTES.USER.CART} element={<Cart />} />
          <Route path={ROUTES.USER.CHECKOUT} element={<Checkout />} />
          <Route path={ROUTES.USER.PRODUCT_DETAIL} element={<ProductDetail />} />
          <Route element={<ProfileLayout />}>
            <Route
              path={ROUTES.USER.PROFILE}
              element={<Navigate to={ROUTES.USER.USER_INFO} />}
            />
            <Route path={ROUTES.USER.USER_INFO} element={<UserInfo />} />
            <Route
              path={ROUTES.USER.FAVORITE_PRODUCTS}
              element={<FavoriteProduct />}
            />
            <Route path={ROUTES.USER.ORDER_HISTORY} element={<OrderHistory />} />
            <Route path={ROUTES.USER.CHANGE_PASSWORD} element={<ChangePassword />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route
              path={ROUTES.ADMIN.DASHBOARD}
              element={<Navigate to={ROUTES.ADMIN.ORDER_MANAGE} />}
            />
            <Route path={ROUTES.ADMIN.ORDER_MANAGE} element={<OrderManage />} />
          </Route>
        </Route>
      </Routes>
    </ConfigProvider>
  );
}
export default App;
