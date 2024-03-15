import { debounce, takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import {
    orderListRequest,
    orderListSuccess,
    orderListFailure,
    getOrderListRequest,
    getOrderListSuccess,
    getOrderListFailure,
    deleteOrderDetailRequest,
    deleteOrderDetailSuccess,
    deleteOrderDetailFailure,
    deleteOrderRequest,
    updateOrderRequest,
    updateOrderSuccess,
    updateOrderFailure
} from "../slices/order.slice";
import { deleteCartListSuccess, orderProductList } from "../slices/cart.slice";

function* getOrderListSaga(actions) {

    try {
        const { userId } = actions.payload
        const result = yield axios.get('http://localhost:4000/orderdetails', {
            params: {
                userId: userId,
                _expand: "order"
            }
        }
        )
        yield put(getOrderListSuccess({ data: result.data }))
    } catch (e) {
        yield put(getOrderListFailure({ error: 'Lỗi...' }))
    }

}
function* deleteOrderDetailSaga(actions) {
    try {
        const { id } = actions.payload
        yield axios.delete(`http://localhost:4000/orderdetails/${id}`)
        yield put(deleteOrderDetailSuccess({ id: id }))
    } catch (e) {
        yield put(orderListFailure({ error: 'Lỗi...' }))
    }
}
function* deleteOrderSaga(actions) {
    try {
        const { id } = actions.payload

        yield axios.delete(`http://localhost:4000/orders/${id}`)

    } catch (e) {
        yield put(orderListFailure({ error: 'Lỗi...' }))
    }
}
function* orderDetailListSaga(actions) {

    try {
        const { data, callback } = actions.payload;
        const { cartList, ...orderData } = data
        const result = yield axios.post('http://localhost:4000/orders', orderData)
        for (let i = 0; i < cartList.length; i++) {
            yield axios.post('http://localhost:4000/orderdetails', {
                orderId: result.data.id,
                productName: cartList[i].name,
                productId: cartList[i].productId,
                image: cartList[i].image,
                quantity: cartList[i].quantity,
                price: cartList[i].price,
                priceSum: cartList[i].priceSum,
                userId: cartList[i].userId,
                status: result.data.status


            })

        }
        for (let i = 0; i < cartList.length; i++) {
            const { id } = cartList[i]
            if (id !== "user") {

                axios.delete(`http://localhost:4000/carts/${id}`)
                yield put(deleteCartListSuccess({ id: id }))
                yield put(orderProductList({ data: [] }))
            }

        }
        yield callback()
    } catch (e) {
        yield put(orderListFailure({ error: 'Lỗi...' }))
    }

}
function* updateOrderSaga(actions) {
    try {
        const { id, status } = actions.payload
        const result = yield axios.patch(`http://localhost:4000/orderdetails/${id}`, {
            status: status
        })
        yield put(updateOrderSuccess({ data: result.data }))
    } catch (e) {
        yield put(updateOrderFailure({ error: 'Lỗi...' }))
    }
}


export default function* typeSaga() {
    yield takeEvery(getOrderListRequest, getOrderListSaga)
    yield takeEvery(orderListRequest, orderDetailListSaga)
    yield takeEvery(deleteOrderDetailRequest, deleteOrderDetailSaga)
    yield takeEvery(deleteOrderRequest, deleteOrderSaga)
    yield takeEvery(updateOrderRequest, updateOrderSaga)

}