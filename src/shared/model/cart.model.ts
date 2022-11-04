import { ISellOffer } from "./sell-offer.model";
import { IUser } from "./user.model";

export interface ICart {
  id?: number;
  quantity?: number | null;
  total?: number | null;
  status?: string | null;
  sellOffer?: ISellOffer | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<ICart> = {};
