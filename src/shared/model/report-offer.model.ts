import { IOffer } from "./offer.model";
import { IUser } from "./user.model";

export interface IReportOffer {
  id?: number;
  offer?: IOffer;
  user?: IUser;
}

export const defaultValue: Readonly<IReportOffer> = {};
