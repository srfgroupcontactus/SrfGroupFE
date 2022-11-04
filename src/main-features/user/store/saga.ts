import { all, put, takeEvery } from "redux-saga/effects";
import {
  loginUser,
  loginWithFacebook,
  loginWithGoogle,
  loginWithGoogleOneTap,
  sessionUser,
  getNumberOfNotificationsNotSee,
  updateAvatarAccount,
  registerUser,
  activationAccount,
  getNumberOfMessagesNotSee,
  fetchProfileUser,
  reportUser,
  resetPasswordInit,
  logout,
  updateInfosAccount,
  fetchListConnectedUsersWS,
  resetPasswordFinish,
  updatePasswordAccount,
  getNumberOfCarts,
} from "./slice";
import {
  activationAccountHandler,
  fetchProfileUserHandler,
  getNumberOfCartsHandler,
  getNumberOfMessagesNotSeeHandler,
  getNumberOfNotificationsNotSeeHandler,
  loginCustomerHandler,
  loginWithFacebookHandler,
  loginWithGoogleHandler,
  loginWithGoogleOneTapHandler,
  logoutHandler,
  registerHandler,
  resetPasswordFinishHandler,
  resetPasswordInitHandler,
  sessionUserHandler,
  updateAvatarAccountHandler,
  updateInfosAccountHandler,
  updatePasswordAccountHandler,
} from "./saga-handler/user.generator";
import { fetchListConnectedUsersWSHandler } from "./saga-handler/websocket.generator";
import { reportUserHandler } from "./saga-handler/report-user.generator";

export function* userSaga() {
  yield all([
    takeEvery(loginUser, loginCustomerHandler),
    takeEvery(loginWithFacebook, loginWithFacebookHandler),
    takeEvery(loginWithGoogle, loginWithGoogleHandler),
    takeEvery(loginWithGoogleOneTap, loginWithGoogleOneTapHandler),
    takeEvery(sessionUser, sessionUserHandler),
    takeEvery(updateAvatarAccount, updateAvatarAccountHandler),
    takeEvery(
      getNumberOfNotificationsNotSee,
      getNumberOfNotificationsNotSeeHandler
    ),
    takeEvery(getNumberOfMessagesNotSee, getNumberOfMessagesNotSeeHandler),
    takeEvery(getNumberOfCarts, getNumberOfCartsHandler),
    takeEvery(registerUser, registerHandler),
    takeEvery(activationAccount, activationAccountHandler),
    takeEvery(fetchProfileUser, fetchProfileUserHandler),
    takeEvery(reportUser, reportUserHandler),
    takeEvery(resetPasswordInit, resetPasswordInitHandler),
    takeEvery(resetPasswordFinish, resetPasswordFinishHandler),
    takeEvery(updateInfosAccount, updateInfosAccountHandler),
    takeEvery(updatePasswordAccount, updatePasswordAccountHandler),
    takeEvery(fetchListConnectedUsersWS, fetchListConnectedUsersWSHandler),
    takeEvery(logout, logoutHandler),
  ]);
}

export default userSaga;
