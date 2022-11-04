import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  fetchHomeFeatures: (state: any) => {
    state.homeFeatures.loading = true;
  },
  fetchHomeFeaturesSuccess: (state: any, action: PayloadAction) => {
    state.homeFeatures.loading = false;
    state.homeFeatures.entity = action.payload;
  },
  fetchHomeFeaturesFailure: (state: any, action: PayloadAction) => {
    state.homeFeatures.loading = false;
  },
};

export default reducer;
