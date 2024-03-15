import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favoriteList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
  favoriteProductData: {
    loading: false,
    error: null,
  },
  unFavoriteProductData: {
    loading: false,
    error: null,
  },
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    getFavoriteListRequest: (state, action) => {
      state.favoriteList.loading = true
      state.favoriteList.error = null
    },
    getFavoriteListSuccess: (state, action) => {
      const { data, meta } = action.payload
      state.favoriteList.loading = false
      state.favoriteList.data = data
      state.favoriteList.meta = meta
    },
    getFavoriteListFailure: (state, action) => {
      const { error } = action.payload
      state.favoriteList.loading = false
      state.favoriteList.error = error
    },
    favoriteProductRequest: (state, action) => {
      state.favoriteProductData.loading = true
      state.favoriteProductData.error = null
    },
    favoriteProductSuccess: (state, action) => {
      state.favoriteProductData.loading = false
    },
    favoriteProductFailure: (state, action) => {
      const { error } = action.payload
      state.favoriteProductData.loading = false
      state.favoriteProductData.error = error
    },
    unFavoriteProductRequest: (state, action) => {
      state.unFavoriteProductData.loading = true
      state.unFavoriteProductData.error = null
    },
    unFavoriteProductSuccess: (state, action) => {
      state.unFavoriteProductData.loading = false
    },
    unFavoriteProductFailure: (state, action) => {
      const { error } = action.payload
      state.unFavoriteProductData.loading = false
      state.unFavoriteProductData.error = error
    },
  },
})

export const {
  getFavoriteListRequest,
  getFavoriteListSuccess,
  getFavoriteListFailure,
  favoriteProductRequest,
  favoriteProductSuccess,
  favoriteProductFailure,
  unFavoriteProductRequest,
  unFavoriteProductSuccess,
  unFavoriteProductFailure,
} = favoriteSlice.actions

export default favoriteSlice.reducer
