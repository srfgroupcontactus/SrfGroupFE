import { all, takeEvery } from "redux-saga/effects";
import { fetchAddress } from "../../address/store/slice";
import { fetchAddressHandler } from "./saga-handler/address.generator";

export function* addressSaga() {
  yield all([takeEvery(fetchAddress, fetchAddressHandler)]);
}

export default addressSaga;
