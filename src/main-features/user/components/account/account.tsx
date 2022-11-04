import React from "react";
import Container from "@mui/material/Container/Container";
import { connect, useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box/Box";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import Avatar from "@mui/material/Avatar/Avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useFormik } from "formik";
import IconButton from "@mui/material/IconButton/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup";
import Button from "@mui/material/Button/Button";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography/Typography";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import TextField from "@mui/material/TextField/TextField";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {
  dataUrlToFile, getBase64,
  getFullnameUser,
  getUserAvatar,
} from "../../../../shared/utils/utils-functions";
import {
  currentUserSession,
  entityUpdateAvatar,
  entityUpdateInfosAccount,
  loadingPasswordAccount,
  loadingSession,
  loadingUpdateAvatar,
  loadingUpdateInfosAccount,
  sessionUser,
  updateAvatarAccount,
  updateInfosAccount,
  updatePasswordAccount,
  updateSuccessAvatar,
  updateSuccessInfosAccount,
  updateSuccessPasswordAccount,
} from "../../store/slice";
import {
  initialValuesAccount,
  initialValuesPasswordAccount,
  validationSchemaAccount,
  validationSchemaPasswordAccount,
} from "../../validation/validation-account";
import { ALL_APP_ROUTES } from "../../../../core/config/all-app-routes";
import { StorageService } from "../../../../shared/services/storage.service";
import { AllAppConfig } from "../../../../core/config/all-config";
import { getImageUrl } from "../../../../shared/utils/image-url";
import { SourceProvider } from "../../../../shared/enums/source-provider";
import { allAddressSelector } from "../../../address/store/slice";
import { IAddress } from "../../../../shared/model/address.model";
import { languages, locales } from "../../store/initial.state";
import {
  entityCountOffersByUser,
  fetchCountAllOffersByUser,
  loadingEntityCountOffersByUser,
} from "../../../offer/store/slice";
import StatisticOffers from "../../../../shared/components/statistic-offers/statistic-offers";
import { Image } from "load-image-react";
// import { AccountChatBot } from './ui-segments/account-chatbot';

const initialValues = initialValuesAccount;
const initialValuesPassword = initialValuesPasswordAccount;

