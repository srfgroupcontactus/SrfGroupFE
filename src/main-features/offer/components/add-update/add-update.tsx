import React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid/Grid";
import Container from "@mui/material/Container/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import Paper from "@mui/material/Paper/Paper";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select/Select";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import ImageList from "@mui/material/ImageList/ImageList";
import ImageListItem from "@mui/material/ImageListItem/ImageListItem";
import IconButton from "@mui/material/IconButton/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Accordion from "@mui/material/Accordion/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import { useFormik } from "formik";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import Button from "@mui/material/Button/Button";
import Slide from "@mui/material/Slide/Slide";
import isEmpty from "lodash/isEmpty";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Box from "@mui/material/Box/Box";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "./add-update.scss";
import {
  initialValuesAddOffer,
  setDefaultsValues,
  validationSchemaAddOffer,
} from "./validation/init-value-add-offer";
import { ALL_APP_ROUTES } from "../../../../core/config/all-app-routes";
import { allSessionSelector } from "../../../user/store/slice";
import { IOfferImages } from "../../../../shared/model/offer-images.model";
import { entitiesCategory } from "../../../category/store/slice";
import {
  allAddressSelector,
  entitiesAddress,
} from "../../../address/store/slice";
import {
  convertDateTimeToServer,
  dataUrlToFile, getBase64,
  getBaseImageUrl,
  getImageForOffer,
} from "../../../../shared/utils/utils-functions";
import { TypeOfferEnum } from "../../../../shared/enums/type-offer.enum";
import { AllAppConfig } from "../../../../core/config/all-config";
import { getImageUrl } from "../../../../shared/utils/image-url";
import { TransitionModal } from "../../../../shared/pages/transition-modal";
import {
  addEventGA,
  AllModulesEventGA,
} from "../../../../shared/providers/google-anaylitics";
import {
  addFindOffer,
  addRentOffer,
  addSellerOffer,
  addSuccessFindOffer,
  addSuccessRentOffer,
  addSuccessSellerOffer,
  entityFindOffer,
  entityPublicOffer,
  entityRentOffer,
  entitySellerOffer,
  resetFindOffer,
  resetRentOffer,
  resetSellerOffer,
  updateSuccessFindOffer,
  updateSuccessRentOffer,
  updateSuccessSellerOffer,
  updateSellerOffer,
  updateRentOffer,
  loadingPublicOffer,
  loadingSellerOffer,
  loadingRentOffer,
  loadingFindOffer,
  resetPublicOffers,
  updateFindOffer,
  uploadFilesOffer,
  loadingImagesDescriptionNewOffer,
  entityDescriptionNewOffer,
  fetchDescriptionNewOffer,
  fetchOffer,
  entityMyOffers,
} from "../../store/slice";
import { CustomSunEditor } from "../../../../shared/components/sun-editor/CustomSunEditor";
import OptionsCommonAddOffer from "./ui-segments/ooptions-common-add-offer";
import OptionsSellAddOffer from "./ui-segments/options-sell-add-offer";
import OptionsRentAddOffer from "./ui-segments/options-rent-add-offer";
import OptionsFindAddOffer from "./ui-segments/options-find-add-offer";
import { showUnauthorizedModal } from "../../../../core/config/store/common/slice";

interface initStateFiles {
  selectedFiles: string[];
  progress: number;
  message: string;
  fileInfos: string[];
}

const defaultValueFiles: initStateFiles = {
  selectedFiles: [],
  progress: 0,
  message: "",
  fileInfos: [],
};

const defaultValueOriginalListFiles: File[] = [];

const initialValues = initialValuesAddOffer;

