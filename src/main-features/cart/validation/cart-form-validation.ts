import * as Yup from "yup";

export const initialValuesFormCart = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: null,
};

export const validationSchemaFormCart = Yup.object({
  email: Yup.string().required("Email is required"),
  firstName: Yup.string().required("firstName is required"),
  lastName: Yup.string().required("lastName is required"),
  phone: Yup.string().nullable().required("Phone is required"),
  address: Yup.object().nullable().required("Address is required"),
});

export const initialValuesFormPassCart = {
  code: '',
  paymentMode: ''
};

export const validationSchemaFormPassCart = Yup.object({
  code: Yup.string().nullable().notRequired(),
  paymentMode: Yup.string().required("Payment mode is required"),
});
