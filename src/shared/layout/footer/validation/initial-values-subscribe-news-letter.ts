import * as Yup from "yup";

export const initialValuesSubscribeNewsLetter = {
  email: "",
};

export const validationSchemaSubscribeNewsLetter = Yup.object({
  email: Yup.string().email().required("Email is required"),
});
