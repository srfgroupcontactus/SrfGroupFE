import { IOffer } from "./offer.model";

export interface IFindOffer extends IOffer {
  id?: number;
  amount?: number | null;
  typeFindOffer?: string | null;
}

export const defaultValue: Readonly<IFindOffer> = {};
