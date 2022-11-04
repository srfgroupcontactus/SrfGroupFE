import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchFavoriteUsers: (state: any) => {
    state.favoriteUser.loadingEntities = true;
  },
  fetchFavoriteUsersSuccess: (state: any, action: any) => {
    state.favoriteUser.loadingEntities = false;
    state.favoriteUser.entities = action.payload?.content;
    state.favoriteUser.totalItems = action.payload?.totalElements;
    state.favoriteUser.totalPages = action.payload?.totalPages;
  },
  fetchFavoriteUsersFailure: (state: any, action: PayloadAction) => {
    state.favoriteUser.loadingEntities = false;
  },

  addFavoriteUsers: (state: any) => {
    state.favoriteUser.loading = true;
    state.favoriteUser.addSuccess = false;
  },
  addFavoriteUsersSuccess: (state: any, action: any) => {
    state.favoriteUser.loading = false;
    state.favoriteUser.entity = action.payload;
    state.favoriteUser.addSuccess = true;
  },
  addFavoriteUsersFailure: (state: any, action: PayloadAction) => {
    state.favoriteUser.loading = false;
  },

  deleteFavoriteUsers: (state: any) => {
    state.favoriteUser.loading = true;
    state.favoriteUser.deleteSuccess = false;
  },
  deleteFavoriteUsersSuccess: (state: any, action: any) => {
    state.favoriteUser.loading = false;
    state.favoriteUser.deleteSuccess = true;
  },
  deleteFavoriteUsersFailure: (state: any, action: PayloadAction) => {
    state.favoriteUser.loading = false;
  },

  setActivePageFavoriteUsers: (state: any, action: PayloadAction) => {
    state.favoriteUser.activePage = action.payload;
  },

  resetFavoriteUsers: (state: any) => {
    return {
      ...state,
      ...initialState.favoriteUser,
    };
  },
};

export default reducer;
