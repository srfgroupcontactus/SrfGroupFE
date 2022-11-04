import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import { reportOffersFailure, reportOffersSuccess } from "../slice";

const apiUrl = "api/reportoffer";

export function* reportOffersHandler(data: any): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}/create`,
        method: MethodHttp.post,
      },
      {
        ...data.payload,
      }
    );
    yield put(reportOffersSuccess(result?.data));
  } catch (e) {
    yield put(reportOffersFailure(e));
  }
}
