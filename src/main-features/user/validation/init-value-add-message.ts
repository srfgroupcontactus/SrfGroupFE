import * as Yup from "yup";

export const initialValuesAddMessage = {
  content: "",
};

export const validationSchemaAddMessage = Yup.object({
  content: Yup.string().required("Message is required"),
});
