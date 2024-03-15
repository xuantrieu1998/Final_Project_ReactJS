import styled, { css } from "styled-components";

export const AdminLayoutWrapper = styled.div``;
export const AdminLayoutTitle = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-top: 8px;
`;
export const MenuDashboard = styled.div`
  background-color: white;
`;
export const ElementMenuDashboard = styled.div`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  ${(props) =>
    props.active &&
    css`
      color: white;
      background-color: black;
    `}
`;
