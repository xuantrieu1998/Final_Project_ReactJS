import styled, { css } from "styled-components";
export const ProductDetailWrapper = styled.div``
export const ProductDetailType = styled.div`
font-size: 12px;
font-weight: 500;
color: gray;
`
export const ProductDetailName = styled.div`
    font-size: 18px;
    margin-top: 4px;
    font-weight: 500;
`
export const ProductDetailRate = styled.span`
display: flex;
align-items: center;
margin-top: 12px;
`
export const ProductOptions = styled.div`
margin-top: 12px;
`
export const ProductPrice = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-top: 12px;
  margin-bottom: 12px;
`;
export const ProductVnd = styled.span`
  text-decoration: underline;
`;
export const ProductPriceSale = styled.span`
  text-decoration: line-through;
  font-weight: 300;
  font-size: 14px;
  margin: 0 6px;
  font-style: italic;
`;
export const ContentWrapper = styled.div`
height: 500px;
overflow: hidden;
position: relative;
${props => props.showMore && css`
  height: max-content;
`}
`
export const BackGroundContent = styled.div`
position: absolute;
width: 100%;
height: 300px;
left: 0;
bottom: 0;
background-image: linear-gradient(#ffffff77, #cdcdcd77, #b6b6b6);
display: flex;
justify-content: center;
align-items: end;
`
export const ShowMoreContent = styled.span`
  padding: 20px;
  font-size: 20px;
  color: gray;
  font-weight: bold;
  &:hover{
    color: black;
    cursor: pointer;
  }
`
export const FormReviewWrapper = styled.div``

export const ReviewListWrapper = styled.div``
export const ReviewListContainer = styled.div`
  margin-bottom: 8px;
  display: flex;
`
export const ReviewListAvatar = styled.div`
width: 50px;
height: 50px;
border-radius: 50%;
background-size: 100%;
background-position: center;
margin-right: 8px;
`
export const ReviewListContent = styled.div``
export const ReviewListRate = styled.div`
font-size: 10px;
`
export const ReviewListTime = styled.div`
font-size: 10px;
`
export const ReviewListUserName = styled.div`
font-weight: 500;
`
export const ReviewListComment = styled.div`
margin-bottom: 8px;
`
export const UpdateComment = styled.span`
color: gray;
margin-right: 12px;
cursor: pointer;
&:hover{
  color: #0084ff;
}
`
export const DeleteComment = styled.span`
color: gray;
cursor: pointer;
&:hover{
  color: red;
}
`
export const SimilarPrice = styled.span`
  font-weight: bold;
`
export const SimilarPriceSale = styled.span`
  text-decoration: line-through;
  color: gray;

`