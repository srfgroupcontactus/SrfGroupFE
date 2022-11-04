import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  fetchProfileUser: (state: any) => {
    state.profile.loading = true;
  },
  fetchProfileUserSuccess: (state: any, action: PayloadAction) => {
    state.profile.loading = false;
    state.profile.entity = action.payload;
  },
  fetchProfileUserFailure: (state: any, action: PayloadAction) => {
    state.profile.loading = false;
  },

  reportUser: (state: any) => {
    state.profile.loadingReport = true;
    state.profile.reportSuccess = false;
  },
  reportUserSuccess: (state: any, action: PayloadAction) => {
    state.profile.loadingReport = false;
    state.profile.reportSuccess = true;
  },
  reportUserFailure: (state: any, action: PayloadAction) => {
    state.profile.loadingReport = false;
  },
};

export default reducer;
