import { all, takeEvery } from "redux-saga/effects";
import {
  fetchCart,
  addCart,
  updateByQuantityCart,
  detailsCart,
  deleteCart,
  addOrder,
  fetchOrder
} from "./slice";
import {
  addCartHandler,
  deleteCartHandler,
  detailsCartHandler,
  fetchCartHandler,
  updateByQuantityCartHandler,
} from "./saga-handler/cart.generator";
import {addOrderHandler, fetchOrderHandler} from "./saga-handler/order.generator";

export function* cartSaga() {
  yield all([
    takeEvery(fetchCart, fetchCartHandler),
    takeEvery(addCart, addCartHandler),
    takeEvery(updateByQuantityCart, updateByQuantityCartHandler),
    takeEvery(detailsCart, detailsCartHandler),
    takeEvery(deleteCart, deleteCartHandler),
    takeEvery(addOrder, addOrderHandler),
    takeEvery(fetchOrder, fetchOrderHandler),
  ]);
}

export default cartSaga;
