import { all, takeEvery } from "redux-saga/effects";
import { addProblemeDecalration } from "./slice";
import { addProblemeDecalrationHandler } from "./saga-handler/probleme-declaration.generator";

export function* problemeDeclarationSaga() {
  yield all([takeEvery(addProblemeDecalration, addProblemeDecalrationHandler)]);
}

export default problemeDeclarationSaga;
