import * as Yup from "yup";

export const initialValuesAddCommentOffer = {
  content: "",
};

export const validationSchemaAddCommentOffer = Yup.object({
  content: Yup.string().required("Type Offer is required"),
});

export const initialValuesAddMessageDetailsOffer = {
  fullName: "",
  email: "",
  content: "",
};

export const validationSchemaAddMessageDetailsOffer = Yup.object({
  fullName: Yup.string().required("Message is required"),
  email: Yup.string().email().required("email_is_required"),
  content: Yup.string().required("Message is required"),
});

export const initialValuesQuantityOffer = {
  quantity: 1,
};

export const validationSchemaQuantityOffer = Yup.object({
  quantity: Yup.number().required("Quantity is required"),
});
