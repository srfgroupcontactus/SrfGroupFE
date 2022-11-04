import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import myNotificationsReducer from "./reducers/notification.reducer";

export const NOTIFICATION_KEY_IN_STORE = "notification";

export const notificationSlice: Slice = createSlice({
  name: NOTIFICATION_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...myNotificationsReducer,
  },
});

export const {
  //? ********************| MY NOTIFICATIONS ACTIONS |*******************/
  fetchMyNotifications,
  fetchMyNotificationsSuccess,
  fetchMyNotificationsFailure,

  //? ********************| ADD READ NOTIFICATIONS ACTIONS |*******************/
  addReadNotifications,
  addReadNotificationsSuccess,
  addReadNotificationsFailure,

  setActivePageNotifications,
  resetMyNotifications,
} = notificationSlice.actions;

//? ********************| COMMENTS OFFER SELECTORS |*******************/
export const loadingMyNotifications = (state: any) =>
  state[NOTIFICATION_KEY_IN_STORE].mynotifications.loading;
export const entityMynotifications = (state: any) =>
  state[NOTIFICATION_KEY_IN_STORE].mynotifications.entity;
export const loadingEntitiesMyNotifications = (state: any) =>
  state[NOTIFICATION_KEY_IN_STORE].mynotifications.loadingEntities;
export const entitiesMyNotifications = (state: any) =>
  state[NOTIFICATION_KEY_IN_STORE].mynotifications.entities;
export const totalItemsMyNotifications = (state: any) =>
  state[NOTIFICATION_KEY_IN_STORE].mynotifications.totalItems;
export const activePageMyNotifications = (state: any) =>
    state[NOTIFICATION_KEY_IN_STORE].mynotifications.activePage;
export const totalPagesMyNotifications = (state: any) =>
  state[NOTIFICATION_KEY_IN_STORE].mynotifications.totalPages;
export const deleteSuccessMyNotifications = (state: any) =>
  state[NOTIFICATION_KEY_IN_STORE].mynotifications.deleteSuccess;
export const addIsReadSuccessMyNotifications = (state: any) =>
  state[NOTIFICATION_KEY_IN_STORE].mynotifications.addIsReadSuccess;
