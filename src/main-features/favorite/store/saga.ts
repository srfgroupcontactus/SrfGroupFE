import { all, takeEvery } from "redux-saga/effects";
import {
  fetchFavoriteUsers,
  addFavoriteUsers,
  deleteFavoriteUsers,
} from "./slice";
import {
  addFavoriteUsersHandler,
  deleteFavoriteUsersHandler,
  fetchFavoriteUsersHandler,
} from "./saga-handler/favorite-user.generator";

export function* favoriteSaga() {
  yield all([
    takeEvery(fetchFavoriteUsers, fetchFavoriteUsersHandler),
    takeEvery(addFavoriteUsers, addFavoriteUsersHandler),
    takeEvery(deleteFavoriteUsers, deleteFavoriteUsersHandler),
  ]);
}

export default favoriteSaga;
