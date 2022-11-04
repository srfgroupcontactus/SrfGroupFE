import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import favoriteUserReducer from "./reducers/favorite-user.reducer";

export const FAVORITE_KEY_IN_STORE = "favorite";

export const favoriteSlice: Slice = createSlice({
  name: FAVORITE_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...favoriteUserReducer,
  },
});

export const {
  //? ********************| FETCH FAVORITE USERS ACTIONS |*******************/
  fetchFavoriteUsers,
  fetchFavoriteUsersSuccess,
  fetchFavoriteUsersFailure,

  //? ********************| ADD FAVORITE USERS ACTIONS |*******************/
  addFavoriteUsers,
  addFavoriteUsersSuccess,
  addFavoriteUsersFailure,

  //? ********************| DELETE FAVORITE USERS ACTIONS |*******************/
  deleteFavoriteUsers,
  deleteFavoriteUsersSuccess,
  deleteFavoriteUsersFailure,

  setActivePageFavoriteUsers,
  resetFavoriteUsers,
} = favoriteSlice.actions;

//? ********************| FAVORITE USER SELECTORS |*******************/
export const loadingFavoriteUser = (state: any) =>
  state[FAVORITE_KEY_IN_STORE].favoriteUser.loading;
export const entityFavoriteUser = (state: any) =>
  state[FAVORITE_KEY_IN_STORE].favoriteUser.entity;
export const loadingEntitiesFavoriteUser = (state: any) =>
  state[FAVORITE_KEY_IN_STORE].favoriteUser.loadingEntities;
export const entitiesFavoriteUser = (state: any) =>
  state[FAVORITE_KEY_IN_STORE].favoriteUser.entities;
export const totalItemsFavoriteUser = (state: any) =>
  state[FAVORITE_KEY_IN_STORE].favoriteUser.totalItems;
export const totalPagesFavoriteUser = (state: any) =>
  state[FAVORITE_KEY_IN_STORE].favoriteUser.totalPages;
export const activePageFavoriteUser = (state: any) =>
    state[FAVORITE_KEY_IN_STORE].favoriteUser.activePage;
export const addSuccessFavoriteUser = (state: any) =>
  state[FAVORITE_KEY_IN_STORE].favoriteUser.addSuccess;
export const deleteSuccessFavoriteUser = (state: any) =>
  state[FAVORITE_KEY_IN_STORE].favoriteUser.deleteSuccess;
