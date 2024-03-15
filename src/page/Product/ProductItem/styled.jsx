import styled, { css } from "styled-components";

export const productBox = styled.div`
  transition: all 0.5s;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 10px gray;
    cursor: pointer;
    animation: overFlowBox 1s linear forwards;
  }
  &:hover span {
    bottom: -10px;
    animation: showAddCart 1s ease-in-out forwards;
  }
  @keyframes overFlowBox {
    0% {
      overflow: hidden;
    }
    100% {
      overflow: visible;
    }
  }
  @keyframes showAddCart {
    0% {
      bottom: -52px;
    }
    50% {
      bottom: 0%;
    }
    100% {
      bottom: -35px;
    }
  }
`;
export const ProductImage = styled.div``;
export const ProductName = styled.div`
  font-weight: 500;
  text-align: center;
  font-size: 18px;
  height: 56px;
`;
export const ProductPrice = styled.div`
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin-bottom: 8px;
  height: 50px;
`;
export const ProductVnd = styled.span`
  text-decoration: underline;
`;
export const ProductPriceSale = styled.div`
  text-decoration: line-through;
  font-weight: 300;
  font-size: 14px;
  margin: 0 6px;
  font-style: italic;
`;
export const ProductPercentSale = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 50px;
  height: 50px;
  background-image: url(/assets/img/backGroundSale.png);
  background-size: 100%;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
`;
export const AddCart = styled.span`
  position: absolute;
  bottom: -52px;
  left: 0px;
  width: 100%;
  transition: all 1s;
  border-radius: 5px;
  box-shadow: 0 10px 10px gray;
  background-color: white;
  padding: 12px 0;
  display: flex;
  justify-content: center;
  z-index: 100;
`;
export const Item = styled.span`
  margin: 0 8px;
  font-size: 24px;
  color: gray;
  &:hover {
    color: black;
  }
`;
