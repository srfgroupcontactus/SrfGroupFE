import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "../../category/store/initial.state";
import categoryReducer from "../../category/store/reducers/category.reducer";

export const CATEGORY_KEY_IN_STORE = "category";

export const categorySlice: Slice = createSlice({
  name: CATEGORY_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...categoryReducer,
  },
});

export const {
  //? ********************| LOGIN ACTIONS |*******************/
  fetchCategories,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = categorySlice.actions;

//? ********************| LOGIN SELECTORS |*******************/
export const allCategorySelector = (state: any) =>
  state[CATEGORY_KEY_IN_STORE].category;
export const entitiesCategory = (state: any) =>
  state[CATEGORY_KEY_IN_STORE].category.entities;
