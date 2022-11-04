import { all, takeEvery } from "redux-saga/effects";
import { fetchFaq } from "../../faq/store/slice";
import { fetchFaqHandler } from "./saga-handler/faq.generator";

export function* faqSaga() {
  yield all([takeEvery(fetchFaq, fetchFaqHandler)]);
}

export default faqSaga;
