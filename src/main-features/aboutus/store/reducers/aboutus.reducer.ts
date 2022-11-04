import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  fetchAboutUs: (state: any) => {
    state.aboutus.loading = true;
  },
  fetchAboutUsSuccess: (state: any, action: PayloadAction) => {
    state.aboutus.loading = false;
    state.aboutus.entity = action.payload;
  },
  fetchAboutUsFailure: (state: any, action: PayloadAction) => {
    state.aboutus.loading = false;
  },
};

export default reducer;
