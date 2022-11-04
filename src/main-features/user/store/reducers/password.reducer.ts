import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  resetPasswordInit: (state: any) => {
    state.password.loadingResetInit = true;
    state.password.resetInitSuccess = false;
  },
  resetPasswordInitSuccess: (state: any, action: PayloadAction) => {
    state.password.loadingResetInit = false;
    state.password.resetInitSuccess = true;
  },
  resetPasswordInitFailure: (state: any, action: PayloadAction) => {
    state.password.loadingResetInit = false;
  },

  resetPasswordFinish: (state: any) => {
    state.password.loadingResetFinish = true;
    state.password.resetFinishSuccess = false;
  },
  resetPasswordFinishSuccess: (state: any, action: PayloadAction) => {
    state.password.loadingResetFinish = false;
    state.password.resetFinishSuccess = true;
  },
  resetPasswordFinishFailure: (state: any, action: PayloadAction) => {
    state.password.loadingResetFinish = false;
  },

  resetPassword: (state: any) => {
    state.password = initialState.password;
  },
};

export default reducer;
