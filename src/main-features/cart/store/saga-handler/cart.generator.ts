import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import {
  fetchCartSuccess,
  fetchCartFailure,
  addCartSuccess,
  addCartFailure,
  updateByQuantityCartSuccess,
  updateByQuantityCartFailure,
  detailsCartSuccess,
  detailsCartFailure,
  deleteCartSuccess,
  deleteCartFailure,
} from "../slice";

const apiUrl = "api/cart";

export function* fetchCartHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/current-user?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchCartSuccess(result?.data));
  } catch (e) {
    yield put(fetchCartFailure(e));
  }
}

export function* addCartHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/create`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.post,
      },
      {
        ...data.payload,
      }
    );
    yield put(addCartSuccess(result?.data));
  } catch (e) {
    yield put(addCartFailure(e));
  }
}

export function* updateByQuantityCartHandler(
  data: any
): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/update-quantity`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.put,
        loading: true,
      },
      {
        ...data.payload,
      }
    );
    yield put(updateByQuantityCartSuccess(result?.data));
  } catch (e) {
    yield put(updateByQuantityCartFailure(e));
  }
}

export function* detailsCartHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/details-cart`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(detailsCartSuccess(result?.data));
  } catch (e) {
    yield put(detailsCartFailure(e));
  }
}

export function* deleteCartHandler(data: any): Generator<any, any, any> {
  try {
    const result = yield invokeWS({
      url: `${apiUrl}/${data.payload.id}`,
      method: MethodHttp.delete,
    });
    yield put(deleteCartSuccess(result?.data));
  } catch (e) {
    yield put(deleteCartFailure(e));
  }
}
