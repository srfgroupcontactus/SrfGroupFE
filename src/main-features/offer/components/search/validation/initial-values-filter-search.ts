import * as Yup from "yup";
import { IAddress } from "../../../../../shared/model/address.model";

export const initialValuesFilterSearch = {
  address: {} as IAddress,
  fullName: '',
  typeContactClient: '',
};

export const validationSchemFilterSearch = Yup.object({
  address: Yup.object().nullable().notRequired().default({}),
  fullName: Yup.string().nullable().notRequired(),
  typeContactClient: Yup.string().nullable().notRequired(),
});
