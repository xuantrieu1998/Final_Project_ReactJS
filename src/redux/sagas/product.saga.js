import { debounce, takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import {
  getProductListRequest,
  getProductListSuccess,
  getProductListFailure,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFailure,
} from "../slices/product.slice";
import { MdOutlineVisibilityOff } from "react-icons/md";

function* getProductListSaga(actions) {

  try {
    const { typeId, priceOrder, keyword, limit, page, more } = actions.payload
    const result = yield axios.get('http://localhost:4000/products', {
      params: {
        typeId: typeId,
        ...(priceOrder && {
          _sort: "price",
          _order: priceOrder
        }),
        ...(keyword && { q: keyword }),
        _expand: 'type',
        _limit: limit,
        _page: page
      }
    })
    yield put(getProductListSuccess({
      data: result.data,
      meta: {
        page: page,
        limit: limit,
        total: parseInt(result.headers["x-total-count"]),
      },
      more,
    }))
  } catch (e) {
    yield put(getProductListFailure({ error: 'Lỗi...' }))
  }

}
function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload
    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: 'type',
        _embed: 'favorites',
      },
    })
    yield axios.patch(`http://localhost:4000/products/${id}`, {
      visit: result.data.visit + 1
    })
    yield put(getProductDetailSuccess({ data: result.data }))
  } catch (e) {
    yield put(getProductDetailFailure({ error: 'Lỗi...' }))
  }
}


export default function* typeSaga() {
  yield takeEvery(getProductListRequest, getProductListSaga)
  yield takeEvery(getProductDetailRequest, getProductDetailSaga)
}