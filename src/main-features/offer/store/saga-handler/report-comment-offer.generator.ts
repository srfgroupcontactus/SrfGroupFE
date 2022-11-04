import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import { reportCommentOfferFailure, reportCommentOfferSuccess } from "../slice";

const apiUrl = "api/reportcommentoffer";

export function* reportCommentOfferHandler(
  data: any
): Generator<any, any, any> {
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
    yield put(reportCommentOfferSuccess(result?.data?.content));
  } catch (e) {
    yield put(reportCommentOfferFailure(e));
  }
}
