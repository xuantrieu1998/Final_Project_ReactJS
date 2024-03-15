import styled from "styled-components";

export const UserLayoutWrapper = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
`;
export const UserLayoutContainer = styled.div`
  flex: 1;
  padding-bottom: 20px;
  background-color: #b6b6b6;
  @media (min-width: 376px) {
    padding: 20px;
  }
  @media (min-width: 768px) {
    padding: 32px;
  }
  @media (min-width: 992px) {
    padding: 32px;
  }
  @media (min-width: 1200px) {
    padding: 32px 80px;
  }
`;
