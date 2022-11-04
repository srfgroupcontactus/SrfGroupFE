import React from "react";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { ALL_APP_ROUTES } from "../../../../core/config/all-app-routes";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import IconButton from "@mui/material/IconButton/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import Slide from "@mui/material/Slide";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import {
  initialValuesForgotPasswordFinish,
  validationSchemaForgotPasswordFinish,
} from "../../validation/validation-signin";
import {
  loadingResetFinishPassword,
  resetFinishSuccessPassword,
  resetPasswordFinish,
} from "../../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../../../../shared/utils/utils-functions";

const initialValues = initialValuesForgotPasswordFinish;

export default function ForgotPasswordInit() {
  const [startAnimation, setStartAnimation] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState({
    showPassword: false,
  });
  const [showConfPassword, setShowConfPassword] = React.useState({
    showPassword: false,
  });
  const [keyPassword, setKeyPassword] = React.useState<string>("");

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();

  const loadingResetFinishPasswordSelector =
    useSelector(loadingResetFinishPassword) ?? false;
  const resetFinishSuccessPasswordSelector =
    useSelector(resetFinishSuccessPassword) ?? false;

  React.useEffect(() => {
    setTimeout(() => {
      setStartAnimation(true);
    }, 100);
  }, []);

  React.useEffect(() => {
    if (resetFinishSuccessPasswordSelector) {
      navigate(ALL_APP_ROUTES.LOGIN);
    }
  }, [resetFinishSuccessPasswordSelector]);

  React.useEffect(() => {
    const key = query.get("key");
    console.log("key ", key);
    if (key) {
      setKeyPassword(key);
    }
  }, [query]);

  const handleClickShowPassword = () => {
    setShowPassword({
      showPassword: !showPassword.showPassword,
    });
  };

  const handleClickShowConfPassword = () => {
    setShowConfPassword({
      showPassword: !showConfPassword.showPassword,
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaForgotPasswordFinish,
    onSubmit: (values) => {
      console.log("values ", values);
      dispatch(
        resetPasswordFinish({
          password: values.password.toString(),
          key: keyPassword,
        })
      );
    },
  });

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
                {t<string>("signin.title_page_signin")}
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
                {t<string>(
                  "forgot_password_finish.title_forgot_password_finish"
                )}
              </Typography>

              <Box sx={{ mt: 1, pb: 2 }}>
                <form onSubmit={formik.handleSubmit} data-testid="login-form">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                      >
                        <InputLabel htmlFor="outlined-adornment-title">
                          {t<string>("common.label_password")}
                        </InputLabel>
                        <OutlinedInput
                          id="password"
                          name="password"
                          type={showPassword.showPassword ? "text" : "password"}
                          label={t<string>("common.label_password")}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          inputProps={{
                            "data-testid": "password",
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText id="component-helper-text">
                          {formik.touched.password && formik.errors.password}
                        </FormHelperText>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.confPassword &&
                          Boolean(formik.errors.confPassword)
                        }
                      >
                        <InputLabel htmlFor="outlined-adornment-title">
                          {t<string>("common.label_confirm_password")}
                        </InputLabel>
                        <OutlinedInput
                          id="confPassword"
                          name="confPassword"
                          type={
                            showConfPassword.showPassword ? "text" : "password"
                          }
                          label={t<string>("common.label_confirm_password")}
                          value={formik.values.confPassword}
                          onChange={formik.handleChange}
                          inputProps={{
                            "data-testid": "password",
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showConfPassword.showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText id="component-helper-text">
                          {formik.touched.confPassword &&
                            formik.errors.confPassword}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <LoadingButton
                    loading={loadingResetFinishPasswordSelector}
                    fullWidth
                    variant="contained"
                    color="neutral"
                    type="submit"
                    data-testid="submit"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {t<string>("common.label_update")}
                  </LoadingButton>
                </form>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Container>
    </Slide>
  );
}
