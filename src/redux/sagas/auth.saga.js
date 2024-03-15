import { debounce, takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import { notification } from "antd";

import {
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    getUserInfoRequest,
    getUserInfoSuccess,
    getUserInfoFailure,
    changeAvatarRequest,
    changeAvatarSuccess,
    changeAvatarFailure,
    upDateUserInfoRequest,
    upDateUserInfoSuccess,
    upDateUserInfoFailure,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFailure
} from "../slices/auth.slice";
import { updateCartListSuccess } from "../slices/cart.slice";

function* registerSaga(actions) {

    try {
        const { data, callback } = actions.payload
        const result = yield axios.post('http://localhost:4000/register', data)
        yield put(registerSuccess({ data: result.data }))
        notification.success({
            message: " Đăng ký tài khoản thành công!"
        })
    } catch (e) {
        yield put(registerFailure({ error: e.response.data === 'Email already exists' ? 'Email đã tồn tại' : e.response.data, }))
    }

}
function* LoginSaga(actions) {

    try {
        const { data, callback } = actions.payload
        const result = yield axios.post('http://localhost:4000/login', data)
        yield localStorage.setItem("accessToken", result.data.accessToken)
        yield put(loginSuccess({ data: result.data.user }))
        yield callback()
        notification.success({
            message: " Đăng nhập thành công!"
        })
    } catch (e) {
        yield put(loginFailure({ error: "Email hoặc mật khẩu không đúng!" }))
    }

}

function* getUserInfoSaga(actions) {
    try {
        const { id } = actions.payload;
        const result = yield axios.get(`http://localhost:4000/users/${id}`);
        yield put(getUserInfoSuccess({ data: result.data }))
    } catch (e) {
        yield put(getUserInfoFailure({ error: 'lỗi' }))
    }
}
function* changeAvatarSaga(actions) {
    try {
        const { id, data } = actions.payload
        const result = yield axios.patch(`http://localhost:4000/users/${id}`, data)
        yield put(changeAvatarSuccess({ data: result.data }))
        notification.success({
            message: 'Cập nhật thành công',
        })
    } catch (e) {
        yield put(changeAvatarFailure({ error: 'Lỗi...' }))
    }
}
function* updateUserInfoSaga(actions) {
    try {
        const { id, data } = actions.payload
        const result = yield axios.patch(`http://localhost:4000/users/${id}`, data)
        yield put(upDateUserInfoSuccess({ data: result.data }))
        notification.success({
            message: 'Cập nhật thông tin thành công',
        })
    } catch (e) {
        yield put(upDateUserInfoFailure({ error: 'Lỗi...' }))
    }
}
function* changePasswordSaga(action) {
    try {
        const { id, data, callback } = action.payload
        yield axios.post('http://localhost:4000/login', {
            email: data.email,
            password: data.password,
        })
        const result = yield axios.patch(`http://localhost:4000/users/${id}`, {
            password: data.newPassword,
        })
        yield callback()
        notification.success({ message: 'Cập nhật thành công' })
        yield put(changePasswordSuccess({ data: result.data }))
    } catch (e) {
        yield put(changePasswordFailure({ error: 'Lỗi' }))
    }
}
export default function* typeSaga() {
    yield takeEvery(registerRequest, registerSaga)
    yield takeEvery(loginRequest, LoginSaga)
    yield takeEvery(getUserInfoRequest, getUserInfoSaga)
    yield takeEvery(changeAvatarRequest, changeAvatarSaga)
    yield takeEvery(upDateUserInfoRequest, updateUserInfoSaga)
    yield takeEvery(changePasswordRequest, changePasswordSaga)
}