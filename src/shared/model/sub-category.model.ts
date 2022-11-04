import { ICategory } from "./category.model";

export interface ISubCategory {
  id?: number;
  titleAr?: string | null;
  titleFr?: string | null;
  titleEn?: string | null;
  category?: ICategory | null;
}

export const defaultValue: Readonly<ISubCategory> = {};
