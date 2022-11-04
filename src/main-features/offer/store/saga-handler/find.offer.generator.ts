import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import {
  fetchFindOfferSuccess,
  fetchFindOfferFailure,
  addFindOfferSuccess,
  addFindOfferFailure,
  updateFindOfferSuccess,
  updateFindOfferFailure,
} from "../slice";

const apiUrl = "api/find-offer";

/**
 *
 * @param data
 */
export function* fetchFindOfferHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchFindOfferSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchFindOfferFailure(e));
  }
}

/**
 *
 * @param data
 */
export function* addFindOfferHandler(data: any): Generator<any, any, any> {
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
    yield put(addFindOfferSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(addFindOfferFailure(e));
  }
}

/**
 *
 * @param data
 */
export function* updateFindOfferHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/create`;
    const result = yield invokeWS(
      {
        url: `${apiUrl}/${data.payload.id}`,
        method: MethodHttp.post,
      },
      {
        ...data.payload,
      }
    );
    yield put(updateFindOfferSuccess(result?.data?.content));
  } catch (e) {
    console.error(e);
    yield put(updateFindOfferFailure(e));
  }
}
