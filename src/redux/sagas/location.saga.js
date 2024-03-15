import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

import {
    getCityRequest,
    getCitySuccess,
    getCityFailure,
    getDistrictRequest,
    getDistrictSuccess,
    getDistrictFailure,
    getWardRequest,
    getWardSuccess,
    getWardFailure
} from "../slices/location.slice";

function* getCityListSaga(actions) {

    try {
        const result = yield axios.get('http://localhost:4000/cities')
        yield put(getCitySuccess({ data: result.data }))
    } catch (e) {
        yield put(getCityFailure({ error: 'Lỗi...' }))
    }

}
function* getDistrictListSaga(actions) {

    try {
        const { cityCode } = actions.payload
        const result = yield axios.get('http://localhost:4000/districts', {
            params: {
                parentcode: cityCode
            }
        })
        yield put(getDistrictSuccess({ data: result.data }))
    } catch (e) {
        yield put(getDistrictFailure({ error: 'Lỗi...' }))
    }

}
function* getWardListSaga(actions) {

    try {
        const { districtCode } = actions.payload
        const result = yield axios.get('http://localhost:4000/wards', {
            params: {
                parentcode: districtCode
            }
        })
        yield put(getWardSuccess({ data: result.data }))
    } catch (e) {
        yield put(getWardFailure({ error: 'Lỗi...' }))
    }

}

export default function* typeSaga() {
    yield takeEvery(getCityRequest, getCityListSaga)
    yield takeEvery(getWardRequest, getWardListSaga)
    yield takeEvery(getDistrictRequest, getDistrictListSaga)
}