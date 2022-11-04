import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import {
  addContactUsSuccess,
  addContactUsFailure,
} from "../../../contact-us/store/slice";

const apiUrl = "api/contactus";

export function* addContactUsHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.post,
      },
      data.payload
    );
    yield put(addContactUsSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(addContactUsFailure(e));
  }
}
