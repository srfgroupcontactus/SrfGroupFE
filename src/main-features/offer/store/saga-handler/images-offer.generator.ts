import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import { fetchImagesOfferSuccess, fetchImagesOfferFailure } from "../slice";

const apiUrl = "api/offer-images";

export function* fetchImagesOfferHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public/offer-images-content?page=${data.payload?.page}&size=${data.payload?.size}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchImagesOfferSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchImagesOfferFailure(e));
  }
}
