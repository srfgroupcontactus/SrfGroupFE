import { all, takeEvery } from "redux-saga/effects";
import { addNewsLetterHandler } from "./saga-handler/news-letter.generator";
import { addNewsLetter } from "../store/slice";

export function* newsLetterSaga() {
  yield all([takeEvery(addNewsLetter, addNewsLetterHandler)]);
}

export default newsLetterSaga;
