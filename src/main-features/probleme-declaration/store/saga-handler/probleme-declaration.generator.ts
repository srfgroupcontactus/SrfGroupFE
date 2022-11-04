import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import {
  addProblemeDecalrationSuccess,
  addProblemeDecalrationFailure,
} from "../slice";

const apiUrl = "api/report-probleme";

export function* addProblemeDecalrationHandler(
  data: any
): Generator<any, any, any> {
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
    yield put(addProblemeDecalrationSuccess(result?.data?.content));
  } catch (e) {
    console.error(e);
    yield put(addProblemeDecalrationFailure(e));
  }
}
