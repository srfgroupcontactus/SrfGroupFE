import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import conversationReducer from "./reducers/conversation.reducer";
import messageReducer from "./reducers/message.reducer";

export const CHAT_KEY_IN_STORE = "chat";

export const chatSlice: Slice = createSlice({
  name: CHAT_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...conversationReducer,
    ...messageReducer,
  },
});

export const {
  //? ********************| FETCH CONVERSATION ACTIONS |*******************/
  fetchConversation,
  fetchConversationSuccess,
  fetchConversationFailure,

  //? ********************| ADD CONVERSATION ACTIONS |*******************/
  addConversation,
  addConversationSuccess,
  addConversationFailure,

  //? ********************| DELETE CONVERSATION ACTIONS |*******************/
  deleteConversation,
  deleteConversationSuccess,
  deleteConversationFailure,

  resetConversation,

  //? ********************| ADD MESSAGE ACTIONS |*******************/
  addMessage,
  addMessageSuccess,
  addMessageFailure,

  //? ********************| FETCH MESSAGES ACTIONS |*******************/
  fetchMessages,
  fetchMessagesSuccess,
  fetchMessagesFailure,

  resetMessage,
} = chatSlice.actions;

//? ********************| CONVERSATION SELECTORS |*******************/
export const loadingConversation = (state: any) =>
  state[CHAT_KEY_IN_STORE].conversation.loading;
export const entityConversation = (state: any) =>
  state[CHAT_KEY_IN_STORE].conversation.entity;
export const loadingEntitiesConversation = (state: any) =>
  state[CHAT_KEY_IN_STORE].conversation.loadingEntities;
export const entitiesConversation = (state: any) =>
  state[CHAT_KEY_IN_STORE].conversation.entities;
export const totalItemsConversation = (state: any) =>
  state[CHAT_KEY_IN_STORE].conversation.totalItems;
export const totalPagesConversation = (state: any) =>
  state[CHAT_KEY_IN_STORE].conversation.totalPages;
export const deleteSuccessConversation = (state: any) =>
  state[CHAT_KEY_IN_STORE].conversation.deleteSuccess;

//? ********************| MESSAGES SELECTORS |*******************/
export const loadingMessage = (state: any) =>
  state[CHAT_KEY_IN_STORE].message.loading;
export const entityMessage = (state: any) =>
  state[CHAT_KEY_IN_STORE].message.entity;
export const addSuccessMessage = (state: any) =>
  state[CHAT_KEY_IN_STORE].message.addSuccess;
export const loadingEntitiesMessage = (state: any) =>
  state[CHAT_KEY_IN_STORE].message.loadingEntities;
export const entitiesMessage = (state: any) =>
  state[CHAT_KEY_IN_STORE].message.entities;
export const totalItemsMessage = (state: any) =>
  state[CHAT_KEY_IN_STORE].message.totalItems;
export const totalPagesMessage = (state: any) =>
  state[CHAT_KEY_IN_STORE].message.totalPages;
export const deleteSuccessMessage = (state: any) =>
  state[CHAT_KEY_IN_STORE].message.deleteSuccess;
