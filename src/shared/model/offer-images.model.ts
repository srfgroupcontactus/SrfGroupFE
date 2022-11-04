import { IOffer } from "./offer.model";
import { IUser } from "./user.model";

export interface IOfferImages {
  id?: number;
  path?: string | "";
  dateCreated?: string | null;
  offer?: IOffer | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IOfferImages> = {};
