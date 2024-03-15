import styled, { css } from "styled-components";
export const HomePageWrapper = styled.div``;
export const HomePageContainer = styled.div`
  margin-top: 32px;
`;
export const VideoWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 60px;
`;

export const ContentVideoContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(transparent, #323232dd, #000000e9);
`;
export const ContentVideo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
  color: white;
  font-weight: bold;
  line-height: 1.7;
`;
export const TitleHomPage = styled.div`
  width: 275px;
  height: 70px;
  background-image: url(/assets/img/titleHompage.png);
  background-size: 100%;
  margin: 16px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
`;
