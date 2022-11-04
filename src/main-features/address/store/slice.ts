import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "../../address/store/initial.state";
import addressReducer from "../../address/store/reducers/address.reducer";

export const ADDRESS_KEY_IN_STORE = "address";

export const addressSlice: Slice = createSlice({
  name: ADDRESS_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...addressReducer,
  },
});

export const {
  //? ********************| LOGIN ACTIONS |*******************/
  fetchAddress,
  fetchAddressSuccess,
  fetchAddressFailure,
} = addressSlice.actions;

//? ********************| LOGIN SELECTORS |*******************/
export const allAddressSelector = (state: any) =>
  state[ADDRESS_KEY_IN_STORE].address;
export const entitiesAddress = (state: any) =>
  state[ADDRESS_KEY_IN_STORE].address.entities;
