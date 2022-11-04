import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  sessionUser: (state: any) => {
    state.session.loading = true;
    state.session.isAuthenticated = false;
  },
  sessionUserSuccess: (state: any, action: PayloadAction) => {
    state.session.loading = false;
    state.session.isAuthenticated = true;
    state.session.currentUser = action.payload;
  },
  sessionUserFailure: (state: any, action: PayloadAction) => {
    state.session.loading = false;
    state.session.isAuthenticated = false;
  },

  // Number of notifications
  getNumberOfNotificationsNotSee: (state: any) => {
    state.session.nbeNotificationsNotRead = 0;
  },
  getNumberOfNotificationsNotSeeSuccess: (
    state: any,
    action: PayloadAction
  ) => {
    state.session.nbeNotificationsNotRead = action.payload;
  },
  getNumberOfNotificationsNotSeeFailure: (
    state: any,
    action: PayloadAction
  ) => {
    state.session.nbeNotificationsNotRead = 0;
  },
  resetNumberOfNotificationsNotSee: (state: any) => {
    state.session.nbeNotificationsNotRead = 0;
  },

  // Number of messages
  getNumberOfMessagesNotSee: (state: any) => {
    state.session.nbeMessagesNotRead = 0;
  },
  getNumberOfMessagesNotSeeSuccess: (state: any, action: PayloadAction) => {
    state.session.nbeMessagesNotRead = action.payload;
  },
  getNumberOfMessagesNotSeeFailure: (state: any, action: PayloadAction) => {
    state.session.nbeMessagesNotRead = 0;
  },

  setUserIdOS: (state: any, action: PayloadAction) => {
    state.session.oneSignalId = action.payload;
  },

  // Number of messages
  getNumberOfCarts: (state: any) => {
    state.session.nbeCarts = 0;
  },
  getNumberOfCartsSuccess: (state: any, action: PayloadAction) => {
    state.session.nbeCarts = action.payload;
  },
  getNumberOfCartsFailure: (state: any, action: PayloadAction) => {
    state.session.nbeCarts = 0;
  },

  // Logout
  logout: (state: any) => {
    state.login = initialState.login;
    state.session = {
      ...initialState.session,
      isAuthenticated: false,
      currentUser: {},
      oneSignalId: state.session.oneSignalId,
    };
  },
};

export default reducer;
