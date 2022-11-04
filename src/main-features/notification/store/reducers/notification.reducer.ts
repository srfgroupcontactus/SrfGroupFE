import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchMyNotifications: (state: any) => {
    state.mynotifications.loadingEntities = true;
  },
  fetchMyNotificationsSuccess: (state: any, action: any) => {
    state.mynotifications.loadingEntities = false;
    state.mynotifications.entities = [
      ...state.mynotifications.entities,
      ...action.payload.content,
    ];
    state.mynotifications.totalItems = action.payload?.totalElements;
    state.mynotifications.totalPages = action.payload?.totalPages;
  },
  fetchMyNotificationsFailure: (state: any, action: PayloadAction) => {
    state.mynotifications.loadingEntities = false;
  },

  addReadNotifications: (state: any) => {
    state.mynotifications.loading = true;
    state.mynotifications.addIsReadSuccess = false;
  },
  addReadNotificationsSuccess: (state: any, action: any) => {
    state.mynotifications.loading = false;
    state.mynotifications.addIsReadSuccess = true;
  },
  addReadNotificationsFailure: (state: any, action: PayloadAction) => {
    state.mynotifications.loading = false;
  },

  setActivePageNotifications: (state: any, action: PayloadAction) => {
    state.mynotifications.activePage = action.payload;
  },
  resetMyNotifications: (state: any) => {
    state.mynotifications = initialState.mynotifications;
  },
};

export default reducer;
