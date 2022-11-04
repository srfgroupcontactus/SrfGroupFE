export interface IContactUs {
  id?: number;
  name?: string | null;
  email?: string | null;
  subject?: string | null;
  message?: string | null;
}

export const defaultValue: Readonly<IContactUs> = {};
