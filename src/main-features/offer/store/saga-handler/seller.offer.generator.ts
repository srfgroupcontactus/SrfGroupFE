import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import {
  fetchSellerOfferSuccess,
  fetchSellerOfferFailure,
  addSellerOfferSuccess,
  addSellerOfferFailure,
  updateSellerOfferSuccess,
  updateSellerOfferFailure,
} from "../slice";

const apiUrl = "api/sell-offer";

export function* fetchSellerOfferHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchSellerOfferSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchSellerOfferFailure(e));
  }
}

export function* addSellerOfferHandler(data: any): Generator<any, any, any> {
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
    yield put(addSellerOfferSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(addSellerOfferFailure(e));
  }
}

export function* updateSellerOfferHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/${data.payload.id}`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.put,
      },
      {
        ...data.payload,
      }
    );
    yield put(updateSellerOfferSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(updateSellerOfferFailure(e));
  }
}
