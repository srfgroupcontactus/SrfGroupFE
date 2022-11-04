import * as Yup from "yup";

export const initialValuesSearchAppBar = {
  title: "",
  typeOffer: "",
  // address: null,
  category: null,
};

export const validationSchemSearchAppBar = Yup.object({
  title: Yup.string().nullable().notRequired().default(""),
  typeOffer: Yup.string().nullable().notRequired(),
  // address: Yup.object().nullable().notRequired().default(null),
  category: Yup.object().nullable().notRequired().default(null),
});
