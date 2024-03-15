import { Outlet, Link } from "react-router-dom";
import * as S from "./style";
import { ROUTES } from "../../constants/routes";

function LoginLayout() {
  return (
    <S.LoginLayoutWrapper>
      <Link to={ROUTES.USER.HOME_PAGE}>
        <S.Logo>
          <img src="/assets/img/xoanenLogo.png" alt="" />{" "}
        </S.Logo>
      </Link>
      <S.LoginLayoutContainer>
        <Outlet></Outlet>
      </S.LoginLayoutContainer>
    </S.LoginLayoutWrapper>
  );
}
export default LoginLayout;
