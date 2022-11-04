import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchConversation: (state: any) => {
    state.conversation.loadingEntities = true;
  },
  fetchConversationSuccess: (state: any, action: any) => {
    state.conversation.loadingEntities = false;
    state.conversation.entities = action.payload.content;
    state.conversation.totalItems = action.payload?.totalElements;
    state.conversation.totalPages = action.payload?.totalPages;
  },
  fetchConversationFailure: (state: any, action: PayloadAction) => {
    state.conversation.loadingEntities = false;
  },

  addConversation: (state: any) => {
    state.conversation.loading = true;
    state.conversation.addSuccess = false;
  },
  addConversationSuccess: (state: any, action: any) => {
    state.conversation.loading = false;
    state.conversation.entity = action.payload;
    state.conversation.addSuccess = false;
  },
  addConversationFailure: (state: any, action: PayloadAction) => {
    state.conversation.loading = false;
  },

  deleteConversation: (state: any) => {
    state.conversation.loading = true;
    state.conversation.deleteSuccess = false;
  },
  deleteConversationSuccess: (state: any, action: any) => {
    state.conversation.loading = false;
    state.conversation.deleteSuccess = false;
  },
  deleteConversationFailure: (state: any, action: PayloadAction) => {
    state.conversation.loading = false;
  },

  resetConversation: (state: any) => {
    return {
      ...state,
      ...initialState.conversation,
    };
  },
};

export default reducer;
