import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "../../aboutus/store/initial.state";
import aboutUsReducer from "../../aboutus/store/reducers/aboutus.reducer";

export const ABOUT_US_KEY_IN_STORE = "aboutus";

export const aboutUsSlice: Slice = createSlice({
  name: ABOUT_US_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...aboutUsReducer,
  },
});

export const {
  //? ********************| FETCH ABOUT US ACTIONS |*******************/
  fetchAboutUs,
  fetchAboutUsSuccess,
  fetchAboutUsFailure,
} = aboutUsSlice.actions;

//? ********************| ABOUT US SELECTORS |*******************/
export const allAboutUsSelector = (state: any) =>
  state[ABOUT_US_KEY_IN_STORE].aboutus;
