import { all, takeEvery } from "redux-saga/effects";
import { fetchCategories } from "../../category/store/slice";
import { fetchCategoriesHandler } from "./saga-handler/category.generator";

export function* categorySaga() {
  yield all([takeEvery(fetchCategories, fetchCategoriesHandler)]);
}

export default categorySaga;
