import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'

import {
  favoriteProductRequest,
  favoriteProductSuccess,
  favoriteProductFailure,
  unFavoriteProductRequest,
  unFavoriteProductSuccess,
  unFavoriteProductFailure,
  getFavoriteListRequest,
  getFavoriteListSuccess,
  getFavoriteListFailure
} from '../slices/favorite.slice'

function* favoriteProductSaga(action) {
  try {
    const { data } = action.payload
    const result = yield axios.post('http://localhost:4000/favorites', data)
    yield put(favoriteProductSuccess({ data: result.data }))
  } catch (e) {
    yield put(favoriteProductFailure({ error: 'Lỗi' }))
  }
}

function* unFavoriteProductSaga(action) {
  try {
    const { id } = action.payload
    yield axios.delete(`http://localhost:4000/favorites/${id}`)
    yield put(unFavoriteProductSuccess({ id: id }))
  } catch (e) {
    yield put(unFavoriteProductFailure({ error: 'Lỗi' }))
  }
}
function* getFavoriteProductSaga(action) {
  try {
    const result = yield axios.get("http://localhost:4000/favorites", {
      params: {
        _expand: "product"
      }
    })
    yield put(getFavoriteListSuccess({ data: result.data }))
  } catch (e) {
    yield put(getFavoriteProductSaga({ error: 'Lỗi' }))
  }
}

export default function* favoriteSaga() {
  yield takeEvery(favoriteProductRequest, favoriteProductSaga)
  yield takeEvery(unFavoriteProductRequest, unFavoriteProductSaga)
  yield takeEvery(getFavoriteListRequest,getFavoriteProductSaga)
}
