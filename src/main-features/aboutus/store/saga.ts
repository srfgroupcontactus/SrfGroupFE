import { all, takeEvery } from "redux-saga/effects";
import { fetchAboutUs } from "../../aboutus/store/slice";
import { fetchAboutUsHandler } from "./saga-handler/aboutus.generator";

export function* aboutUsSaga() {
  yield all([takeEvery(fetchAboutUs, fetchAboutUsHandler)]);
}

export default aboutUsSaga;
