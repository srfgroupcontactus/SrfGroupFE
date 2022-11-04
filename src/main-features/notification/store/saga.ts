import { all, takeEvery } from "redux-saga/effects";
import { fetchMyNotifications, addReadNotifications } from "./slice";
import {
  addReadNotificationsHandler,
  fetchMyNotificationsHandler,
} from "./saga-handler/notification.generator";

export function* notificationSaga() {
  yield all([
    takeEvery(fetchMyNotifications, fetchMyNotificationsHandler),
    takeEvery(addReadNotifications, addReadNotificationsHandler),
  ]);
}

export default notificationSaga;
