import styled, { css } from "styled-components";

export const ProductWrapper = styled.div``;
export const TypeListWrapper = styled.div`
  margin-bottom: 20px;
`;

export const BoxTypeList = styled.div`
  border: 1px solid gray;
  background-image: url(/assets/img/BackGroundType.jpeg);
  background-size: cover;
  border-radius: 8px;
  padding-bottom: 8px;
  transition: all 0.5s;
  ${(props) =>
    props.active &&
    css`
      box-shadow: 8px 8px 10px black;

      transform: translate(-8px, -8px);
    `}
  &:hover {
    cursor: pointer;
  }
`;
export const TypeListImage = styled.div`
  width: 100%;
`;
export const TypeListTitle = styled.div`
  text-align: center;
  font-weight: bold;
  color: white;
  @media (min-width: 576px) {
    font-size: 16px;
  }
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;
export const ProductListWrapper = styled.div`
  margin-top: 20px;
`;
