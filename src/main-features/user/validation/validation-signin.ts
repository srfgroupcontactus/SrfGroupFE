import * as Yup from "yup";

export const initialValuesSignIn = {
  email: "",
  password: "",
  rememberMe: true
};

export const validationSchemaSignIn = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Min 5 digits")
    .max(200, "Max 200 digits"),
  rememberMe: Yup.boolean().nullable().notRequired()
});

export const initialValuesForgotPassword = {
  email: "",
};

export const validationSchemaForgotPassword = Yup.object({
  email: Yup.string().email().required("Email is required"),
});

export const initialValuesForgotPasswordFinish = {
  password: "",
  confPassword: "",
};

export const validationSchemaForgotPasswordFinish = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(5, "Min 5 digits")
    .max(200, "Max 200 digits"),
  confPassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(5, "Muin 5 digits")
    .max(200, "Max 5 digits"),
});
