import { put } from "redux-saga/effects";
import {
  fetchDescriptionNewOfferFailure,
  fetchDescriptionNewOfferSuccess,
} from "../slice";
import { invokeWS, MethodHttp } from "../../../../core/config/api-service";

const apiUrl = "api/description-add-offers";

export function* fetchDescriptionNewOfferHandler(): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public/last`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchDescriptionNewOfferSuccess(result?.data));
  } catch (e) {
    yield put(fetchDescriptionNewOfferFailure(e));
  }
}
