import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import SlideShow from "../../page/HomePage/SlideShow";
import * as S from "./style";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

function UserLayout() {
  const { pathname } = useLocation();
  return (
    <S.UserLayoutWrapper>
      <Header />
      {pathname === ROUTES.USER.HOME_PAGE && <SlideShow />}
      {pathname === ROUTES.USER.PRODUCT && <SlideShow />}

      <S.UserLayoutContainer>
        <Outlet />
      </S.UserLayoutContainer>
      <Footer />
    </S.UserLayoutWrapper>
  );
}
export default UserLayout;
