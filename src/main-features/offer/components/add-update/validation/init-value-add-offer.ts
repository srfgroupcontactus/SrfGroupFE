import * as Yup from "yup";

export const initialValuesAddOffer = {
  typeOffer: "",
  title: "",
  description: "",
  amount: "",
  startDate: "",
  endDate: "",
  typePeriodRent: "",
  address: null,
  category: null,
  typeFindOffer: "",
  typeContactClient: "",
};

export const validationSchemaAddOffer = Yup.object({
  typeOffer: Yup.string().required("add_offer.type_offer_require"),
  title: Yup.string()
    .required("add_offer.title_required")
    .min(5, "add_offer.title_min_length")
    .max(200, "add_offer.title_max_length"),
  description: Yup.string().required("add_offer.description_required"),
  amount: Yup.number().nullable().notRequired(),
  startDate: Yup.date().nullable().notRequired(),
  endDate: Yup.date().nullable().notRequired(),
  typePeriodRent: Yup.string().nullable().notRequired(),
  address: Yup.object().nullable().notRequired().default(null),
  category: Yup.object().nullable().notRequired().default(null),
  typeFindOffer: Yup.string().nullable().notRequired(),
  typeContactClient: Yup.string().nullable().notRequired(),
});

export const setDefaultsValues = (formik: any, offerEntity: any) => {
  formik.setFieldValue(
    "typeOffer",
    offerEntity.typeOffer ? offerEntity.typeOffer : ""
  );
  formik.setFieldValue("title", offerEntity.title ? offerEntity.title : "");
  formik.setFieldValue(
    "description",
    offerEntity.description ? offerEntity.description : ""
  );
  //
  // if (offerEntity.typeOffer === TypeOfferEnum.Sell) {
  //   formik.setFieldValue('amount', offerEntity.title ? offerEntity.amount : null);
  // } else if (offerEntity.typeOffer === TypeOfferEnum.Rent) {
  //   formik.setFieldValue('amount', offerEntity.title ? offerEntity.amount : null);
  //   formik.setFieldValue('startDate', offerEntity.title ? offerEntity.startDate : null);
  //   formik.setFieldValue('endDate', offerEntity.title ? offerEntity.endDate : null);
  // } else if (offerEntity.typeOffer === TypeOfferEnum.Find) {
  //   formik.setFieldValue('amount', offerEntity.title ? offerEntity.amount : null);
  // }

  formik.setFieldValue(
    "address",
    offerEntity.address ? offerEntity.address : null
  );
  formik.setFieldValue(
    "category",
    offerEntity.category ? offerEntity.category : null
  );
  return formik;
};
