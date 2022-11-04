import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import newsLetterReducer from "./reducers/news-letter.reducer";

export const NEWS_LETTER_KEY_IN_STORE = "newsLetter";

export const newsLetterSlice: Slice = createSlice({
  name: NEWS_LETTER_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...newsLetterReducer,
  },
});

export const {
  //? ********************| ADD NEWS LETTER ACTIONS |*******************/
  addNewsLetter,
  addNewsLetterSuccess,
  addNewsLetterFailure,
} = newsLetterSlice.actions;

//? ********************| NEWS LETTER SELECTORS |*******************/
export const loadingNewsLetter = (state: any) =>
  state[NEWS_LETTER_KEY_IN_STORE].newsLetter.loading;
export const entityNewsLetter = (state: any) =>
  state[NEWS_LETTER_KEY_IN_STORE].newsLetter.entity;
export const addSuccessNewsLetter = (state: any) =>
  state[NEWS_LETTER_KEY_IN_STORE].newsLetter.addSuccess;
