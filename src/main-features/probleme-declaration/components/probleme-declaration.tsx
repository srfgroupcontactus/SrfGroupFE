import React from "react";
import Box from "@mui/material/Box/Box";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField/TextField";
import MessageIcon from "@mui/icons-material/MessageOutlined";
import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import { useFormik } from "formik";
import * as Yup from "yup";
import { allSessionSelector } from "../../user/store/slice";
import {
  addProblemeDecalration,
  addSuccessProblemeDeclaration,
  loadingProblemeDeclaration,
} from "../store/slice";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useTranslation } from "react-i18next";
import { showUnauthorizedModal } from "../../../core/config/store/common/slice";

const initialValuesAddMessage = {
  content: "",
};

const validationSchemaAddMessage = Yup.object({
  content: Yup.string()
    .required("Message is required")
    .min(5, "Min 5 digits")
    .max(2000, "Max 2000 digits"),
});

const initialValues = initialValuesAddMessage;

export default function ProblemeDeclaration() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const { isShowing, open, close } = useUnauthorizedModal();

  const { isAuthenticated } = useSelector(allSessionSelector);

  const loadingProblemeDeclarationSelector =
    useSelector(loadingProblemeDeclaration) ?? false;
  const addSuccessProblemeDeclarationSelector =
    useSelector(addSuccessProblemeDeclaration) ?? false;

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAddMessage,
    onSubmit: (values) => {
      if (isAuthenticated) {
        dispatch(addProblemeDecalration({ ...values }));
      } else {
        // open();
        dispatch(showUnauthorizedModal({}));
      }
    },
  });

  React.useEffect(() => {
    if (addSuccessProblemeDeclarationSelector) {
      formik.resetForm();
    }
  }, [addSuccessProblemeDeclarationSelector]);

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <MessageIcon sx={{ mr: 1, my: 0.5 }} color="secondary" />
              <TextField
                id="content"
                name="content"
                color="secondary"
                label="Declarer votre probleme"
                variant="standard"
                fullWidth
                multiline
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                rows={4}
              />
            </Box>
            {formik.touched.content && Boolean(formik.errors.content) ? (
              <Box color="error">{formik.errors.content}</Box>
            ) : null}
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <LoadingButton
                loading={loadingProblemeDeclarationSelector}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mt: 2 }}
                color="secondary"
                type="submit"
              >
                Declarer
              </LoadingButton>
            </Box>
          </CardContent>
        </Card>
      </form>

      {/*<UnauthorizeContentModal*/}
      {/*    isShowing={isShowing}*/}
      {/*    onOpen={open}*/}
      {/*    onClose={close}*/}
      {/*/>*/}
    </Box>
  );
}
