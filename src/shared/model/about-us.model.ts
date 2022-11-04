export interface IAboutUs {
  id?: number;
  contentAr?: string | null;
  contentEn?: string | null;
  contentFr?: string | null;
}

export const defaultValue: Readonly<IAboutUs> = {};
