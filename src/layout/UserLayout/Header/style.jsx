import styled, { css } from "styled-components";

export const HeaderWrapper = styled.div`
  padding: 8px 36px;
  background-color: black;
`;
export const HeaderLogo = styled.div`
  width: 100%;
`;
export const NavigateList = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const NavigateItem = styled.div`
  padding: 8px 16px;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 5px white;
  @media (min-width: 576px) {
    font-size: 16px;
  }
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;
export const ItemCartLogin = styled.div`
  color: white;
  font-size: 28px;
  position: relative;
  &:hover span {
    display: block;
  }
`;
export const UserAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-size: cover;
  border: 1px solid white;
  box-shadow: 0 0 5px white;
`;
export const CartListWrapper = styled.span`
  position: absolute;
  right: 0;
  top: 32px;
  width: 500px;
  max-height: 300px;
  overflow: auto;
  background-color: white;
  box-shadow: 0 0 2px inset gray;
  color: black;
  z-index: 100;
  display: none;
`;
export const ElementCartList = styled.div`
  padding: 6px;
  border-bottom: 1px solid #d3d3d3;
  &:hover {
    background-color: #dbdbdb;
  }
`;
export const productListWrapper = styled.span`
  position: absolute;
  width: calc(100% - 17px);
  max-height: 300px;
  overflow: auto;
  background-color: white;
  left: 9px;
  top: 32px;
  z-index: 100;
  display: none;
  ${(props) =>
    props.displayProductList &&
    css`
      display: block;
    `}
`;
export const ElementProductList = styled.div`
  padding: 8px;
  font-weight: 500;
  color: black;
  border-bottom: 1px solid #f0f0f0;
  &:hover {
    background-color: #dbdbdb;
  }
`;
