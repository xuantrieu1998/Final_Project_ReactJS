import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {
        data: {},
        loading: true,
        error: null,
    },
    registerData: {
        loading: false,
        error: null,
    },
    loginData: {
        loading: false,
        error: null,
    },
    updateUserInfoData: {
        loading: false,
        error: null,
    },
    changeAvatarData: {
        loading: false,
        error: null,
    },
    changePasswordData: {
        load: false,
        error: null,
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        registerRequest: (state) => {
            state.registerData.loading = true;
            state.registerData.error = null;
        },
        registerSuccess: (state) => {
            state.registerData.loading = false;
            state.registerData.error = null;

        },
        registerFailure: (state, action) => {
            const { error } = action.payload;
            state.registerData.loading = false;
            state.registerData.error = error


        },
        loginRequest: (state) => {
            state.loginData.loading = true;
            state.loginData.error = null;
        },
        loginSuccess: (state, action) => {
            const { data } = action.payload;
            state.loginData.loading = false
            state.userInfo.data = data;
            state.userInfo.loading = false
        },
        loginFailure: (state, action) => {
            const { error } = action.payload;
            state.loginData.loading = false;
            state.loginData.error = error
        },
        logOutRequest: (state) => {
            state.userInfo.data = {}
            localStorage.removeItem('accessToken')

        },
        getUserInfoRequest: (state) => {
            state.userInfo.loading = true
            state.userInfo.error = null
        },
        getUserInfoSuccess: (state, action) => {
            const { data } = action.payload
            state.userInfo.loading = false
            state.userInfo.data = data
        },
        getUserInfoFailure: (state, action) => {
            const { error } = action.payload
            state.userInfo.error = error
            state.userInfo.loading = false
        },
        changeAvatarRequest: (state) => {
            state.changeAvatarData.loading = true
            state.changeAvatarData.error = null
        },
        changeAvatarSuccess: (state, action) => {
            const { data } = action.payload
            state.changeAvatarData.loading = false
            state.userInfo.data = data
        },
        changeAvatarFailure: (state, action) => {
            const { error } = action.payload
            state.changeAvatarData.error = error
            state.changeAvatarData.loading = false
        },
        upDateUserInfoRequest: (state) => {
            state.updateUserInfoData.loading = true
            state.updateUserInfoData.error = null
        },
        upDateUserInfoSuccess: (state, action) => {
            const { data } = action.payload
            state.updateUserInfoData.loading = false
            state.userInfo.data = data

        },
        upDateUserInfoFailure: (state, action) => {
            const { error } = action.payload
            state.updateUserInfoData.error = error
            state.updateUserInfoData.loading = false
        },
        changePasswordRequest: (state, action) => {
            state.changePasswordData.loading = true
            state.changePasswordData.error = null
        },
        changePasswordSuccess: (state, action) => {
            state.changePasswordData.loading = false
        },
        changePasswordFailure: (state, action) => {
            const { error } = action.payload
            state.changePasswordData.loading = false
            state.changePasswordData.error = error
        },

    }
})

export const {
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    logOutRequest,
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
} = authSlice.actions;

export default authSlice.reducer;