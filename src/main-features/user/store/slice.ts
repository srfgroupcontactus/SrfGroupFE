import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import loginReducer from "./reducers/login.reducer";
import sessionReducer from "./reducers/session.reducer";
import registerReducer from "./reducers/register.reducer";
import accountReducer from "./reducers/account.reducer";
import profileReducer from "./reducers/profile.reducer";
import localeReducer from "./reducers/locale.reducer";
import passwordReducer from "./reducers/password.reducer";
import websocketReducer from "./reducers/websocket.reducer";

export const USER_KEY_IN_STORE = "user";

export const userSlice: Slice = createSlice({
  name: USER_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...loginReducer,
    ...sessionReducer,
    ...registerReducer,
    ...accountReducer,
    ...profileReducer,
    ...localeReducer,
    ...passwordReducer,
    ...websocketReducer,
  },
});

export const {
  //? ********************| LOGIN ACTIONS |*******************/
  loginUser,
  loginUserSuccess,
  loginUserFailure,

  //? ********************| LOGIN VIA FACEBOOK ACTIONS |*******************/
  loginWithFacebook,
  loginWithFacebookSuccess,
  loginWithFacebookFailure,

  //? ********************| LOGIN VIA GOOGLE ACTIONS |*******************/
  loginWithGoogle,
  loginWithGoogleSuccess,
  loginWithGoogleFailure,

  //? ********************| LOGIN VIA GOOGLE ONE TAP ACTIONS |*******************/
  loginWithGoogleOneTap,
  loginWithGoogleOneTapSuccess,
  loginWithGoogleOneTapFailure,

  //? ********************| SESSION ACTIONS |*******************/
  sessionUser,
  sessionUserSuccess,
  sessionUserFailure,

  //? ********************| SET USER_ID OS ACTIONS |*******************/
  setUserIdOS,

  //? ********************| NUMBER_NOTIFICATIONS ACTIONS |*******************/
  getNumberOfNotificationsNotSee,
  getNumberOfNotificationsNotSeeSuccess,
  getNumberOfNotificationsNotSeeFailure,
  resetNumberOfNotificationsNotSee,

  //? ********************| NUMBER_MESSAGES ACTIONS |*******************/
  getNumberOfMessagesNotSee,
  getNumberOfMessagesNotSeeSuccess,
  getNumberOfMessagesNotSeeFailure,

  //? ********************| NUMBER CARTS ACTIONS |*******************/
  getNumberOfCarts,
  getNumberOfCartsSuccess,
  getNumberOfCartsFailure,

  //? ********************| REGISTER ACTIONS |*******************/
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  resetRegisterUser,

  //? ********************| ACTIVATION ACCOUNT ACTIONS |*******************/
  activationAccount,
  activationAccountSuccess,
  activationAccountFailure,

  //? ********************| UPDATE ACCOUNT INFOS ACTIONS |*******************/
  updateInfosAccount,
  updateInfosAccountSuccess,
  updateInfosAccountFailure,

  //? ********************| UPDATE ACCOUNT PASSWORD ACTIONS |*******************/
  updatePasswordAccount,
  updatePasswordAccountSuccess,
  updatePasswordAccountFailure,

  //? ********************| UPDATE AVATAR ACCOUNT ACTIONS |*******************/
  updateAvatarAccount,
  updateAvatarSuccess,
  updateAvatarFailure,

  //? ********************| FETCH ACTIONS |*******************/
  fetchProfileUser,
  fetchProfileUserSuccess,
  fetchProfileUserFailure,

  //? ********************| CHANGE LOCALE ACTIONS |*******************/
  changeLocale,

  //? ********************| CHANGE PASSWORD INIT ACTIONS |*******************/
  resetPasswordInit,
  resetPasswordInitSuccess,
  resetPasswordInitFailure,
  resetPassword,

  //? ********************| CHANGE PASSWORD FINISH ACTIONS |*******************/
  resetPasswordFinish,
  resetPasswordFinishSuccess,
  resetPasswordFinishFailure,

  //? ********************| WEBSOCKET ACTIONS |*******************/
  connectedUserWS,
  fetchListConnectedUsersWS,
  fetchListConnectedUsersWSSuccess,
  fetchListConnectedUsersWSFailure,
  addNewConnectedUser,
  removeDisconnectedUser,

  //? ********************| ADD REPORT ACTIONS |*******************/
  reportUser,
  reportUserSuccess,
  reportUserFailure,

  logout,
} = userSlice.actions;

