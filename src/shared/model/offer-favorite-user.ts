import { IOffer } from "./offer.model";
import { ISellOffer } from "./sell-offer.model";
import { IRentOffer } from "./rent-offer.model";

export interface IOfferFavoriteUser {
  offer?: IOffer | ISellOffer | IRentOffer;
  myFavoriteUser?: boolean;
}

export const defaultValueOFU: Readonly<IOfferFavoriteUser> = {};
