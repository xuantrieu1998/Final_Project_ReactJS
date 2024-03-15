import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderList: {
        data: [],
        loading: false,
        error: null
    }
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderListRequest: (state) => {
            state.orderList.loading = true
            state.orderList.error = null
        },
        orderListSuccess: (state, action) => {
            state.orderList.loading = false
            state.orderList.error = null

        },
        orderListFailure: (state, action) => {
            const { error } = action.payload
            state.orderList.error = error
            state.orderList.loading = false
        },
        getOrderListRequest: (state) => {
            state.orderList.loading = true
            state.orderList.error = null
        },
        getOrderListSuccess: (state, action) => {
            const { data } = action.payload;
            state.orderList.data = data
            state.orderList.loading = false

        },
        getOrderListFailure: (state, action) => {
            const { error } = action.payload
            state.orderList.error = error
            state.orderList.loading = false
        },
        deleteOrderDetailRequest: (state) => {
            state.orderList.loading = true
            state.orderList.error = null
        },
        deleteOrderDetailSuccess: (state, action) => {
            const { id } = action.payload;
            const indexId = state.orderList.data.findIndex((item) => item.id === id);
            state.orderList.data.splice(indexId, 1)
            state.orderList.loading = false
            state.orderList.error = null

        },
        deleteOrderDetailFailure: (state, action) => {
            const { error } = action.payload
            state.orderList.error = error
            state.orderList.loading = false
        },
        deleteOrderRequest: () => {

        },
        updateOrderRequest: () => {

        },
        updateOrderSuccess: (state, action) => {
            const { data } = action.payload;
            const indexId = state.orderList.data.findIndex((item) => item.id === data.id);
            state.orderList.data[indexId] = data
            state.orderList.loading = false
        },
        updateOrderFailure: () => {

        }
    }
})

export const {
    orderListRequest,
    orderListSuccess,
    orderListFailure,
    getOrderListRequest,
    getOrderListSuccess,
    getOrderListFailure,
    deleteOrderDetailRequest,
    deleteOrderDetailSuccess,
    deleteOrderDetailFailure,
    deleteOrderRequest,
    updateOrderRequest,
    updateOrderSuccess,
    updateOrderFailure
} = orderSlice.actions;

export default orderSlice.reducer;