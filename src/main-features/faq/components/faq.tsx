import React from "react";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card/Card";
import CardActions from "@mui/material/CardActions/CardActions";
import IconButton from "@mui/material/IconButton/IconButton";
import Divider from "@mui/material/Divider/Divider";
import Collapse from "@mui/material/Collapse/Collapse";
import CardContent from "@mui/material/CardContent/CardContent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Box from "@mui/material/Box/Box";
import Alert from "@mui/material/Alert/Alert";
import i18n from "i18next";
import { allFaqSelector, fetchFaq } from "../../faq/store/slice";
import { ALL_APP_ROUTES } from "../../../core/config/all-app-routes";
import { IFaq } from "../../../shared/model/faq.model";
import isEmpty from "lodash/isEmpty";

export const GetCardList = (props: any) => {
  const [expanded, setExpanded] = React.useState(false);

  const { faq, currentLocale } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getQuestion = () => {
    if (currentLocale === "ar-ly") {
      return faq.questionAr;
    } else if (currentLocale === "fr") {
      return faq.questionFr;
    } else if (currentLocale === "en") {
      return faq.questionEn;
    }
  };

  const getResponse = () => {
    if (currentLocale === "ar-ly") {
      return faq.responseAr;
    } else if (currentLocale === "fr") {
      return faq.responseFr;
    } else if (currentLocale === "en") {
      return faq.responseEn;
    }
  };

  return (
    <Card>
      <CardActions disableSpacing>
        <IconButton
          sx={{ p: "10px", flex: 1 }}
          aria-label="menu"
          onClick={handleExpandClick}
        >
          {getQuestion()}
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{getResponse()}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default function Faq() {

  const [defaultLanguage, setDefaultLanguage] = React.useState("fr");
  const dispatch = useDispatch();
  const { entities, loadingEntities } = useSelector(allFaqSelector);

  React.useEffect(() => {
    i18n.on("languageChanged", (lang: any) => {
      setDefaultLanguage(lang);
    });

    if (isEmpty(entities)) {
      dispatch(fetchFaq({}));
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid
        container
        style={{
          paddingTop: 10,
        }}
      >
        <Grid item xs={12} md={6}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to={ALL_APP_ROUTES.HOME}>
              SRF
            </Link>
            <Typography color="text.primary">FAQ</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 3 }}>
        {loadingEntities ? (
          <Grid item xs={12}>
            <Box sx={{ paddingTop: 10, textAlign: "center" }}>
              <CircularProgress color="inherit" />
            </Box>
          </Grid>
        ) : null}

        {entities && entities.length > 0
          ? entities.map((faq: IFaq, i: number) => (
              <Grid item xs={12} md={6} key={`entity-${i}`}>
                <GetCardList faq={faq} currentLocale={defaultLanguage} />
              </Grid>
            ))
          : !loadingEntities && (
              <Grid item xs={12} md={6}>
                <Alert severity="warning">No Faqs found</Alert>
              </Grid>
            )}
      </Grid>
    </Container>
  );
}
