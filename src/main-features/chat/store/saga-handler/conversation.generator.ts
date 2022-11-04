import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import {
  fetchConversationSuccess,
  fetchConversationFailure,
  addConversationSuccess,
  addConversationFailure,
  deleteConversationSuccess,
  deleteConversationFailure,
} from "../slice";

const apiUrl = "api/conversation";

export function* fetchConversationHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/current-user?page=${data.payload?.page}&size=${data.payload?.size}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchConversationSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchConversationFailure(e));
  }
}

export function* addConversationHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/create/message`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.post,
      },
      {
        ...data.payload,
      }
    );
    yield put(addConversationSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(addConversationFailure(e));
  }
}

export function* deleteConversationHandler(
  data: any
): Generator<any, any, any> {
  try {
    const result = yield invokeWS({
      url: `${apiUrl}/delete/${data.payload.id}`,
      method: MethodHttp.delete,
    });
    yield put(deleteConversationSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(deleteConversationFailure(e));
  }
}
