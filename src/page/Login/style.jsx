import styled, { css } from "styled-components";

export const LoginWrapper = styled.div`
  margin-top: 60px;
`;
export const LoginContainer = styled.div`
  box-shadow: 0 0 16px white;
  background-color: #0000005e;
  position: relative;
`;
export const BackgroundLogin = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 50%;
  top: 0;
  background-color: black;
  box-shadow: 0 0 10px white;
  z-index: 100;
  display: flex;
  flex-flow: column;
  justify-content: center;
  transition: all 1s ease-in-out;
  ${(props) =>
    props.moveBg &&
    css`
      left: 0;
    `}
`;
export const TitleBackground = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;
export const ContentBackground = styled.div`
  text-align: center;
  color: white;
  padding: 0 40px;
  line-height: 1.8;
  font-weight: 500;
`;
export const ButtonBackground = styled.div`
  padding: 8px 28px;
  border-radius: 4px;
  box-shadow: 0 0 5px white;
  width: max-content;
  margin: 4px auto;
  color: white;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;
export const LoginBox = styled.div`
  padding: 32px;
  min-height: 400px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  color: white;
`;
export const Title = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
`;
