import * as React from "react";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import Typography from "@mui/material/Typography/Typography";
import Container from "@mui/material/Container/Container";
import { useFormik } from "formik";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import Avatar from "@mui/material/Avatar/Avatar";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Divider from "@mui/material/Divider/Divider";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import { AllAppConfig } from "../../../core/config/all-config";
import { getBaseImageUrl } from "../../../shared/utils/utils-functions";
import {
  initialValuesContactUs,
  validationSchemaContactUs,
} from "../validation/init-value-contact-us";
import { addContactUs, allContactUsSelector } from "../store/slice";

const initialValues = initialValuesContactUs;

export default function ContactUs() {
  const recaptchaRef = React.createRef<any>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addSuccess, loading } = useSelector(allContactUsSelector);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaContactUs,
    onSubmit: (values) => {
      dispatch(addContactUs({ ...values }));
    },
  });

  useEffect(() => {
    if (addSuccess) {
      formik.resetForm();
      recaptchaRef?.current?.reset();
    }
  }, [addSuccess]);

  const onChange = (value: any) => {
    formik.setFieldValue("captchaResponse", value);
  };

  return (
    <div>
      <Container maxWidth="xl" sx={{ mb: 5 }}>
        <Grid
          container
          style={{
            paddingTop: 10,
          }}
        >
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" to={ALL_APP_ROUTES.HOME}>
                SRF
              </Link>
              <Typography color="text.primary">
                {t<string>("contact_us.title_contact_us")}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 6 }}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <h3 className="mb-3">{t<string>("contact_us.label_write_us")}</h3>

              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      size="small"
                    >
                      <InputLabel htmlFor="outlined-adornment-title" color="secondary">
                        {t<string>("contact_us.label_name")}
                      </InputLabel>
                      <OutlinedInput
                        id="name"
                        name="name"
                        label={t<string>("contact_us.label_name")}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        color="secondary"
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <FormHelperText id="component-helper-text">
                          {t<string>(formik.errors.name)}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl
                      fullWidth
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      size="small"
                    >
                      <InputLabel htmlFor="outlined-adornment-title" color="secondary">
                        {t<string>("contact_us.label_email")}
                      </InputLabel>
                      <OutlinedInput
                        id="email"
                        name="email"
                        label={t<string>("contact_us.label_email")}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        type="email"
                        color="secondary"
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <FormHelperText id="component-helper-text">
                          {t<string>(formik.errors.email)}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={
                        formik.touched.subject && Boolean(formik.errors.subject)
                      }
                      size="small"
                    >
                      <InputLabel htmlFor="outlined-adornment-title" color="secondary">
                        {t<string>("contact_us.label_subject")}
                      </InputLabel>
                      <OutlinedInput
                        id="subject"
                        name="subject"
                        label={t<string>("contact_us.label_subject")}
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        color="secondary"
                      />
                      {formik.touched.subject && formik.errors.subject ? (
                        <FormHelperText id="component-helper-text">
                          {t<string>(formik.errors.subject)}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <FormControl
                      fullWidth
                      sx={{ mt: 3 }}
                      error={
                        formik.touched.message && Boolean(formik.errors.message)
                      }
                      size="small"
                    >
                      <InputLabel htmlFor="outlined-adornment-amount" color="secondary">
                        {t<string>("contact_us.label_message")}
                      </InputLabel>
                      <OutlinedInput
                        id="message"
                        name="message"
                        label={t<string>("contact_us.label_message")}
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        multiline
                        maxRows={4}
                        rows={4}
                        color="secondary"
                      />
                      {formik.touched.message && formik.errors.message ? (
                        <FormHelperText id="component-helper-text">
                          {t<string>(formik.errors.message)}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <ReCAPTCHA
                      sitekey={AllAppConfig.RECAPTCHA_CONTACT_US.SITE_KEY}
                      onChange={onChange}
                      ref={recaptchaRef}
                    />
                    {formik.touched.captchaResponse &&
                    formik.errors.captchaResponse ? (
                      <FormHelperText className="color-orange">
                        {t<string>(formik.errors.captchaResponse)}
                      </FormHelperText>
                    ) : null}
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <LoadingButton
                      loading={loading}
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      color="secondary"
                      type="submit"
                    >
                      {t<string>("contact_us.label_send_message")}
                    </LoadingButton>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ p: 2 }}>
            <Typography variant="h5" color="text.secondary">
              {t<string>("contact_us.label_at_your_service")}
            </Typography>

            <List sx={{}}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Email"
                    src={`${getBaseImageUrl(
                      "/assets/images/contact-us/mail.png"
                    )}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={t<string>("common.label_email")}
                  secondary="srfgroup.contact@gmail.com"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Call"
                    src={`${getBaseImageUrl(
                      "/assets/images/contact-us/call.png"
                    )}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={t<string>("common.label_phone")}
                  secondary="+216 21 636 339 -  +216 73 900 850"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Location"
                    src={`${getBaseImageUrl(
                      "/assets/images/contact-us/location.png"
                    )}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={t<string>("common.label_address")}
                  secondary="Rue Montreal Skanes ElMechref, 5000, Monastir, Tunisia"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Location"
                    src={`${getBaseImageUrl(
                      "/assets/images/contact-us/location.png"
                    )}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={t<string>("common.label_google_maps")}
                  secondary="Tunis, Tunisia"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
      {/*<ContactUsMap />*/}
    </div>
  );
}
