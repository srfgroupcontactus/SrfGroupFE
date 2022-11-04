import * as Yup from "yup";

export const initialValuesAccount = {
  email: "",
  langKey: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: null,
  linkProfileFacebook: "",
};

export const validationSchemaAccount = Yup.object({
  email: Yup.string().required("Email is required"),
  langKey: Yup.string().required("login is required"),
  firstName: Yup.string().required("firstName is required"),
  lastName: Yup.string().required("lastName is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.object().nullable().notRequired(),
  linkProfileFacebook: Yup.string().nullable().notRequired(),
});

export const initialValuesPasswordAccount = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export const validationSchemaPasswordAccount = Yup.object({
  currentPassword: Yup.string().required("currentPassword is required"),
  newPassword: Yup.string()
    .required("Password is required")
    .min(5, "Min 5 digits")
    .max(200, "Max 200 digits"),
  confirmNewPassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .min(5, "Muin 5 digits")
    .max(200, "Max 5 digits"),
});
