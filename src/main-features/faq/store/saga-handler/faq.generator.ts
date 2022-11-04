import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import { fetchFaqSuccess, fetchFaqFailure } from "../../../faq/store/slice";

const apiUrl = "api/faq";

export function* fetchFaqHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchFaqSuccess(result?.data?.content));
  } catch (e) {
    console.error(e);
    yield put(fetchFaqFailure(e));
  }
}
