import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import {
  fetchFavoriteUsersSuccess,
  fetchFavoriteUsersFailure,
  addFavoriteUsersSuccess,
  addFavoriteUsersFailure,
  deleteFavoriteUsersSuccess,
  deleteFavoriteUsersFailure,
} from "../slice";

const apiUrl = "api/favoriteuser";

export function* fetchFavoriteUsersHandler(
  data: any
): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/current-user?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchFavoriteUsersSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchFavoriteUsersFailure(e));
  }
}

export function* addFavoriteUsersHandler(data: any): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}/create`,
        method: MethodHttp.post,
        loading: true,
      },
      {
        ...data.payload,
      }
    );
    yield put(addFavoriteUsersSuccess(result?.data?.content));
  } catch (e) {
    console.error(e);
    yield put(addFavoriteUsersFailure(e));
  }
}

export function* deleteFavoriteUsersHandler(
  data: any
): Generator<any, any, any> {
  try {
    const result = yield invokeWS({
      url: `${apiUrl}/${data.payload.id}`,
      method: MethodHttp.delete,
    });
    yield put(deleteFavoriteUsersSuccess(result?.data?.content));
  } catch (e) {
    console.error(e);
    yield put(deleteFavoriteUsersFailure(e));
  }
}
