import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import problemeDeclarationReducer from "./reducers/probleme-delcaration.reducer";

export const PROBLEME_DECLARATION_KEY_IN_STORE = "problemeDeclaration";

export const problemeDeclarationSlice: Slice = createSlice({
  name: PROBLEME_DECLARATION_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...problemeDeclarationReducer,
  },
});

export const {
  //? ********************| FAVORITE USERS ACTIONS |*******************/
  addProblemeDecalration,
  addProblemeDecalrationSuccess,
  addProblemeDecalrationFailure,
} = problemeDeclarationSlice.actions;

//? ********************| COMMENTS OFFER SELECTORS |*******************/
export const loadingProblemeDeclaration = (state: any) =>
  state[PROBLEME_DECLARATION_KEY_IN_STORE].problemeDeclaration.loading;
export const entityProblemeDeclaration = (state: any) =>
  state[PROBLEME_DECLARATION_KEY_IN_STORE].problemeDeclaration.entity;
export const addSuccessProblemeDeclaration = (state: any) =>
  state[PROBLEME_DECLARATION_KEY_IN_STORE].problemeDeclaration.addSuccess;
