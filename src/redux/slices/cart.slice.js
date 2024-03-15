import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartList: {
        data: [],
        loading: false,
        error: null
    },
    orderList: {
        data: []
    }
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        getCartListRequest: (state) => {
            state.cartList.loading = true
            state.cartList.error = null
        },
        getCartListSuccess: (state, action) => {
            const { data } = action.payload;
            state.cartList.data = data
            state.cartList.loading = false

        },
        getCartListFailure: (state, action) => {
            const { error } = action.payload
            state.cartList.error = error
            state.cartList.loading = false
        },
        addCartListRequest: (state) => {
            state.cartList.loading = true
            state.cartList.error = null
        },
        addCartListSuccess: (state, action) => {
            const { data } = action.payload;
            state.cartList.data = [...state.cartList.data, data]
            state.cartList.loading = false

        },
        addCartListFailure: (state, action) => {
            const { error } = action.payload
            state.cartList.error = error
            state.cartList.loading = false
        },
        updateCartListRequest: (state) => {
            state.cartList.loading = true
            state.cartList.error = null
        },
        updateCartListSuccess: (state, action) => {
            const { data } = action.payload;
            const indexId = state.cartList.data.findIndex((item) => item.id === data.id);
            state.cartList.data[indexId] = data
            state.cartList.loading = false

        },
        updateCartListFailure: (state, action) => {
            const { error } = action.payload
            state.cartList.error = error
            state.cartList.loading = false
        },
        deleteCartListRequest: (state) => {
            state.cartList.loading = true
            state.cartList.error = null
        },
        deleteCartListSuccess: (state, action) => {
            const { id } = action.payload;
            const indexId = state.cartList.data.findIndex((item) => item.id === id);
            state.cartList.data.splice(indexId, 1)
            state.cartList.loading = false

        },
        deleteCartListFailure: (state, action) => {
            const { error } = action.payload
            state.cartList.error = error
            state.cartList.loading = false
        },
        orderProductList: (state, action) => {
            const { data } = action.payload;
            state.orderList.data = data
        }
    }
})

export const { getCartListRequest,
    getCartListSuccess,
    getCartListFailure,
    addCartListRequest,
    addCartListSuccess,
    addCartListFailure,
    updateCartListRequest,
    updateCartListSuccess,
    updateCartListFailure,
    deleteCartListRequest,
    deleteCartListSuccess,
    deleteCartListFailure,
    orderProductList } = cartSlice.actions;

export default cartSlice.reducer;