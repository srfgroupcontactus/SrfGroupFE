import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import { reportUserSuccess, reportUserFailure } from "../slice";

const apiUrl = "api/report-user/";

export function* reportUserHandler(data: any): Generator<any, any, any> {
  try {
    console.log("reportUserHandler ", data);
    const requestUrl = `${apiUrl}create/${data.payload}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.post,
      loading: true,
    });
    yield put(reportUserSuccess(result?.data));
  } catch (e) {
    yield put(reportUserFailure(e));
  }
}
