import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'

import productReducer from "./redux/slices/product.slice";
import typeReducer from "./redux/slices/type.slice";
import authReducer from "./redux/slices/auth.slice";
import cartReducer from "./redux/slices/cart.slice";
import locationReducer from "./redux/slices/location.slice";
import orderReducer from "./redux/slices/order.slice";
import reviewReducer from "./redux/slices/review.slice";
import favoriteReducer from "./redux/slices/favorite.slice";


import rootSaga from './redux/sagas'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        product: productReducer,
        type: typeReducer,
        auth: authReducer,
        cart: cartReducer,
        location: locationReducer,
        order: orderReducer,
        review: reviewReducer,
        favorite: favoriteReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            thunk: false,
            serializableCheck: false,
        }),
        sagaMiddleware,
    ],

})

sagaMiddleware.run(rootSaga)
export default store