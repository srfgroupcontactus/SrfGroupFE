import * as Yup from "yup";

export const initialValuesRentRequestReceived = {
    amount: "",
    startDate: "",
    endDate: "",
    typePeriodRent: ""
};

export const validationSchemaRentRequestReceived = Yup.object({
    amount: Yup.number().nullable().notRequired(),
    startDate: Yup.date().nullable().notRequired(),
    endDate: Yup.date().nullable().notRequired(),
    typePeriodRent: Yup.string().nullable().notRequired()
});