export default function Account() {
  const currentUser = useSelector(currentUserSession);
  const loadingSessionSelector = useSelector(loadingSession);
  const loadingUpdateInfosAccountSelector =
    useSelector(loadingUpdateInfosAccount) ?? false;
  const updateSuccessInfosAccountSelector =
    useSelector(updateSuccessInfosAccount) ?? false;
  const loadingPasswordAccountSelector =
    useSelector(loadingPasswordAccount) ?? false;
  const updateSuccessPasswordAccountSelector =
    useSelector(updateSuccessPasswordAccount) ?? false;
  const entityUpdateInfosAccountSelector =
    useSelector(entityUpdateInfosAccount) ?? {};

  const loadingUpdateAvatarSelector = useSelector(loadingUpdateAvatar) ?? false;
  const updateSuccessAvatarSelector = useSelector(updateSuccessAvatar) ?? false;
  const entityUpdateAvatarSelector = useSelector(entityUpdateAvatar) ?? {};

  const entitiesAddress: IAddress[] =
    useSelector(allAddressSelector).entities ?? [];

  const [fileState, setFileState] = React.useState(
    getUserAvatar(
      currentUser.id,
      currentUser.imageUrl,
      currentUser.sourceConnectedDevice
    )
  );
  const [showEditInfos, setShowEditInfos] = React.useState(false);
  const [imageAvatar, setImageAvatar] = React.useState<any>(null);
  const [showEditPassword, setShowEditPassword] = React.useState(false);
  const [showcurrentUserPassword, setShowcurrentUserPassword] = React.useState({
    showPassword: false,
  });
  const [showNewPassword, setShowNewPassword] = React.useState({
    showPassword: false,
  });
  const [showConfPassword, setShowConfPassword] = React.useState({
    showPassword: false,
  });

  const loadingEntityCountOffersByUserSelector =
    useSelector(loadingEntityCountOffersByUser) ?? false;
  const entityCountOffersByUserSelector =
    useSelector(entityCountOffersByUser) ?? false;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaAccount,
    onSubmit: (values) => {
      const account = {
        ...currentUser,
        ...values,
      };
      dispatch(updateInfosAccount({ ...account }));
    },
  });

  const formikPassword = useFormik({
    initialValues: initialValuesPassword,
    validationSchema: validationSchemaPasswordAccount,
    onSubmit: (values) => {
      console.log("values ", values);
      dispatch(updatePasswordAccount({ ...values }));
    },
  });

  const handleClickShowcurrentUserPassword = () => {
    setShowcurrentUserPassword({
      showPassword: !showcurrentUserPassword.showPassword,
    });
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword({
      showPassword: !showNewPassword.showPassword,
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

  React.useEffect(() => {
    if (updateSuccessPasswordAccountSelector) {
      setShowEditPassword(false);
      formikPassword.resetForm();
    }
  }, [updateSuccessPasswordAccountSelector]);

  React.useEffect(() => {
    console.log("currentUser ", currentUser);
    if (currentUser) {

      // Set avatar
      setFileState(
        getUserAvatar(
          currentUser.id,
          currentUser.imageUrl,
          currentUser.sourceConnectedDevice
        )
      );

      formik.setValues({
        email: currentUser.email ? currentUser.email : "",
        langKey: currentUser.langKey ? currentUser.langKey : "",
        firstName: currentUser.firstName ? currentUser.firstName : "",
        lastName: currentUser.lastName ? currentUser.lastName : "",
        phone: currentUser.phone ? currentUser.phone : "",
        address: currentUser.address ? currentUser.address : null,
        linkProfileFacebook: currentUser.linkProfileFacebook
          ? currentUser.linkProfileFacebook
          : "",
      });

      dispatch(
        fetchCountAllOffersByUser({
          userId: Number(currentUser.id),
        })
      );
    }
  }, [currentUser]);

  React.useEffect(() => {
    console.log('updateSuccessInfosAccountSelector ', updateSuccessInfosAccountSelector);
    console.log('entityUpdateInfosAccountSelector ', entityUpdateInfosAccountSelector);
    if (updateSuccessInfosAccountSelector) {
      setShowEditInfos(false);
      const currentUser = JSON.parse(
        StorageService.local.get(AllAppConfig.VALUE_CURRENT_USER)
      );
      const updatecurrentUser = {
        ...currentUser,
        ...entityUpdateInfosAccountSelector,
      };
      StorageService.local.set(
        AllAppConfig.VALUE_CURRENT_USER,
        JSON.stringify(updatecurrentUser)
      );
    }
  }, [updateSuccessInfosAccountSelector]);

  React.useEffect(() => {
    if (imageAvatar) {
      const formData = new FormData();
      formData.append("avatar", imageAvatar);
      dispatch(updateAvatarAccount({ formData }));
    }
  }, [imageAvatar]);

  React.useEffect(() => {
    if (updateSuccessAvatarSelector) {
      StorageService.local.set(
        AllAppConfig.VALUE_CURRENT_USER,
        JSON.stringify(entityUpdateAvatarSelector)
      );
    }
  }, [updateSuccessAvatarSelector]);

  const selectFile = (event: any) => {
    // getImageUrl(event.target.files[0], 500)
    getBase64(event.target.files[0])
        .then((result: any) => {
        dataUrlToFile(result, event.target.files[0].name).then((value: any) => {
          setImageAvatar(value);
        });
        setFileState(result);
      });
  };

  return (
    <Container maxWidth="xl" className="pt-5">
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
            <Link color="inherit" to={ALL_APP_ROUTES.SEARCH}>
              {t<string>("account.title")}
            </Link>
            <Typography color="text.primary">
              {getFullnameUser(currentUser)}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {loadingSessionSelector ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Grid
          container
          spacing={4}
          style={{
            paddingTop: 50,
          }}
        >
          <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
            <Paper elevation={3} sx={{ p: 1 }}>
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "relative",
                    width: "80px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >

                  <Avatar
                    alt="Remy Sharp"
                    src={fileState}
                    sx={{
                      width: 80,
                      height: 80,
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginBottom: 2,
                      mt: 2,
                      border: "1px solid #cdc5c5",
                    }}
                  >
                    {getFullnameUser(currentUser)?.charAt(0)}
                  </Avatar>
                  {currentUser.sourceConnectedDevice ==
                    SourceProvider.MOBILE_BROWSER ||
                  currentUser.sourceConnectedDevice ===
                    SourceProvider.WEB_BROWSER ? (
                    <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
                      <CameraAltIcon />
                    </Box>
                  ) : null}
                </Box>

                {currentUser.sourceConnectedDevice ===
                  SourceProvider.MOBILE_BROWSER ||
                currentUser.sourceConnectedDevice ===
                  SourceProvider.WEB_BROWSER ? (
                  <Box>
                    <input
                      type="file"
                      onChange={selectFile}
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        opacity: 0,
                      }}
                      accept=".jpg, .jpeg, .png"
                    />
                  </Box>
                ) : null}
              </Box>
              <h3>{getFullnameUser(currentUser)}</h3>
              <p>{currentUser.email}</p>
            </Paper>

            {!loadingEntityCountOffersByUserSelector && (
                entityCountOffersByUserSelector?.countFindOffers ||
                entityCountOffersByUserSelector?.countRentOffers ||
                entityCountOffersByUserSelector?.countSellOffers
            ) ? (
              <Box>
                <StatisticOffers
                  countOffersByUser={entityCountOffersByUserSelector}
                />
              </Box>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ mt: 2 }}>
                  <h5 className="mb-4">
                    {t<string>("account.label_personnel_details")}
                    {!showEditInfos ? (
                      <IconButton
                        aria-label="upload picture"
                        className="float-right"
                        component="span"
                        color="success"
                        onClick={() => setShowEditInfos(true)}
                      >
                        <EditIcon />
                      </IconButton>
                    ) : null}
                  </h5>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        size="small"
                      >
                        <InputLabel htmlFor="outlined-adornment-title" color="secondary">
                          {t<string>("account.label_email")}
                        </InputLabel>
                        <OutlinedInput
                          id="email"
                          name="email"
                          label={t<string>("account.label_email")}
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          disabled
                        />
                        <FormHelperText id="component-helper-text">
                          {formik.touched.email && formik.errors.email}
                        </FormHelperText>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.langKey &&
                          Boolean(formik.errors.langKey)
                        }
                        size="small"
                      >
                        <InputLabel htmlFor="outlined-adornment-title" color="secondary">
                          {t<string>("account.label_languages")}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label={t<string>("account.label_languages")}
                          value={formik.values.langKey}
                          onChange={(e) => {
                            formik.setFieldValue("langKey", e.target.value);
                          }}
                          disabled={!showEditInfos}
                          color="secondary"
                        >
                          {Object.keys(languages).length > 1
                            ? locales.map((locale) => (
                                <MenuItem key={locale} value={locale}>
                                  {languages[locale].name}
                                </MenuItem>
                              ))
                            : null}
                        </Select>
                        <FormHelperText id="component-helper-text">
                          {formik.touched.langKey && formik.errors.langKey}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        size="small"
                      >
                        <InputLabel htmlFor="outlined-adornment-title" color="secondary">
                          {t<string>("account.label_firstname")} *
                        </InputLabel>
                        <OutlinedInput
                          id="firstName"
                          name="firstName"
                          label={t<string>("account.label_firstname")}
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          disabled={!showEditInfos}
                          color="secondary"
                        />
                        <FormHelperText id="component-helper-text">
                          {formik.touched.firstName && formik.errors.firstName}
                        </FormHelperText>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.lastName &&
                          Boolean(formik.errors.lastName)
                        }
                        size="small"
                      >
                        <InputLabel htmlFor="outlined-adornment-title" color="secondary">
                          {t<string>("account.label_lastname")} *
                        </InputLabel>
                        <OutlinedInput
                          id="lastName"
                          name="lastName"
                          label={t<string>("account.label_lastname")}
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          disabled={!showEditInfos}
                          color="secondary"
                        />
                        <FormHelperText id="component-helper-text">
                          {formik.touched.lastName && formik.errors.lastName}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.phone && Boolean(formik.errors.phone)
                        }
                        size="small"
                      >
                        <InputLabel htmlFor="outlined-adornment-title" color="secondary">
                          {t<string>("account.label_phone")} *
                        </InputLabel>
                        <OutlinedInput
                          id="phone"
                          name="phone"
                          label={t<string>("account.label_phone")}
                          type="tel"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          disabled={!showEditInfos}
                          color="secondary"
                        />
                        <FormHelperText id="component-helper-text">
                          {formik.touched.phone && formik.errors.phone}
                        </FormHelperText>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.address &&
                          Boolean(formik.errors.address)
                        }
                      >
                        <Autocomplete
                          id="address"
                          fullWidth
                          size="small"
                          options={entitiesAddress}
                          value={formik.values.address}
                          onChange={(e, value) =>
                            formik.setFieldValue("address", value || "")
                          }
                          autoHighlight
                          getOptionLabel={(option) => option?.city || ""}
                          disabled={!showEditInfos}
                          renderOption={(propsRender, option) => (
                            <Box component="li" {...propsRender}>
                              {option?.city}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Address"
                              color="secondary"
                              inputProps={{
                                ...params.inputProps,
                                form: {
                                  autocomplete: "off",
                                },
                                autoComplete: "off", // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                        <FormHelperText id="component-helper-text">
                          {formik.touched.address && formik.errors.address}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={
                          formik.touched.linkProfileFacebook &&
                          Boolean(formik.errors.linkProfileFacebook)
                        }
                        size="small"
                      >
                        <InputLabel htmlFor="outlined-adornment-title" color="secondary">
                          {t<string>("account.label_link_profile_facebook")}
                        </InputLabel>
                        <OutlinedInput
                          id="linkProfileFacebook"
                          name="linkProfileFacebook"
                          type="url"
                          label={t<string>(
                            "account.label_link_profile_facebook"
                          )}
                          value={formik.values.linkProfileFacebook}
                          onChange={formik.handleChange}
                          disabled={!showEditInfos}
                          color="secondary"
                        />
                        <FormHelperText id="component-helper-text">
                          {formik.touched.linkProfileFacebook &&
                            formik.errors.linkProfileFacebook}
                        </FormHelperText>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}></Grid>
                  </Grid>

                  {showEditInfos ? (
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={12} md={12}>
                        <ButtonGroup
                          variant="contained"
                          aria-label="outlined primary button group"
                          style={{ float: "right" }}
                        >
                          <Button
                            color="neutral"
                            variant="outlined"
                            startIcon={<BlockIcon />}
                            onClick={() => setShowEditInfos(false)}
                          >
                            {t<string>("common.label_cancel")}
                          </Button>

                          <LoadingButton
                            color="success"
                            type="submit"
                            loading={loadingUpdateInfosAccountSelector}
                            loadingPosition="start"
                            startIcon={<CheckIcon />}
                            variant="contained"
                            size="small"
                          >
                            {t<string>("common.label_update")}
                          </LoadingButton>
                        </ButtonGroup>
                      </Grid>
                    </Grid>
                  ) : null}
                </Box>
              </form>
            </Paper>

            {currentUser.sourceConnectedDevice ===
              SourceProvider.MOBILE_BROWSER ||
            currentUser.sourceConnectedDevice === SourceProvider.WEB_BROWSER ? (
              <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
                <form onSubmit={formikPassword.handleSubmit}>
                  <Box sx={{ mt: 2 }}>
                    <h5 className="mb-4">
                      {t<string>("account.label_password_details")}
                      {!showEditPassword ? (
                        <IconButton
                          aria-label="upload picture"
                          className="float-right"
                          component="span"
                          color="success"
                          onClick={() => setShowEditPassword(true)}
                        >
                          <EditIcon />
                        </IconButton>
                      ) : null}
                    </h5>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormControl
                          fullWidth
                          error={
                            formikPassword.touched.currentPassword &&
                            Boolean(formikPassword.errors.currentPassword)
                          }
                        >
                          <InputLabel htmlFor="outlined-adornment-title" color="secondary">
                            {t<string>("account.label_current_password")}
                          </InputLabel>
                          <OutlinedInput
                            id="currentPassword"
                            name="currentPassword"
                            type={
                              showcurrentUserPassword.showPassword
                                ? "text"
                                : "password"
                            }
                            label={t<string>("account.label_current_password")}
                            value={formikPassword.values.currentPassword}
                            onChange={formikPassword.handleChange}
                            disabled={!showEditPassword}
                            color="secondary"
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowcurrentUserPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showcurrentUserPassword.showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <FormHelperText id="component-helper-text">
                            {formikPassword.touched.currentPassword &&
                              formikPassword.errors.currentPassword}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          fullWidth
                          error={
                            formikPassword.touched.newPassword &&
                            Boolean(formikPassword.errors.newPassword)
                          }
                        >
                          <InputLabel htmlFor="outlined-adornment-title" color="secondary">
                            {t<string>("account.label_new_password")}
                          </InputLabel>
                          <OutlinedInput
                            id="newPassword"
                            name="newPassword"
                            type={
                              showNewPassword.showPassword ? "text" : "password"
                            }
                            label={t<string>("account.label_new_password")}
                            value={formikPassword.values.newPassword}
                            onChange={formikPassword.handleChange}
                            disabled={!showEditPassword}
                            color="secondary"
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowNewPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showNewPassword.showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <FormHelperText id="component-helper-text">
                            {formikPassword.touched.newPassword &&
                              formikPassword.errors.newPassword}
                          </FormHelperText>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl
                          fullWidth
                          error={
                            formikPassword.touched.confirmNewPassword &&
                            Boolean(formikPassword.errors.confirmNewPassword)
                          }
                        >
                          <InputLabel htmlFor="outlined-adornment-title" color="secondary">
                            {t<string>("account.label_conf_new_password")}
                          </InputLabel>
                          <OutlinedInput
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            type={
                              showConfPassword.showPassword
                                ? "text"
                                : "password"
                            }
                            label={t<string>("account.label_conf_new_password")}
                            value={formikPassword.values.confirmNewPassword}
                            onChange={formikPassword.handleChange}
                            disabled={!showEditPassword}
                            color="secondary"
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
                            {formikPassword.touched.confirmNewPassword &&
                              formikPassword.errors.confirmNewPassword}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>

                    {showEditPassword ? (
                      <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={12}>
                          <ButtonGroup
                            variant="contained"
                            aria-label="outlined primary button group"
                            style={{ float: "right" }}
                          >
                            <Button
                              color="neutral"
                              variant="outlined"
                              startIcon={<BlockIcon />}
                              onClick={() => setShowEditPassword(false)}
                            >
                              {t<string>("common.label_cancel")}
                            </Button>

                            <LoadingButton
                              color="success"
                              type="submit"
                              loading={loadingPasswordAccountSelector}
                              loadingPosition="start"
                              startIcon={<CheckIcon />}
                              variant="contained"
                              size="small"
                            >
                              {t<string>("account.label_update_password")}
                            </LoadingButton>
                          </ButtonGroup>
                        </Grid>
                      </Grid>
                    ) : null}
                  </Box>
                </form>
              </Paper>
            ) : null}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
