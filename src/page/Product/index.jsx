import { Row, Col, Card, Flex, Select, ConfigProvider, Radio, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";

import { getTypeRequest } from "../../redux/slices/type.slice";
import { getProductListRequest } from "../../redux/slices/product.slice";
import { ROUTES } from "../../constants/routes";
import { LIMIT } from "../../constants/paging";
import ProductItem from "./ProductItem";

import * as S from "./style";

function Product() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(() => {
    const params = qs.parse(search, { ignoreQueryPrefix: true });
    return {
      typeId: params.typeId ? parseInt(params.typeId) : [],
      priceOrder: params.priceOrder,
      keyword: params.keyword || "",
    };
  }, [search]);

  useEffect(() => {
    dispatch(getTypeRequest());
  }, []);

  useEffect(() => {
    dispatch(
      getProductListRequest({
        page: 1,
        limit: LIMIT,
        ...searchParams,
      })
    );
  }, [searchParams]);

  const handleFilter = (key, value) => {
    if (searchParams.typeId == value) {
      navigate(ROUTES.USER.PRODUCT);
    } else {
      const newFilterParams = { ...searchParams, [key]: value };
      navigate(`${ROUTES.USER.PRODUCT}?${qs.stringify(newFilterParams)}`);
    }
  };

  const handleShowMore = () => {
    dispatch(
      getProductListRequest({
        ...searchParams,
        page: productList.meta.page + 1,
        limit: LIMIT,
        more: true,
      })
    );
  };

  const { typeList } = useSelector((state) => state.type);
  const { productList } = useSelector((state) => state.product);

  const renderTypeList = useMemo(
    () =>
      typeList.data.map((item) => {
        return (
          <Col key={item.id} xs={8} sm={7} md={4} lg={4} xl={4}>
            <S.BoxTypeList
              active={item.id === searchParams.typeId}
              onClick={() => handleFilter("typeId", item.id)}
            >
              <S.TypeListImage>
                <img src={item.image} alt="" />
              </S.TypeListImage>
              <S.TypeListTitle>{item.name}</S.TypeListTitle>
            </S.BoxTypeList>
          </Col>
        );
      }),
    [typeList.data, searchParams]
  );
  const renderProductList = useMemo(
    () =>
      productList.data.map((item, index) => {
        return <ProductItem key={index} data={item} />;
      }),
    [productList.data]
  );
  return (
    <S.ProductWrapper>
      <S.TypeListWrapper>
        <Row justify={"space-between"} gutter={[20, 20]}>
          {renderTypeList}
        </Row>
      </S.TypeListWrapper>
      <Row justify={"end"}>
        <Col xs={8} sm={6} md={6} lg={6}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#cccccc",
                borderRadius: "0px",
              },
            }}
          >
            <Select
              onChange={(value) => handleFilter("priceOrder", value)}
              value={searchParams.priceOrder}
              placeholder="Sắp xếp theo"
              allowClear
              style={{ width: "100%" }}
            >
              <Select.Option value="asc">Giá tăng dần</Select.Option>
              <Select.Option value="desc">Giá giảm dần</Select.Option>
            </Select>
          </ConfigProvider>
        </Col>
      </Row>
      <S.ProductListWrapper>
        <Row gutter={[24, 24]}>{renderProductList}</Row>
        {productList.data.length < productList.meta.total ? (
          <Flex justify="center" style={{ marginTop: 40 }}>
            <Button onClick={() => handleShowMore()}>Hiển thị thêm</Button>
          </Flex>
        ) : (
          <Flex justify="center" style={{ marginTop: 40 }}>
            <Button
              onClick={() =>
                dispatch(
                  getProductListRequest({
                    ...searchParams,
                    page: 1,
                    limit: LIMIT,
                  })
                )
              }
            >
              Thu gọn
            </Button>
          </Flex>
        )}
      </S.ProductListWrapper>
    </S.ProductWrapper>
  );
}

export default Product;
