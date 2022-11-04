import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  fetchAddress: (state: any) => {
    state.address.loading = true;
  },
  fetchAddressSuccess: (state: any, action: PayloadAction) => {
    state.address.loading = false;
    state.address.entities = action.payload;
  },
  fetchAddressFailure: (state: any, action: PayloadAction) => {
    state.address.loading = false;
  },
};

export default reducer;
