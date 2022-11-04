import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "../../contact-us/store/initial.state";
import contactUsReducer from "../../contact-us/store/reducers/contact-us.reducer";

export const CONTACT_US_KEY_IN_STORE = "contactus";

export const contactUsSlice: Slice = createSlice({
  name: CONTACT_US_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...contactUsReducer,
  },
});

export const {
  //? ********************| ADD CONTACT US ACTIONS |*******************/
  addContactUs,
  addContactUsSuccess,
  addContactUsFailure,
} = contactUsSlice.actions;

//? ********************| LOGIN SELECTORS |*******************/
export const allContactUsSelector = (state: any) =>
  state[CONTACT_US_KEY_IN_STORE].contactus;
