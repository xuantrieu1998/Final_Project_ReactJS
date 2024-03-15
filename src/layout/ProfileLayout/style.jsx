import styled, { css } from "styled-components";

export const ProfileWrapper = styled.div``;
export const AvatarWrapper = styled.div`
  width: 100px;
  height: 100px;
  max-width: 100%;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  background-position: center;
  background-size: cover;
  border: 1px solid gray;
  & input {
    display: none;
  }
  & label {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 24px;
  }
  margin-bottom: 32px;
`;
export const UserTitle = styled.span`
  font-weight: bold;
  margin: 8px 0;
  margin-right: 4px;
  font-size: 16px;
`;
export const UserContent = styled.span``;
export const ProfileMenu = styled.div``;
export const ProfileMenuItem = styled.div`
  padding: 12px;
  font-size: 16px;
  background-color: white;
  border-bottom: 1px solid #eeeeee;
  font-weight: 500;
  color: black;
  ${(props) =>
    props.active &&
    css`
      color: white;
      background-color: black;
    `}
`;
