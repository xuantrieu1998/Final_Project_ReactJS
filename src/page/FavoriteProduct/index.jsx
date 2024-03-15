import { useDispatch, useSelector } from "react-redux";
import { useEffect,useMemo } from "react";
import { Table } from "antd";
import { generatePath, Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import { getFavoriteListRequest } from "../../redux/slices/favorite.slice";
import * as S from "./style";
function FavoriteProduct() {
  const dispatch = useDispatch();
  const { favoriteList } = useSelector((state) => state.favorite)
  const {userInfo}= useSelector((state)=>state.auth)
  useEffect(() => {
    dispatch(getFavoriteListRequest())
  }, [])
  
  
  const data = [];
  const listFavorites = useMemo(() => 
    favoriteList.data.filter((item)=> item.userId === userInfo.data.id),[favoriteList.data,userInfo.data.id]
  )
listFavorites.map((item) => data.push({
  image: <img style={{width:40}} src={item.product.image.main} alt="" />,
  name: item.product.name,
  detail: <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {id: item.product.id})}>Xem chi tiết...</Link>
}))
  const columns = [{
    title: "Ảnh",
    dataIndex: "image",
  },
    {
      title: "Tên sản phẩm",
      dataIndex: "name"
    },
    {
      title: "",
      dataIndex: "detail"
    }
  ]
  return <S.FavoriteWrapper>
    <S.FavoriteTitle>Danh sách sản phẩm yêu thích</S.FavoriteTitle>
    <Table columns={columns} dataSource={data} pagination={false} />
  </S.FavoriteWrapper>;
}

export default FavoriteProduct;
