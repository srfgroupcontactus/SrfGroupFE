import { IUser } from "./user.model";

export interface IFavoriteUser {
  id?: number;
  favoriteDate?: string | null;
  currentUser?: IUser | null;
  favoriteUser?: IUser | null;
}

export const defaultValue: Readonly<IFavoriteUser> = {};