//? ********************| LOGIN SELECTORS |*******************/
export const allLoginSelector = (state: any) => state[USER_KEY_IN_STORE].login;
export const loginWithGoogleOneTapSuccessLogin = (state: any) =>
  state[USER_KEY_IN_STORE].login.loginWithGoogleOneTapSuccess;

// export const allLoginSelector = '';

//? ********************| LOCALE SELECTORS |*******************/
export const allLocaleSelector = (state: any) =>
  state[USER_KEY_IN_STORE].locale;
// export const allLocaleSelector = '';

//? ********************| SESSION SELECTORS |*******************/
export const allSessionSelector = (state: any) =>
  state[USER_KEY_IN_STORE].session;
export const loadingSession = (state: any) =>
  state[USER_KEY_IN_STORE].session.loading;
export const currentUserSession = (state: any) =>
  state[USER_KEY_IN_STORE].session.currentUser;

//? ********************| ACCOUNT SELECTORS |*******************/
export const loadingUpdateInfosAccount = (state: any) =>
  state[USER_KEY_IN_STORE].account.loadingUpdateInfos;
export const updateSuccessInfosAccount = (state: any) =>
  state[USER_KEY_IN_STORE].account.updateSuccessInfos;
export const loadingPasswordAccount = (state: any) =>
  state[USER_KEY_IN_STORE].account.loadingPassword;
export const updateSuccessPasswordAccount = (state: any) =>
  state[USER_KEY_IN_STORE].account.updateSuccessPassword;
export const entityUpdateInfosAccount = (state: any) =>
  state[USER_KEY_IN_STORE].account.entityUpdateInfos;

//? ********************| PROFILE SELECTORS |*******************/
export const loadingProfile = (state: any) =>
  state[USER_KEY_IN_STORE].profile.loading;
export const entityProfile = (state: any) =>
  state[USER_KEY_IN_STORE].profile.entity;
export const loadingReportProfile = (state: any) =>
  state[USER_KEY_IN_STORE].profile.loadingReport;
export const reportSuccessProfile = (state: any) =>
  state[USER_KEY_IN_STORE].profile.reportSuccess;

//? ********************| REGISTER SELECTORS |*******************/
export const loadingRegister = (state: any) =>
  state[USER_KEY_IN_STORE].register.loading;
export const addSuccessRegister = (state: any) =>
  state[USER_KEY_IN_STORE].register.addSuccess;
export const errorMessageRegister = (state: any) =>
  state[USER_KEY_IN_STORE].register.errorMessage;

//? ********************| ACTIVATION ACCOUNT SELECTORS |*******************/
export const loadingActivationAccount = (state: any) =>
  state[USER_KEY_IN_STORE].activationAccount.loading;
export const activationActivationAccount = (state: any) =>
  state[USER_KEY_IN_STORE].activationAccount.activation;

//? ********************| AVATAR SELECTORS |*******************/
export const loadingUpdateAvatar = (state: any) =>
  state[USER_KEY_IN_STORE].account.loadingUpdateAvatar;
export const updateSuccessAvatar = (state: any) =>
  state[USER_KEY_IN_STORE].account.updateSuccessAvatar;
export const entityUpdateAvatar = (state: any) =>
  state[USER_KEY_IN_STORE].account.entityUpdateAvatar;

//? ********************| PASSWORD SELECTORS |*******************/
export const loadingResetInitPassword = (state: any) =>
  state[USER_KEY_IN_STORE].password.loadingResetInit;
export const resetInitSuccessPassword = (state: any) =>
  state[USER_KEY_IN_STORE].password.resetInitSuccess;
export const loadingResetFinishPassword = (state: any) =>
  state[USER_KEY_IN_STORE].password.loadingResetFinish;
export const resetFinishSuccessPassword = (state: any) =>
  state[USER_KEY_IN_STORE].password.resetFinishSuccess;

//? ********************| WEBSOCKET SELECTORS |*******************/
export const listConnectedUsersWebsocket = (state: any) =>
  state[USER_KEY_IN_STORE].websocket.listConnectedUsers;
