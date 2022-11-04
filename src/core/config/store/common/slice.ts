import { createSlice, Slice } from "@reduxjs/toolkit";
import commonReducer from "./reducers/common.reducer";
import { initialState } from "./initial.state";
import { OFFER_KEY_IN_STORE } from "../../../../main-features/offer/store/slice";

export const COMMON_KEY_IN_STORE = "common";

export const commonSlice: Slice = createSlice({
  name: COMMON_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...commonReducer,
  },
});

//? ********************| LOGIN ACTIONS |*******************/
export const { showUnauthorizedModal, hideUnauthorizedModal } = commonSlice.actions;

//? ********************| SHOW MODAL SELECTORS |*******************/
export const showUnauthorized = (state: any) =>
  state[COMMON_KEY_IN_STORE].unauthorized.showUnauthorized;
