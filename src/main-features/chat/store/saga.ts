import { all, takeEvery } from "redux-saga/effects";
import {
  addConversationHandler,
  deleteConversationHandler,
  fetchConversationHandler,
} from "./saga-handler/conversation.generator";
import {
  fetchConversation,
  addConversation,
  deleteConversation,
  addMessage,
  fetchMessages,
} from "./slice";
import {
  addMessageHandler,
  fetchMessagesHandler,
} from "./saga-handler/message.generator";

export function* chatSaga() {
  yield all([
    takeEvery(fetchConversation, fetchConversationHandler),
    takeEvery(addConversation, addConversationHandler),
    takeEvery(deleteConversation, deleteConversationHandler),
    takeEvery(addMessage, addMessageHandler),
    takeEvery(fetchMessages, fetchMessagesHandler),
  ]);
}

export default chatSaga;
