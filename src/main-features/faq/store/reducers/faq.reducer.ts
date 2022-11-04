import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  fetchFaq: (state: any) => {
    state.faq.loadingEntities = true;
  },
  fetchFaqSuccess: (state: any, action: PayloadAction) => {
    state.faq.loadingEntities = false;
    state.faq.entities = action.payload;
  },
  fetchFaqFailure: (state: any, action: PayloadAction) => {
    state.faq.loadingEntities = false;
  },
};

export default reducer;
