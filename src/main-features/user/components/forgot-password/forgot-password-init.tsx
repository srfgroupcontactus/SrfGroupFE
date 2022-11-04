import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  initialValuesForgotPassword,
  validationSchemaForgotPassword,
} from "../../validation/validation-signin";
import { useFormik } from "formik";
import {
  loadingResetInitPassword,
  resetInitSuccessPassword,
  resetPassword,
  resetPasswordInit,
} from "../../store/slice";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide/Slide";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import Avatar from "@mui/material/Avatar/Avatar";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import Alert from "@mui/material/Alert/Alert";
import { ALL_APP_ROUTES } from "../../../../core/config/all-app-routes";

const initialValues = initialValuesForgotPassword;

export default function ForgotPasswordInit() {
  const [startAnimation, setStartAnimation] = React.useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loadingResetInitPasswordSelector =
    useSelector(loadingResetInitPassword) ?? false;
  const resetInitSuccessPasswordSelector =
    useSelector(resetInitSuccessPassword) ?? false;

  React.useEffect(() => {
    dispatch(resetPassword({}));

    setTimeout(() => {
      setStartAnimation(true);
    }, 100);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaForgotPassword,
    onSubmit: (values) => {
      dispatch(resetPasswordInit(values.email));
    },
  });

  React.useEffect(() => {
    if (resetInitSuccessPasswordSelector) {
      formik.resetForm();
    }
  }, [resetInitSuccessPasswordSelector]);

  return (
    <Slide direction="up" in={startAnimation} mountOnEnter unmountOnExit>
      <Container maxWidth="xl">
        <Grid
          container
          style={{
            paddingTop: 10,
          }}
        >
          <Grid item sm={4}></Grid>
          <Grid item xs={12} sm={6}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" to={ALL_APP_ROUTES.HOME}>
                SRF
              </Link>
              <Typography color="text.primary">
                {t<string>("signin.title_page_forgot_password")}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid container sx={{ pt: 5, pb: 5 }}>
          <Grid item xs={4}></Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={4}
            component={Paper}
            md-offset={3}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {t<string>("signin.title_page_forgot_password")}
              </Typography>

              <Box sx={{ mt: 1, pb: 2 }}>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {resetInitSuccessPasswordSelector ? (
                        <Alert severity="success" sx={{ my: 2 }}>
                          {t<string>(
                            "forgot_password_init.message_send_mail_success"
                          )}
                        </Alert>
                      ) : null}
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                      >
                        <InputLabel htmlFor="outlined-adornment-title">
                          {t<string>("common.label_email")}
                        </InputLabel>
                        <OutlinedInput
                          id="email"
                          name="email"
                          type="email"
                          inputProps={{
                            "data-testid": "email",
                          }}
                          label={t<string>("common.label_email")}
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                        <FormHelperText
                          id="component-helper-text"
                          data-testid="error-msg"
                        >
                          {formik.touched.email && formik.errors.email}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <LoadingButton
                    loading={loadingResetInitPasswordSelector}
                    fullWidth
                    variant="contained"
                    color="neutral"
                    type="submit"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {t<string>("common.label_send")}
                  </LoadingButton>
                </form>

                <Grid container justifyContent="center" sx={{ my: 3 }}>
                  <Grid item>
                    <Link to={ALL_APP_ROUTES.LOGIN}>
                      {t<string>("signup.label-already-have-account")}
                    </Link>
                  </Grid>
                </Grid>

                <Grid container justifyContent="center">
                  <Grid item>
                    <Link to={ALL_APP_ROUTES.REGISTER}>
                      {t<string>("signin.label_register_account")}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Slide>
  );
}
