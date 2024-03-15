import styled, { css } from "styled-components";


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
export const FormUpdateComment = styled.div`
    
`