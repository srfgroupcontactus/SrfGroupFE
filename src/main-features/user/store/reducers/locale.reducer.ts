import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  changeLocale: (state: any, action: PayloadAction) => {
    state.locale.currentLocale = action.payload;
  },
};

export default reducer;
