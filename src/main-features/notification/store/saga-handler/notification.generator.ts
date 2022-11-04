import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import {
  fetchMyNotificationsSuccess,
  fetchMyNotificationsFailure,
  addReadNotificationsSuccess,
  addReadNotificationsFailure,
} from "../slice";

const apiUrl = "api/notification";

export function* fetchMyNotificationsHandler(
  data: any
): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/current-user?page=${data.payload?.page}&size=${data.payload?.size}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchMyNotificationsSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchMyNotificationsFailure(e));
  }
}

export function* addReadNotificationsHandler(
  data: any
): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/set-is-read`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.post,
      },
      data.payload
    );
    yield put(addReadNotificationsSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(addReadNotificationsFailure(e));
  }
}
