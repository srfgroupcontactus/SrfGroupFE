import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  addNewsLetter: (state: any) => {
    state.newsLetter.loading = true;
    state.newsLetter.addSuccess = false;
  },
  addNewsLetterSuccess: (state: any, action: PayloadAction) => {
    state.newsLetter.loading = false;
    state.newsLetter.addSuccess = true;
    state.newsLetter.entity = action.payload;
  },
  addNewsLetterFailure: (state: any, action: PayloadAction) => {
    state.newsLetter.loading = false;
  },
};

export default reducer;
