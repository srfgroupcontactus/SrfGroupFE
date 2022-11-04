import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import {
  fetchAboutUsSuccess,
  fetchAboutUsFailure,
} from "../../../aboutus/store/slice";

const apiUrl = "api/aboutus";

export function* fetchAboutUsHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public/last`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchAboutUsSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchAboutUsFailure(e));
  }
}
