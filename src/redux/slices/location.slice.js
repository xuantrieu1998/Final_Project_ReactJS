import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cityList: {
        data: [],
        loading: false,
        error: null
    }, districtList: {
        data: [],
        loading: false,
        error: null
    },
    wardList: {
        data: [],
        loading: false,
        error: null
    }

}

export const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        getCityRequest: (state) => {
            state.cityList.loading = true
            state.cityList.error = null
        },
        getCitySuccess: (state, action) => {
            const { data } = action.payload;
            state.cityList.data = data
            state.cityList.loading = false

        },
        getCityFailure: (state, action) => {
            const { error } = action.payload
            state.cityList.error = error
            state.cityList.loading = false
        },
        getDistrictRequest: (state) => {
            state.districtList.loading = true
            state.districtList.error = null
        },
        getDistrictSuccess: (state, action) => {
            const { data } = action.payload;
            state.districtList.data = data
            state.districtList.loading = false

        },
        getDistrictFailure: (state, action) => {
            const { error } = action.payload
            state.districtList.error = error
            state.districtList.loading = false
        },
        getWardRequest: (state) => {
            state.wardList.loading = true
            state.wardList.error = null
        },
        getWardSuccess: (state, action) => {
            const { data } = action.payload;
            state.wardList.data = data
            state.wardList.loading = false

        },
        getWardFailure: (state, action) => {
            const { error } = action.payload
            state.wardList.error = error
            state.wardList.loading = false
        }
    }
})

export const {
    getCityRequest,
    getCitySuccess,
    getCityFailure,
    getDistrictRequest,
    getDistrictSuccess,
    getDistrictFailure,
    getWardRequest,
    getWardSuccess,
    getWardFailure } = locationSlice.actions;

export default locationSlice.reducer;