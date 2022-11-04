import { IUser } from "./user.model";
import { IOfferImages } from "./offer-images.model";
import { ICity } from "./city.model";
import { IAddress } from "./address.model";
import { ICategory } from "./category.model";

export interface IOffer {
  id?: number;
  title?: string | null;
  description?: string | null;
  dateCreated?: string | null;
  user?: IUser | null;
  offerImages?: IOfferImages[] | null;
  amount?: number | null;
  typeOffer?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  periodRent?: string | null;
  cities?: ICity[] | null;
  address?: IAddress;
  category?: ICategory;
  typePeriodRent?: string | null;
  typeContactClient?: string | null;
}

export const defaultValue: Readonly<IOffer> = {};