export default function AddUpdate() {
  const [startAnimation, setStartAnimation] = React.useState(false);
  const [fileState, setFileState] = React.useState(defaultValueFiles);
  const [originalListFiles, setOriginalListFiles] = React.useState(
      defaultValueOriginalListFiles
  );
  const [openDeleteImageOfferModal, setOpenDeleteImageOfferModal] =
      React.useState(false);
  const [indexDeleteImageOffer, setIndexDeleteImageOffer] = React.useState(-1);
  const [defaultLanguage, setDefaultLanguage] = React.useState("fr");

  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    isAuthenticated,
    currentUser
  } = useSelector(allSessionSelector);
  const entitiesCategorySelector = useSelector(entitiesCategory) ?? [];
  const entitiesAddressSelector = useSelector(entitiesAddress) ?? [];

  const entityPublicOfferSelector = useSelector(entityPublicOffer) ?? {};
  const loadingPublicOfferSelector = useSelector(loadingPublicOffer) ?? {};

  const loadingSellerOfferSelector = useSelector(loadingSellerOffer) ?? false;
  const entitySellerOfferSelector = useSelector(entitySellerOffer) ?? {};
  const updateSuccessSellerOfferSelector =
      useSelector(updateSuccessSellerOffer) ?? false;
  const addSuccessSellerOfferSelector =
      useSelector(addSuccessSellerOffer) ?? false;

  const loadingRentOfferSelector = useSelector(loadingRentOffer) ?? false;
  const entityRentOfferSelector = useSelector(entityRentOffer) ?? {};
  const addSuccessRentOfferSelector = useSelector(addSuccessRentOffer) ?? false;
  const updateSuccessRentOfferSelector =
      useSelector(updateSuccessRentOffer) ?? false;

  const loadingFindOfferSelector = useSelector(loadingFindOffer) ?? false;
  const entityFindOfferSelector = useSelector(entityFindOffer) ?? {};
  const aaddSuccessFindOfferSelector =
      useSelector(addSuccessFindOffer) ?? false;
  const updateSuccessFindOfferSelector =
      useSelector(updateSuccessFindOffer) ?? false;

  const entityMyOffersSelector = useSelector(entityMyOffers) ?? {};

  const loadingImagesDescriptionNewOfferSelector =
      useSelector(loadingImagesDescriptionNewOffer) ?? false;
  const entityDescriptionNewOfferSelector =
      useSelector(entityDescriptionNewOffer) ?? {};

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAddOffer,
    onSubmit: (values) => {
      if (isAuthenticated) {
        saveEntity(values);
      } else {
        // open();
        dispatch(showUnauthorizedModal({}));
      }
    },
  });

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (id) {
      // For update
      console.log("id updte ", id);
      dispatch(fetchOffer({ id: id }));
    } else {
      // For new offer
      formik.resetForm();
      setFileState(defaultValueFiles);
      dispatch(resetPublicOffers({}));
    }
  }, [id]);

  React.useEffect(() => {
    console.log("entityMyOffersSelector ", entityMyOffersSelector);
    if (!isEmpty(entityMyOffersSelector) && id) {
      // For update

      // Defult values
      setDefaultsValues(formik, entityMyOffersSelector);

      setFileState({
        ...fileState,
        selectedFiles:
            entityMyOffersSelector?.offerImages &&
            entityMyOffersSelector?.offerImages.length > 0
                ? entityMyOffersSelector?.offerImages.map(
                (imgOffer: IOfferImages) => {
                  return (imgOffer.path = getImageForOffer(
                      entityMyOffersSelector?.id,
                      imgOffer?.path
                  ));
                }
                )
                : [], // event.target.files
      });
    }
  }, [entityMyOffersSelector]);

  React.useEffect(() => {
    i18n.on("languageChanged", (lang: any) => {
      setDefaultLanguage(lang);
    });

    setTimeout(() => {
      setStartAnimation(true);
    }, 300);

    if (isEmpty(entityDescriptionNewOfferSelector)) {
      dispatch(fetchDescriptionNewOffer({}));
    }

    // props.getPublicEntity();
  }, []);

  React.useEffect(() => {
    if (!isEmpty(entityPublicOfferSelector) && id) {
      // For update

      // Defult values
      setDefaultsValues(formik, entityPublicOfferSelector);

      setFileState({
        ...fileState,
        selectedFiles:
            entityPublicOfferSelector?.offerImages &&
            entityPublicOfferSelector?.offerImages.length > 0
                ? entityPublicOfferSelector?.offerImages.map(
                (imgOffer: IOfferImages) => {
                  return (imgOffer.path = getImageForOffer(
                      entityPublicOfferSelector?.id,
                      imgOffer?.path
                  ));
                }
                )
                : [], // event.target.files
      });
    }
  }, [entityPublicOfferSelector]);

  React.useEffect(() => {
    if (addSuccessSellerOfferSelector || updateSuccessSellerOfferSelector) {
      const offerId: number = entitySellerOfferSelector?.id || -1;
      upladAllFiles(offerId);
      dispatch(resetSellerOffer({}));
      navigate(ALL_APP_ROUTES.OFFER.MY_OFFERS);
    } else if (addSuccessRentOfferSelector || updateSuccessRentOfferSelector) {
      const offerId: number = entityRentOfferSelector?.id || -1;
      upladAllFiles(offerId);
      dispatch(resetRentOffer({}));
      navigate(ALL_APP_ROUTES.OFFER.MY_OFFERS);
    } else if (aaddSuccessFindOfferSelector || updateSuccessFindOfferSelector) {
      const offerId: number = entityFindOfferSelector?.id || -1;
      upladAllFiles(offerId);
      dispatch(resetFindOffer({}));
      navigate(ALL_APP_ROUTES.OFFER.MY_OFFERS);
    }
  }, [
    addSuccessSellerOfferSelector,
    updateSuccessSellerOfferSelector,
    addSuccessRentOfferSelector,
    updateSuccessRentOfferSelector,
    aaddSuccessFindOfferSelector,
    updateSuccessFindOfferSelector,
  ]);

  const saveEntity = (values: any) => {
    const tempOfferImages: any[] = [];
    originalListFiles.forEach((item: any) => {
      tempOfferImages.push({
        path: item?.name,
        // dateCreated: convertDateTimeToServer(new Date()),
      });
    });

    const entity = {
      ...entityMyOffersSelector,
      // dateCreated: convertDateTimeToServer(new Date()),
      ...values,
      // user: {
      //   id: currentUser.id,
      // },
      offerImages: tempOfferImages.slice(),
    };

    // Set address if defined
    if (values?.address) {
      entity.address = {
        id: values?.address?.id,
        city: values?.address?.city,
      };
    }

    // Set category if defined
    if (values?.category) {
      entity.category = {
        id: values?.category?.id,
      };
    }

    // For Rent
    if (entity.startDate && entity.endDate) {
      entity.startDate = convertDateTimeToServer(entity.startDate);
      entity.endDate = convertDateTimeToServer(entity.endDate);
    }

    if (!id) {
      if (formik.values.typeOffer === TypeOfferEnum.Sell) {
        dispatch(addSellerOffer({ ...entity }));
        // props.createEntitySellerOffer(entity);
      } else if (formik.values.typeOffer === TypeOfferEnum.Rent) {
        dispatch(addRentOffer({ ...entity }));
        // props.createEntityRentOffer(entity);
      } else if (formik.values.typeOffer === TypeOfferEnum.Find) {
        dispatch(addFindOffer({ ...entity }));
        // props.createEntityFindOffer(entity);
      }
    } else {
      if (formik.values.typeOffer === TypeOfferEnum.Sell) {
        dispatch(updateSellerOffer({ ...entity }));
        // props.updateEntitySell(entity);
      } else if (formik.values.typeOffer === TypeOfferEnum.Rent) {
        dispatch(updateRentOffer({ ...entity }));
        // props.updateEntityRent(entity);
      } else if (formik.values.typeOffer === TypeOfferEnum.Find) {
        dispatch(updateFindOffer({ ...entity }));
        // props.updateEntityFind(entity);
      }
    }
  };

  const selectFile = (event: any) => {
    if (
        event.target.files &&
        event.target.files.length <= AllAppConfig.MaxNbeImagePerOffer
    ) {
      const newSelectedFiles: string[] = [];
      const newOrigSelectedFiles: File[] = [];

      Array.from(event.target.files).forEach((file: any) => {
        // getImageUrl(file, 5000)
        getBase64(file)
            .then((resultBase64: any) => {
              dataUrlToFile(resultBase64, file.name).then((valueFile: any) => {
                newOrigSelectedFiles.push(valueFile);
              });
              newSelectedFiles.push(resultBase64);

              setFileState({
                ...fileState,
                selectedFiles: newSelectedFiles.slice(), // event.target.files
              });

              // Set all files
              setOriginalListFiles(newOrigSelectedFiles);
           });
      });
    } else {
      alert("Ouups, max number is 5");
    }
  };

  const upladAllFiles = (offerId: number) => {
    if (originalListFiles.length) {
      const formData = new FormData();
      for (const file of originalListFiles) {
        formData.append("files", file, file.name);
        formData.append("offerId", offerId.toString());
      }
      dispatch(
          uploadFilesOffer({
            formData,
          })
      );
    }
  };

  const handleClickDeleteImageOffer = () => {
    setOpenDeleteImageOfferModal(false);
    fileState.selectedFiles.splice(indexDeleteImageOffer, 1);
  };

  const handleClickCancelDeleteImageOfferModal = () => {
    setOpenDeleteImageOfferModal(false);
  };

  const handleClickOpenDeleteOffertModal = (index: number) => {
    setIndexDeleteImageOffer(index);
    setOpenDeleteImageOfferModal(true);
  };

  const renderDialogDeleteImageOffer = () => {
    return (
        <Dialog
            open={openDeleteImageOfferModal}
            TransitionComponent={TransitionModal}
            keepMounted
            onClose={handleClickCancelDeleteImageOfferModal}
            aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{t<string>("add_offer.confirm_delete_image")}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {t<string>("add_offer.message_confirm_delete_image")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickCancelDeleteImageOfferModal}>
              {t<string>("common.label_cancel")}
            </Button>
            <Button onClick={handleClickDeleteImageOffer} color="error">
              {t<string>("common.label_delete")}
            </Button>
          </DialogActions>
        </Dialog>
    );
  };

  const onChangeValue = (newValue: any) => {
    formik.setFieldValue("description", newValue ? newValue : "");
  };

  const addNewEventGA = () => {
    addEventGA(
        AllModulesEventGA.EventOffer.ShowMoreOption.eventName,
        AllModulesEventGA.EventOffer.ShowMoreOption.eventCategory,
        AllModulesEventGA.EventOffer.ShowMoreOption.eventLabel
    );
  };

  const getContentDescriptionAddOffer = () => {
    if (defaultLanguage === "en") {
      return entityDescriptionNewOfferSelector?.descriptionEn || "";
    } else if (defaultLanguage === "fr") {
      return entityDescriptionNewOfferSelector?.descriptionFr || "";
    }
    return entityDescriptionNewOfferSelector?.descriptionAr || "";
  };

  return (
      <Slide direction="up" in={startAnimation} mountOnEnter unmountOnExit>
        <Container maxWidth="xl" className="page-add-offer">
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
                  {t<string>("add_offer.title_page")}
                </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ p: 2, mt: 6 }}>
                {loadingPublicOfferSelector ? (
                    <Box sx={{ pt: 10, pb: 10, textAlign: "center" }}>
                      <CircularProgress color="inherit" />
                    </Box>
                ) : (
                    <Box>
                      <h3 className="mb-3">
                        {t<string>("add_offer.label_publish_new_offer")}
                      </h3>
                      <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} md={6}>
                            <FormControl
                                fullWidth
                                size="small"
                                error={
                                  formik.touched.typeOffer &&
                                  Boolean(formik.errors.typeOffer)
                                }
                                className="form-control-type-offer"
                            >
                              <InputLabel
                                  id="label-component-helper-typeOffer"
                                  className="type-offer-select"
                                  color="secondary"
                              >
                                {t<string>("add_offer.label_type_offer")}
                              </InputLabel>
                              <Select
                                  id="typeOffer"
                                  name="typeOffer"
                                  color="secondary"
                                  label={t<string>("add_offer.label_type_offer")}
                                  labelId="add_offer.label_type_offer"
                                  value={formik.values.typeOffer}
                                  onChange={formik.handleChange}
                              >
                                <MenuItem value={TypeOfferEnum.Sell}>
                                  {t<string>("common.for_sell")}
                                </MenuItem>
                                <MenuItem value={TypeOfferEnum.Rent}>
                                  {t<string>("common.for_rent")}
                                </MenuItem>
                                <MenuItem value={TypeOfferEnum.Find}>
                                  {t<string>("common.for_find")}
                                </MenuItem>
                              </Select>
                              {formik.touched.typeOffer &&
                              formik.errors.typeOffer ? (
                                  <FormHelperText id="component-helper-text-typeOffer">
                                    {t<string>(formik.errors.typeOffer)}
                                  </FormHelperText>
                              ) : null}
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <FormControl
                                fullWidth
                                size="small"
                                error={
                                  formik.touched.title && Boolean(formik.errors.title)
                                }
                            >
                              <InputLabel htmlFor="outlined-adornment-title" color="secondary">
                                {t<string>("add_offer.label_title_offer")}
                              </InputLabel>
                              <OutlinedInput
                                  id="title"
                                  name="title"
                                  color="secondary"
                                  label={t<string>("add_offer.label_title_offer")}
                                  value={formik.values.title}
                                  onChange={formik.handleChange}
                                  autoComplete="off"
                              />
                              {formik.touched.title && formik.errors.title ? (
                                  <FormHelperText id="component-helper-text">
                                    {t<string>(formik.errors.title)}
                                  </FormHelperText>
                              ) : null}
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} md={12}>
                            <FormControl
                                fullWidth
                                sx={{ mt: 3 }}
                                error={
                                  formik.touched.description &&
                                  Boolean(formik.errors.description)
                                }
                            >
                              <CustomSunEditor
                                  defaultValue={
                                    entityMyOffersSelector?.description || ""
                                  }
                                  callbcakHandleChange={onChangeValue}
                                  placeholder={t<string>(
                                      "add_offer.placeholder_description"
                                  )}
                              />
                              {formik.touched.description &&
                              formik.errors.description ? (
                                  <FormHelperText id="component-helper-text">
                                    {t<string>(formik.errors.description)}
                                  </FormHelperText>
                              ) : null}
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} md={12} sx={{ mb: 3 }}>

                            <ImageList
                                sx={{ width: "100%", height: "auto", mb: 0 }}
                                cols={5} >
                                {fileState?.selectedFiles.map((file, index) => (
                                    <ImageListItem
                                        key={index}
                                        style={{
                                          marginRight: 4,
                                          borderRadius: 4,
                                          height: 80,
                                          width: 80
                                        }}
                                    >
                                      <img
                                          src={file}
                                          srcSet={file}
                                          alt={"desc_" + index}
                                          loading="lazy"
                                          style={{
                                            borderRadius: 4,
                                            border: "1px solid #b7b1b1",
                                            maxHeight: '100%',
                                            objectFit: 'unset'
                                          }}
                                      />
                                      <IconButton
                                          size="small"
                                          aria-label="delete"
                                          color="error"
                                          sx={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            backgroundColor: "#fff",
                                          }}
                                          onClick={() =>
                                              handleClickOpenDeleteOffertModal(index)
                                          }
                                      >
                                        <ClearIcon />
                                      </IconButton>
                                    </ImageListItem>
                                ))}
                            </ImageList>

                          </Grid>
                          <Grid item xs={12} md={12} sx={{ mb: 3 }}>
                            <Button variant="outlined" color={"neutral"} fullWidth startIcon={<CameraEnhanceIcon />} className="submit-add-form">
                              <input
                                  id="offer-addFiles"
                                  data-cy="files"
                                  type="file"
                                  name="files"
                                  style={{
                                    position: "absolute",
                                    maxWidth: "100%",
                                    top: 0,
                                    bottom: 0,
                                    opacity: 0,
                                  }}
                                  multiple
                                  accept="image/png, image/gif, image/jpeg, image/jpg"
                                  onChange={selectFile}
                              />
                              Image
                            </Button>

                          </Grid>

                          <Grid item xs={12} md={12}>
                            <Accordion sx={{ width: "100%" }}>
                              <AccordionSummary
                                  expandIcon={
                                    <ExpandMoreIcon
                                        sx={{
                                          backgroundColor: "secondary",
                                          borderRadius: "50%",
                                        }}
                                    />
                                  }
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                  className="bg-yellow"
                                  onClick={() => addNewEventGA()}
                              >
                                <ArrowCircleRightIcon
                                    className="zoom-in-out-box"
                                    color="secondary"
                                    sx={{ mr: 1 }}
                                />
                                <Typography sx={{ textDecoration: "underline" }}>
                                  {t<string>("add_offer.label_more_options")}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails sx={{ pt: 4 }}>
                                {formik.values.typeOffer ? (
                                    <OptionsCommonAddOffer
                                        formik={formik}
                                        cities={entitiesAddressSelector}
                                        listCategories={entitiesCategorySelector}
                                    />
                                ) : null}

                                {formik.values.typeOffer === TypeOfferEnum.Sell ? (
                                    <OptionsSellAddOffer formik={formik} />
                                ) : formik.values.typeOffer ===
                                TypeOfferEnum.Rent ? (
                                    <OptionsRentAddOffer formik={formik} />
                                ) : formik.values.typeOffer ===
                                TypeOfferEnum.Find ? (
                                    <OptionsFindAddOffer formik={formik} />
                                ) : (
                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                    >
                                      {t<string>("add_offer.label_select_offer_plz")}
                                    </Typography>
                                )}
                              </AccordionDetails>
                            </Accordion>
                          </Grid>

                          <Grid item xs={12} md={12}>
                            <LoadingButton
                                loading={
                                  loadingSellerOfferSelector === true ||
                                  loadingRentOfferSelector === true ||
                                  loadingFindOfferSelector === true
                                }
                                fullWidth
                                variant="contained"
                                color="secondary"
                                type="submit"
                                sx={{ mt: 3, mb: 2 }}
                            >
                              {id
                                  ? t<string>("add_offer.label_update_offer")
                                  : t<string>("add_offer.label_add_offer")}
                            </LoadingButton>
                          </Grid>

                          <Typography
                              variant="subtitle2"
                              color="error"
                              sx={{ textAlign: "center", width: "100%" }}
                          >
                            {!formik.isValid
                                ? t<string>("add_offer.check_required_fileds")
                                : null}
                          </Typography>
                        </Grid>
                      </form>
                    </Box>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ p: 2, mt: 6 }}>
              {loadingImagesDescriptionNewOfferSelector ? (
                  <Box sx={{ textAlign: "center" }}>
                    <CircularProgress color="inherit" />
                  </Box>
              ) : (
                  <div
                      dangerouslySetInnerHTML={{
                        __html: getContentDescriptionAddOffer(),
                      }}
                  ></div>
              )}
            </Grid>
          </Grid>

          <div>{renderDialogDeleteImageOffer()}</div>

          {/*<UnauthorizeContentModal*/}
          {/*    isShowing={isShowing}*/}
          {/*    onOpen={open}*/}
          {/*    onClose={close}*/}
          {/*/>*/}
        </Container>
      </Slide>
  );
}
