import * as Yup from "yup";

export const initialValuesContactUs = {
  name: "",
  email: "",
  subject: "",
  message: "",
  captchaResponse: "",
};

export const validationSchemaContactUs = Yup.object({
  name: Yup.string().required("contact_us.name_is_required"),
  email: Yup.string().email().required("contact_us.email_is_required"),
  subject: Yup.string().required("contact_us.subject_is_required"),
  message: Yup.string().required("contact_us.message_is_required"),
  captchaResponse: Yup.string().required("contact_us.recaptcha_is_required"),
});
