import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  addMessage: (state: any) => {
    state.message.loading = true;
    state.message.addSuccess = false;
  },
  addMessageSuccess: (state: any, action: PayloadAction) => {
    state.message.loading = false;
    state.message.entity = action.payload;
    state.message.addSuccess = true;
  },
  addMessageFailure: (state: any, action: PayloadAction) => {
    state.message.loading = false;
  },

  fetchMessages: (state: any) => {
    state.message.loadingEntities = true;
  },
  fetchMessagesSuccess: (state: any, action: any) => {
    state.message.loadingEntities = false;
    state.message.entities = action.payload.content;
    state.message.totalItems = action.payload?.totalElements;
    state.message.totalPages = action.payload?.totalPages;
  },
  fetchMessagesFailure: (state: any, action: PayloadAction) => {
    state.message.loadingEntities = false;
  },

  resetMessage: (state: any) => {
    state.message = initialState.message;
  },
};

export default reducer;
