import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "../../faq/store/initial.state";
import faqReducer from "../../faq/store/reducers/faq.reducer";

export const FAQ_KEY_IN_STORE = "faq";

export const faqSlice: Slice = createSlice({
  name: FAQ_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...faqReducer,
  },
});

export const {
  //? ********************| FETCH FAQ ACTIONS |*******************/
  fetchFaq,
  fetchFaqSuccess,
  fetchFaqFailure,
} = faqSlice.actions;

//? ********************| FAQ SELECTORS |*******************/
export const allFaqSelector = (state: any) => state[FAQ_KEY_IN_STORE].faq;
