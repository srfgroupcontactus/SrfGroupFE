import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import {
  fetchRentOfferSuccess,
  fetchRentOfferFailure,
  addRentOfferSuccess,
  addRentOfferFailure,
  updateRentOfferSuccess,
  updateRentOfferFailure,
} from "../slice";

const apiUrl = "api/rent-offer";

export function* fetchRentOfferHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchRentOfferSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchRentOfferFailure(e));
  }
}

export function* addRentOfferHandler(data: any): Generator<any, any, any> {
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
    yield put(addRentOfferSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(addRentOfferFailure(e));
  }
}

export function* updateRentOfferHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/create`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(updateRentOfferSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(updateRentOfferFailure(e));
  }
}
