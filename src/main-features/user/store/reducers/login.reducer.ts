import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  loginUser: (state: any) => {
    state.login.loading = true;
  },
  loginUserSuccess: (state: any, action: PayloadAction) => {
    state.login.loading = false;
    state.login.token = action.payload;
  },
  loginUserFailure: (state: any, action: PayloadAction) => {
    state.login.loading = false;
  },

  loginWithFacebook: (state: any) => {
    state.login.loading = true;
  },
  loginWithFacebookSuccess: (state: any, action: PayloadAction) => {
    state.login.loading = false;
    state.login.token = action.payload;
  },
  loginWithFacebookFailure: (state: any, action: PayloadAction) => {
    state.login.loading = false;
  },

  loginWithGoogle: (state: any) => {
    state.login.loading = true;
  },
  loginWithGoogleSuccess: (state: any, action: PayloadAction) => {
    state.login.loading = false;
    state.login.token = action.payload;
  },
  loginWithGoogleFailure: (state: any, action: PayloadAction) => {
    state.login.loading = false;
  },

  loginWithGoogleOneTap: (state: any) => {
    state.login.loading = true;
    state.login.loginWithGoogleOneTapSuccess = false;
  },
  loginWithGoogleOneTapSuccess: (state: any, action: PayloadAction) => {
    state.login.loading = false;
    state.login.token = action.payload;
    state.login.loginWithGoogleOneTapSuccess = true;
  },
  loginWithGoogleOneTapFailure: (state: any, action: PayloadAction) => {
    state.login.loading = false;
  },
};

export default reducer;
