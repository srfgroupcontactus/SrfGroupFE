import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  fetchCategories: (state: any) => {
    state.category.loading = true;
  },
  fetchCategoriesSuccess: (state: any, action: PayloadAction) => {
    state.category.loading = false;
    state.category.entities = action.payload;
  },
  fetchCategoriesFailure: (state: any, action: PayloadAction) => {
    state.category.loading = false;
  },
};

export default reducer;
