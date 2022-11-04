import { put } from "redux-saga/effects";
import { invokeWS, MethodHttp } from "../../../../../core/config/api-service";
import { addNewsLetterFailure, addNewsLetterSuccess } from "../slice";

const apiUrl = "api/news-letter";

export function* addNewsLetterHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public/create`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.post,
      },
      { ...data.payload }
    );
    yield put(addNewsLetterSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(addNewsLetterFailure(e));
  }
}
