import React from "react";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import Typography from "@mui/material/Typography/Typography";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Box from "@mui/material/Box/Box";
import i18n from "i18next";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import { useDispatch, useSelector } from "react-redux";
import { allAboutUsSelector, fetchAboutUs } from "../store/slice";
import isEmpty from "lodash/isEmpty";

export default function AboutUs() {
  const [defaultLanguage, setDefaultLanguage] = React.useState("fr");
  const dispatch = useDispatch();
  const { entity, loading } = useSelector(allAboutUsSelector);

  React.useEffect(() => {
    i18n.on("languageChanged", (lang: any) => {
      setDefaultLanguage(lang);
    });

    if (isEmpty(entity)) {
      dispatch(fetchAboutUs({}));
    }
  }, []);

  React.useEffect(() => {
    if (entity) {
      getContentByLang();
    }
  }, [entity]);

  const getContentByLang = (): string => {
    if (defaultLanguage === "en") {
      return entity.contentEn || "";
    } else if (defaultLanguage === "fr") {
      return entity.contentFr || "";
    }
    return entity.contentAr || "";
  };

  return (
    <Container maxWidth="xl">
      <Grid
        container
        style={{
          paddingTop: 10,
        }}
      >
        <Grid item xs={12} sm={6}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to={ALL_APP_ROUTES.HOME}>
              SRF
            </Link>
            <Typography color="text.primary">AboutUs</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid
        container
        style={{
          paddingTop: 50,
        }}
      >
        {loading ? (
          <Grid item xs={12}>
            <Box sx={{ paddingTop: 10, textAlign: "center" }}>
              <CircularProgress color="inherit" />
            </Box>
          </Grid>
        ) : null}

        <Grid item xs={12}>
          <Box dangerouslySetInnerHTML={{ __html: getContentByLang() }}></Box>
        </Grid>

      </Grid>
    </Container>
  );
}
