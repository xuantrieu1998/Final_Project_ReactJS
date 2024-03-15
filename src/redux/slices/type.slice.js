import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    typeList: {
        data: [],
        loading: false,
        error: null
    }
}

export const typeSlice = createSlice({
    name: "type",
    initialState,
    reducers: {
        getTypeRequest: (state) => {
            state.typeList.loading = true
            state.typeList.error = null
        },
        getTypeSuccess: (state, action) => {
            const { data } = action.payload;
            state.typeList.data = data
            state.typeList.loading = false

        },
        getTypeFailure: (state, action) => {
            const { error } = action.payload
            state.typeList.error = error
            state.typeList.loading = false
        }
    }
})

export const { getTypeRequest, getTypeSuccess, getTypeFailure } = typeSlice.actions;

export default typeSlice.reducer;