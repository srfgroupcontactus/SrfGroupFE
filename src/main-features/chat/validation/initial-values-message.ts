import * as Yup from "yup";

export const initialValuesMessage = {
  content: "",
};

export const validationSchemaMessage = Yup.object({
  content: Yup.string().required("Message is required"),
});
