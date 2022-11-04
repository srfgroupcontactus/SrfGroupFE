import { IOffer } from "./offer.model";
import { IUser } from "./user.model";

export interface ICommentOffer {
  id?: number;
  createdDate?: string | null;
  content?: string | null;
  offer?: IOffer | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<ICommentOffer> = {};
