import { debounce, takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import { getTypeRequest, getTypeSuccess, getTypeFailure } from "../slices/type.slice";

function* getTypeListSaga(actions) {

    try {
        const result = yield axios.get('http://localhost:4000/types')
        yield put(getTypeSuccess({ data: result.data }))
    } catch (e) {
        yield put(getTypeFailure({ error: 'Lỗi...' }))
    }
}

export default function* typeSaga() {
    yield takeEvery(getTypeRequest, getTypeListSaga)
}