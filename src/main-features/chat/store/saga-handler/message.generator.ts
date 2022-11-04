import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import {
  fetchConversationSuccess,
  fetchConversationFailure,
  addConversationSuccess,
  addConversationFailure,
  addMessageSuccess,
  addMessageFailure,
  fetchMessagesSuccess,
  fetchMessagesFailure,
} from "../slice";

const apiUrl = "api/message/";

export function* addMessageHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}create`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.post,
      },
      {
        ...data.payload,
      }
    );
    yield put(addMessageSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(addMessageFailure(e));
  }
}

export function* fetchMessagesHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}by-conversation/${data.payload.conversationId}?page=${data.payload.page}&size=${data.payload.size}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchMessagesSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchMessagesFailure(e));
  }
}
