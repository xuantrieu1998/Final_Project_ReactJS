import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reviewList: {
        data: [],
        loading: false,
        error: null,
      },
      reviewProductData: {
        loading: false,
        error: null,
      },
}

export const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        getReviewRequest: (state, action) => {
            state.reviewList.loading = true
            state.reviewList.error = null
          },
          getReviewSuccess: (state, action) => {
            const { data } = action.payload
            state.reviewList.data = data
            state.reviewList.loading = false
          },
          getReviewFailure: (state, action) => {
            const { error } = action.payload
            state.reviewList.loading = false
            state.reviewList.error = error
          },
          addReviewRequest: (state, action) => {
            state.reviewProductData.loading = true
            state.reviewProductData.error = null
          },
          addReviewSuccess: (state, action) => {
            state.reviewProductData.loading = false
          },
          addReviewFailure: (state, action) => {
            const { error } = action.payload
            state.reviewProductData.loading = false
            state.reviewProductData.error = error
      },
      updateReviewRequest: () => {
            
      },
      updateReviewSuccess: (state,action) => {
        const { data } = action.payload;
        const indexId = state.reviewList.data.findIndex((item) => item.id === data.id);
        state.reviewList.data[indexId] = data
        state.reviewList.loading = false
      },
      updateReviewFailure: () => {
            
      }
      ,
      deleteReviewRequest: () => {
            
      },
      deleteReviewSuccess: (state,action) => {
        const { id } = action.payload;
            const indexId = state.reviewList.data.findIndex((item) => item.id === id);
            state.reviewList.data.splice(indexId, 1)
            state.reviewList.loading = false
      },
      deleteReviewFailure: () => {
            
      }
    }
})

export const {
    getReviewRequest,
    getReviewSuccess,
    getReviewFailure,
    addReviewRequest,
    addReviewSuccess,
  addReviewFailure,
  updateReviewRequest,
  updateReviewSuccess,
  updateReviewFailure,
  deleteReviewRequest,
  deleteReviewSuccess,
    deleteReviewFailure
} = reviewSlice.actions;

export default reviewSlice.reducer;