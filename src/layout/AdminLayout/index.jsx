import { Card, Col, Row } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { MENU_DASHBOARD } from "./constants";
import { useMemo, useEffect } from "react";

import { getOrderListRequest } from "../../redux/slices/order.slice";

import * as S from "./style";
function AdminLayout() {
  
  const { pathname } = useLocation();
  const renderMenuDashboard = useMemo(() =>
    MENU_DASHBOARD.map(
      (item, index) => {
        return (
          <S.ElementMenuDashboard key={index} active={item.path === pathname}>
            {item.label}
          </S.ElementMenuDashboard>
        );
      },
      [MENU_DASHBOARD]
    )
  );
  return (
    <S.AdminLayoutWrapper>
      <Row gutter={[16, 16]}>
        <Col span={5}>
          <S.MenuDashboard>
            <S.AdminLayoutTitle>Dashboard</S.AdminLayoutTitle>
            {renderMenuDashboard}
          </S.MenuDashboard>
        </Col>
        <Col span={19}>
          <Card>
            <Outlet />
          </Card>
        </Col>
      </Row>
    </S.AdminLayoutWrapper>
  );
}
export default AdminLayout;
