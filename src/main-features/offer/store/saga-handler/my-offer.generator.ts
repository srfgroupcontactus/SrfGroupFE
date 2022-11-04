import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import {
  fetchMyOffersSuccess,
  fetchMyOffersFailure,
  deleteMyOfferSuccess,
  deleteMyOfferFailure,
  fetchOfferSuccess,
  fetchOfferFailure,
} from "../../../offer/store/slice";

const apiUrl = "api/offer";

export function* fetchMyOffersHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/current-user?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchMyOffersSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchMyOffersFailure(e));
  }
}

export function* deleteMyOfferHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/${data.payload.id}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.delete,
    });
    yield put(deleteMyOfferSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(deleteMyOfferFailure(e));
  }
}

export function* fetchOfferHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/${data.payload.id}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchOfferSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchOfferFailure(e));
  }
}
