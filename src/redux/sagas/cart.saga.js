import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import {
    getCartListRequest,
    getCartListSuccess,
    getCartListFailure,
    addCartListRequest,
    addCartListSuccess,
    addCartListFailure,
    updateCartListRequest,
    updateCartListSuccess,
    updateCartListFailure,
    deleteCartListRequest,
    deleteCartListSuccess,
    deleteCartListFailure
} from "../slices/cart.slice";

function* getCartListSaga(actions) {

    try {
        const result = yield axios.get("http://localhost:4000/carts")
        yield put(getCartListSuccess({ data: result.data }))
    } catch (e) {
        yield put(getCartListFailure({ error: 'Lỗi...' }))
    }

}
function* addCartListSaga(actions) {

    try {
        const { productId, userId, name, option, price, quantity, image, sale } = actions.payload
        const result = yield axios.post("http://localhost:4000/carts", {
            productId: productId,
            productName: name,
            userId: userId,
            option: option,
            price: price,
            quantity: quantity,
            image: image,
            sale: sale
        })
        yield put(addCartListSuccess({ data: result.data }))
    } catch (e) {
        yield put(addCartListFailure({ error: 'Lỗi...' }))
    }

}
function* updateCartListSaga(action) {
    try {
        const { id, quantity } = action.payload
        const result = yield axios.patch(`http://localhost:4000/carts/${id}`, {
            quantity: quantity
        })
        yield put(updateCartListSuccess({ data: result.data }))

    } catch (e) {
        yield put(updateCartListFailure({ error: "lỗi" }))
    }
}
function* deleteCartListSaga(action) {
    try {
        const { id } = action.payload
        yield axios.delete(`http://localhost:4000/carts/${id}`)
        yield put(deleteCartListSuccess({ id: id }))

    } catch (e) {
        yield put(deleteCartListFailure({ error: "lỗi" }))
    }
}
export default function* typeSaga() {
    yield takeEvery(getCartListRequest, getCartListSaga)
    yield takeEvery(addCartListRequest, addCartListSaga)
    yield takeEvery(updateCartListRequest, updateCartListSaga)
    yield takeEvery(deleteCartListRequest, deleteCartListSaga)
}