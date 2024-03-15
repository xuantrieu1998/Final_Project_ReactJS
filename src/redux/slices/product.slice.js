import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: {
        data: [],
        meta: {},
        loading: false,
        error: null,
    },
    productDetail: {
        data: {},
        loading: false,
        error: null,
    },
    createProductData: {
        loading: false,
        error: null,
    },
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getProductListRequest: (state) => {
            state.productList.loading = true;
            state.productList.error = null
        },
        getProductListSuccess: (state, action) => {
            const { data, meta, more } = action.payload;
            state.productList.data = more
                ? [...state.productList.data, ...data]
                : data;
            state.productList.meta = meta;
            state.productList.loading = false;
        },
        getProductListFailure: (state, action) => {
            const { error } = action.payload
            state.productList.error = error
            state.productList.loading = false
        },
        getProductDetailRequest: (state) => {
            state.productDetail.loading = true
            state.productDetail.error = null
        },
        getProductDetailSuccess: (state, action) => {
            const { data } = action.payload
            state.productDetail.data = data
            state.productDetail.loading = false
        },
        getProductDetailFailure: (state, action) => {
            const { error } = action.payload
            state.productDetail.error = error
            state.productDetail.loading = false
        }
    }
})

export const {
    getProductListRequest,
    getProductListSuccess,
    getProductListFailure,
    getProductDetailRequest,
    getProductDetailSuccess,
    getProductDetailFailure,
} = productSlice.actions;

export default productSlice.reducer;