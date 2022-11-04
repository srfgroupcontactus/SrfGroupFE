import { invokeWS } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import {
  fetchListConnectedUsersWSFailure,
  fetchListConnectedUsersWSSuccess,
} from "../slice";

const apiUrl = "api/websocket/";

export function* fetchListConnectedUsersWSHandler(): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}connected-users`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: "GET",
    });
    yield put(fetchListConnectedUsersWSSuccess(result?.data));
  } catch (e) {
    yield put(fetchListConnectedUsersWSFailure(e));
  }
}
