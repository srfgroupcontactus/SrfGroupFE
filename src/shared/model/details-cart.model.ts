export interface IDetailsCart {
  numberCarts?: number;
  totalCarts?: number | null;
  taxDelivery?: number | null;
  totalGlobalCarts?: number | null;
}

export const defaultValue: Readonly<IDetailsCart> = {};
