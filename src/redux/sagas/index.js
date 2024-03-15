import { fork } from "redux-saga/effects";

import typeSaga from "./type.saga";
import productSaga from "./product.saga";
import authSaga from "./auth.saga";
import cartSaga from "./cart.saga";
import locationSaga from "./location.saga";
import orderSaga from "./order.saga";
import reviewSaga from "./review.saga";
import favoriteSaga from "./favorite.saga";

export default function* rootSaga() {
    yield fork(typeSaga)
    yield fork(productSaga)
    yield fork(authSaga)
    yield fork(cartSaga)
    yield fork(locationSaga)
    yield fork(orderSaga)
    yield fork(reviewSaga)
    yield fork(favoriteSaga)
}