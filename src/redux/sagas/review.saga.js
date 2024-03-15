import { debounce, takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import {
  getReviewRequest,
  getReviewSuccess,
  getReviewFailure,
  addReviewRequest,
  addReviewSuccess,
  addReviewFailure,
  updateReviewRequest,
  updateReviewSuccess,
  updateReviewFailure,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFailure
} from "../slices/review.slice";

function* getReviewListSaga(actions) {

  try {
    const { productId } = actions.payload
    const result = yield axios.get('http://localhost:4000/reviews', {
      params: {
        _expand: 'user',
        _sort: 'createdAt',
        _order: 'desc',
        productId: productId,
      },
    })
    yield put(getReviewSuccess({ data: result.data }))
  } catch (e) {
    yield put(getReviewFailure({ error: 'Lỗi' }))
  }

}
function* addReviewListSaga(actions) {

  try {
    const { data } = actions.payload
    const result = yield axios.post('http://localhost:4000/reviews', data)
    yield put(addReviewSuccess({ data: result.data }))
    yield put(getReviewSuccess({ productId: data.productId }))
  } catch (e) {
    yield put(addReviewFailure({ error: 'Lỗi...' }))
  }

}
function* updateReviewSaga(actions) {
  try {
    const { id, comment, callback } = actions.payload
    const result = yield axios.patch(`http://localhost:4000/reviews/${id}`, {
      comment: comment
    })
    yield put(updateReviewSuccess({ data: result.data }))
  } catch (e) {
    yield put(updateReviewFailure({ error: 'Lỗi...' }))
  }
}

function* deleteReviewSaga(actions) {
  try {
    const { id } = actions.payload
    const result = yield axios.delete(`http://localhost:4000/reviews/${id}`)
    yield put(deleteReviewSuccess({ id: id }))
  } catch (e) {
    yield put(deleteReviewFailure({ error: 'Lỗi...' }))
  }
}


export default function* typeSaga() {
  yield takeEvery(getReviewRequest, getReviewListSaga)
  yield takeEvery(addReviewRequest, addReviewListSaga)
  yield takeEvery(updateReviewRequest, updateReviewSaga)
  yield takeEvery(deleteReviewRequest, deleteReviewSaga)
}