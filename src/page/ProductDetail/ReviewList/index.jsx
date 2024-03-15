import { Card, Rate,Form,Input, Button } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateReviewRequest,getReviewRequest ,deleteReviewRequest} from "../../../redux/slices/review.slice";

import * as S from "./style";
function ReviewListComment({ data }) {
    const [updateComment, setUpdateComment] = useState(false)
    const [update] = Form.useForm()
    const dispatch = useDispatch()
    useEffect(() => update.setFieldsValue({
        comment: data.comment
    }),[])
    const handleUpdateComment = (value) => {
        dispatch(updateReviewRequest({
            id: data.id,
            comment: value.comment,
        }))
        setUpdateComment(false)
        
    }
    const handleDeleteComment = () => {
        dispatch(deleteReviewRequest({id: data.id}))
    }
    return (
    <Card>
      <S.ReviewListWrapper>
      <S.ReviewListContainer>
      <S.ReviewListAvatar style={{ backgroundImage: `url(${data.userAvatar})` }}>
          </S.ReviewListAvatar>
          <S.ReviewListContent>
            <S.ReviewListUserName>{ data.fullName}</S.ReviewListUserName>
            <S.ReviewListRate>
              <Rate style={{ fontSize: 12, color: "#ffa940" }} disabled value={data.rate} />
            </S.ReviewListRate>
            <S.ReviewListTime>{dayjs(data.createdAt).fromNow()}</S.ReviewListTime>
          </S.ReviewListContent>
          
                </S.ReviewListContainer>
                {updateComment? <S.FormUpdateComment>
                    <Form
                        name="update"
                        form={update}
                        onFinish={(value)=> handleUpdateComment(value)}
                    >
                        <Form.Item
                            name="comment"

                        >
                            <Input.TextArea/>
                        </Form.Item>
                        <Button size="small" type="primary" style={{marginRight:12}} htmlType="submit">Chỉnh sửa</Button>
                        <Button size="small" onClick={()=>setUpdateComment(false)}>Trở lại</Button>
                    </Form>
                </S.FormUpdateComment> : <>
                    <S.ReviewListComment>{data.comment}</S.ReviewListComment>
                    <S.UpdateComment onClick={()=> setUpdateComment(true)}>Chỉnh sửa</S.UpdateComment>
                        <S.DeleteComment onClick={()=>handleDeleteComment()}>xóa</S.DeleteComment>
                </>}
        
    </S.ReviewListWrapper>
    </Card>
    )
}
export default ReviewListComment