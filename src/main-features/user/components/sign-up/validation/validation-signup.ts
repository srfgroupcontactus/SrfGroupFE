import * as Yup from "yup";

export const initialValuesSignUp = {
  email: "",
  firstPassword: "",
  secondPassword: "",
  accept: false,
};

export const validationSchemaSignUp = Yup.object({
  email: Yup.string().email().required("Email is required"),
  firstPassword: Yup.string()
    .required("Password is required")
    .min(5, "Min 5 digits")
    .max(200, "Max 200 digits"),
  secondPassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("firstPassword"), null], "Passwords must match")
    .min(5, "Muin 5 digits")
    .max(200, "Max 5 digits"),
  accept: Yup.bool().oneOf([true], "Field must be checked"),
});
