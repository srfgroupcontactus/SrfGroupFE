import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  addContactUs: (state: any) => {
    state.contactus.loading = true;
    state.contactus.addSuccess = false;
  },
  addContactUsSuccess: (state: any, action: PayloadAction) => {
    state.contactus.loading = false;
    state.contactus.addSuccess = true;
  },
  addContactUsFailure: (state: any, action: PayloadAction) => {
    state.contactus.loading = false;
    state.contactus.addSuccess = false;
  },
};

export default reducer;
