import { all, takeEvery } from "redux-saga/effects";
import { addContactUs } from "../../contact-us/store/slice";
import { addContactUsHandler } from "./saga-handler/contact-us.generator";

export function* contactUsSaga() {
  yield all([takeEvery(addContactUs, addContactUsHandler)]);
}

export default contactUsSaga;
