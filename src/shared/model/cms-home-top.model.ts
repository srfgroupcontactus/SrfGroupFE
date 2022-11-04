export interface ICmsHomeTop {
  id?: number;
  title?: string | null;
  description?: string | null;
  image?: string | null;
}

export const defaultValue: Readonly<ICmsHomeTop> = {};
