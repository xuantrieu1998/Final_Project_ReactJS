import { Select, Table, Form, Button, Row, Col } from "antd";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./style";
import {
  getOrderListRequest,
  updateOrderRequest,
} from "../../redux/slices/order.slice";
function OrderManage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderListRequest({}));
  }, []);
  const { orderList } = useSelector((state) => state.order);
  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
  ];
  const data = [];

  useMemo(
    () =>
      orderList.data.map((item) => {
        data.push({
          id: item.id,
          image: <img style={{ width: 45 }} src={item.image} alt="" />,
          name: item.productName,
          quantity: item.quantity,
          price: item.priceSum,
          order: item.order,
          status: (
            <Form>
              <Form.Item name="ok" initialValue={item.status}>
                <Select
                  style={{ width: 250 }}
                  onChange={(value) =>
                    dispatch(
                      updateOrderRequest({
                        id: item.id,
                        status: value,
                      })
                    )
                  }
                >
                  <Select.Option value={item.status}></Select.Option>
                  {item.status !== "Đang chờ xác nhận đơn hàng" && (
                    <Select.Option
                      value={"Đang chờ xác nhận đơn hàng"}
                    ></Select.Option>
                  )}
                  {item.status !== "Đang giao hàng" && (
                    <Select.Option value={"Đang giao hàng"}></Select.Option>
                  )}
                  {item.status !== "Giao hàng thành công" && (
                    <Select.Option value={"Giao hàng thành công"}></Select.Option>
                  )}
                </Select>
              </Form.Item>
            </Form>
          ),
        });
      }),
    [orderList.data]
  );

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey="id"
      expandable={{
        expandedRowRender: (item) => (
          <Row>
            <Col span={24}>
              <S.OrderRowTitle>
                <S.orderTitle>Mã đơn hàng: </S.orderTitle> {item.order.id}
              </S.OrderRowTitle>
              <S.OrderRowTitle>
                <S.orderTitle>Tên khách hàng: </S.orderTitle>
                {item.order.fullName}
              </S.OrderRowTitle>
              <S.OrderRowTitle>
                <S.orderTitle>Địa chỉ giao hàng: </S.orderTitle>
                {item.order.address},{item.order.wardName},{item.order.districtName},{" "}
                {item.order.cityName}
              </S.OrderRowTitle>
            </Col>
          </Row>
        ),
      }}
    />
  );
}
export default OrderManage;
