import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  addProblemeDecalration: (state: any) => {
    state.problemeDeclaration.loading = true;
    state.problemeDeclaration.addSuccess = false;
  },
  addProblemeDecalrationSuccess: (state: any, action: any) => {
    state.problemeDeclaration.loading = false;
    state.problemeDeclaration.addSuccess = true;
  },
  addProblemeDecalrationFailure: (state: any, action: PayloadAction) => {
    state.problemeDeclaration.loading = false;
  },
};

export default reducer;
