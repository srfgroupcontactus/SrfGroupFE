import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import SendIcon from "@mui/icons-material/SendAndArchive";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import Grid from "@mui/material/Grid/Grid";
import Avatar from "@mui/material/Avatar/Avatar";
import Stack from "@mui/material/Stack/Stack";
import {dataUrlToFile, getBase64, getBaseImageUrl} from "../../utils/utils-functions";
import packageJson from "../../../../package.json";
import { useFormik } from "formik";
import {
  initialValuesSubscribeNewsLetter,
  validationSchemaSubscribeNewsLetter,
} from "./validation/initial-values-subscribe-news-letter";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useTranslation } from "react-i18next";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewsLetter,
  addSuccessNewsLetter,
  loadingNewsLetter,
} from "./store/slice";
import './components/footer.scss';
import loadImage from "blueimp-load-image";
import * as Reactdom from 'react-dom';
import {MutableRefObject, ReactInstance} from "react";
import { Image } from "load-image-react";

function Copyright() {
  return (
    <Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ pt: 3 }}
      >
        {"Copyright © "}
        <a
          color="inherit"
          href="https://www.linkedin.com/in/rahal-taki-eddine-51952ba4/"
          target="_blank"
          rel="noreferrer"
        >
          Taki Eddine Rahal
        </a>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ py: 1 }}
      >
        V {packageJson.version}
      </Typography>
    </Box>
  );
}

const initialValues = initialValuesSubscribeNewsLetter;

export default function Footer() {

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loadingNewsLetterSelector = useSelector(loadingNewsLetter) ?? false;
  const addSuccessNewsLetterSelector =
    useSelector(addSuccessNewsLetter) ?? false;

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaSubscribeNewsLetter,
    onSubmit: (values) => {
      dispatch(addNewsLetter({ ...values }));
    },
  });

  React.useEffect(() => {
    if (addSuccessNewsLetterSelector) {
      formik.resetForm();
    }
  }, [addSuccessNewsLetterSelector]);

  return (
    <Box component="footer" sx={{ bgcolor: "background.paper" }}>
      <form onSubmit={formik.handleSubmit}>
        <Toolbar
          component="nav"
          variant="dense"
          sx={{
            backgroundColor: "#e2c498",
            justifyContent: "center",
            paddingTop: 2,
            paddingBottom: 2,
            display: { xs: "block", sm: "flex;" },
          }}
        >
          <Typography
            sx={{ fontSize: 20, mr: 1 }}
            color="text.secondary"
            display="flex"
          >
            <SendIcon sx={{ mr: 0.9 }} /> Inscrivez-vous à la newsletter
          </Typography>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", sm: 400 },
            }}
          >
            <InputBase
              id="email"
              name="email"
              color="secondary"
              sx={{ ml: 1, flex: 1 }}
              placeholder={t("common.label_email")}
              inputProps={{ "aria-label": t("common.label_email") }}
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              error
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <LoadingButton
              loading={loadingNewsLetterSelector}
              variant="text"
              color="secondary"
              type="submit"
            >
              {t<string>("common.label_subscribe")}
            </LoadingButton>
          </Paper>
          {formik.touched.email && formik.errors.email ? (
            <Typography sx={{ mx: 1 }} color="error" display="flex">
              Email required
            </Typography>
          ) : null}
        </Toolbar>
      </form>
      <div>
        <Typography variant="h6" align="center" gutterBottom sx={{ pt: 3 }}>
          <img
            src={getBaseImageUrl("/assets/images/logo-svg.svg")}
            className="img-footer-logo"
            alt="Logo SrfGroup"
          />
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" align="center" gutterBottom>
              Follow us
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center", mb: 3 }}
            >
              <a
                href="https://www.facebook.com/profile.php?id=100054409273167"
                target="_blank"
                rel="noreferrer"
              >
                <Avatar
                  alt="facebook"
                  src={getBaseImageUrl("/assets/images/footer/facebook.png")}
                />
              </a>
              <a
                href="https://www.instagram.com/srfgroup/"
                target="_blank"
                rel="noreferrer"
              >
                <Avatar
                  alt="instagram"
                  src={getBaseImageUrl("/assets/images/footer/instagram.png")}
                />
              </a>
              <Avatar
                alt="youtube"
                src={getBaseImageUrl("/assets/images/footer/youtube.png")}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="h6" align="center" gutterBottom>
              Nos services
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Livraison Rapide
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Moyens de Paiement
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Retour Facile
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Service client et Assistance Technique
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Marques officiels
            </Typography>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="h6" align="center" gutterBottom>
              {t<string>("footer.label_about_us")}
            </Typography>

            <Link to={ALL_APP_ROUTES.SUPPORT.ABOUT_US}>
              <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
              >
                {t<string>("footer.label_Who_are_we")}
              </Typography>
            </Link>

            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              {t<string>("footer.label_privacy_policy")}
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Politique des cookies
            </Typography>
            <Link to={ALL_APP_ROUTES.SUPPORT.CONTACT_US}>
              <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
              >
                Contact
              </Typography>
            </Link>
            <Link to={ALL_APP_ROUTES.SUPPORT.FAQ}>
              <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
              >
                FAQ
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" align="center" gutterBottom>
              Apps mobile
            </Typography>
            <Typography component="p" align="center">
              <img
                src={getBaseImageUrl("/assets/images/footer/android.svg")}
                style={{ marginRight: "2px" }}
                width="100"
                height="30"
                alt="Logo Android"
              />
              <img
                src={getBaseImageUrl("/assets/images/footer/ios.svg")}
                style={{ marginLeft: "2px" }}
                width="100"
                height="30"
                alt="Logo iOS"
              />
            </Typography>
          </Grid>
        </Grid>

        <Copyright />
      </div>
    </Box>
  );
}
