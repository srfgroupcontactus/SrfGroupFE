import React from "react";
import Container from "@mui/material/Container/Container";
import { useQuery } from "../../../../shared/utils/utils-functions";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { ALL_APP_ROUTES } from "../../../../core/config/all-app-routes";
import Typography from "@mui/material/Typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  activationAccount,
  activationActivationAccount,
  loadingActivationAccount,
} from "../../store/slice";
import Alert from "@mui/material/Alert";

export default function ActivationAccount() {
  const query = useQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadingActivationAccountSelector =
    useSelector(loadingActivationAccount) ?? false;
  const activationActivationAccountSelector =
    useSelector(activationActivationAccount) ?? false;

  React.useEffect(() => {
    const key = query.get("key");
    console.log("key ", key);
    if (key) {
      dispatch(activationAccount({ key: key }));
    }
  }, [query]);

  React.useEffect(() => {
    if (activationActivationAccountSelector) {
      navigate(ALL_APP_ROUTES.LOGIN);
    }
  }, [activationActivationAccountSelector]);

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
            <Typography color="text.primary">Activation</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Box sx={{ paddingTop: 10, textAlign: "center" }}>
            {loadingActivationAccountSelector ? (
              <CircularProgress color="inherit" />
            ) : !activationActivationAccountSelector ? (
              <Alert severity="error">User Not found</Alert>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
