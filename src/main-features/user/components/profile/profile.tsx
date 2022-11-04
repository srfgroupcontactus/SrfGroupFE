import React from "react";
import { useParams } from "react-router";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import Slide from "@mui/material/Slide/Slide";
import Paper from "@mui/material/Paper/Paper";
import Avatar from "@mui/material/Avatar/Avatar";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import Button from "@mui/material/Button/Button";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import PhoneIcon from "@mui/icons-material/Phone";
import Box from "@mui/material/Box/Box";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import IconButton from "@mui/material/IconButton/IconButton";
import { useFormik } from "formik";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import { useTranslation } from "react-i18next";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  initialValuesAddMessage,
  validationSchemaAddMessage,
} from "../../validation/init-value-add-message";
import {
  convertDateTimeToServer, getBaseImageUrl,
  getFullnameUser,
  getUserAvatar,
  hasUserRole,
} from "../../../../shared/utils/utils-functions";
import { TransitionModal } from "../../../../shared/pages/transition-modal";
import { ALL_APP_ROUTES } from "../../../../core/config/all-app-routes";
import { useDispatch, useSelector } from "react-redux";
import {
  entitiesUserOffers,
  entityCountOffersByUser,
  fetchCountAllOffersByUser,
  fetchOffersByUser,
  loadingEntitiesUserOffers,
  loadingEntityCountOffersByUser,
} from "../../../offer/store/slice";
import {
  allSessionSelector,
  entityProfile,
  fetchProfileUser,
  loadingProfile,
  reportUser,
} from "../../store/slice";
import { ListOffersProfile } from "./ui-segments/ListOffersProfile";
import {
  addConversation,
  loadingConversation,
} from "../../../chat/store/slice";
import {
  addFavoriteUsers,
  addSuccessFavoriteUser, resetFavoriteUsers,
} from "../../../favorite/store/slice";
import ProblemeDeclaration from "../../../probleme-declaration/components/probleme-declaration";
import CardContent from "@mui/material/CardContent/CardContent";
import CardActions from "@mui/material/CardActions/CardActions";
import CustomShare from "../../../../shared/components/custom-share/CustomShare";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import ShareIcon from "@mui/icons-material/Share";
import FlagIcon from "@mui/icons-material/Flag";
import Card from "@mui/material/Card/Card";
import CustomRating from "../../../../shared/components/custom-rating/custom-rating";
import {
  addEventGA,
  AllModulesEventGA,
} from "../../../../shared/providers/google-anaylitics";
import {ROLE_ADMIN, ROLE_SUPER_ADMIN} from "../../../../shared/constants/constants";
import "./profile.scss";
import StatisticOffers from "../../../../shared/components/statistic-offers/statistic-offers";
import { showUnauthorizedModal } from "../../../../core/config/store/common/slice";
import VerifiedIcon from "@mui/icons-material/Verified";

const initialValues = initialValuesAddMessage;

export default function Profile() {
  const [startAnimation, setStartAnimation] = React.useState(false);
  const [openAddMessageModal, setOpenAddMessageModal] = React.useState(false);
  const [openFavoriteModal, setOpenFavoriteModal] = React.useState(false);
  const [openReportUserModal, setOpenReportUserModal] = React.useState(false);
  const [isFavoriteUser, setIsFavoriteUser] = React.useState(false);

  const { id } = useParams<{ id: string }>();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isAuthenticated, currentUser } = useSelector(allSessionSelector);

  const loadingProfileSelector = useSelector(loadingProfile) ?? false;
  const entityProfileSelector = useSelector(entityProfile) ?? {};

  const loadingEntitiesUserOffersSelector =
    useSelector(loadingEntitiesUserOffers) ?? false;
  const entitiesUserOffersSelector = useSelector(entitiesUserOffers) ?? [];

  const loadingConversationSelector = useSelector(loadingConversation) ?? false;

  const addSuccessFavoriteUserSelector =
    useSelector(addSuccessFavoriteUser) ?? false;

  const loadingEntityCountOffersByUserSelector =
    useSelector(loadingEntityCountOffersByUser) ?? false;
  const entityCountOffersByUserSelector =
    useSelector(entityCountOffersByUser) ?? false;

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAddMessage,
    onSubmit: (values) => {
      if (
        currentUser.id !== entityProfileSelector?.user?.id &&
        isAuthenticated
      ) {
        sendMessage(values.content);
      }
    },
  });

  const sendMessage = (content: string) => {
    const entity = {
      content: content,
      conversation: {
        dateCreated: convertDateTimeToServer(new Date()),
        senderUser: null,
        receiverUser: {
          id: entityProfileSelector?.user?.id,
          email: entityProfileSelector?.user?.email,
        },
      },
    };
    dispatch(addConversation({ ...entity }));
    setOpenAddMessageModal(false);
  };

  React.useEffect(() => {
    if (entityProfileSelector) {
      setIsFavoriteUser(entityProfileSelector?.myFavoriteUser || false);

      setTimeout(() => {
        setStartAnimation(true);
      }, 100);
    }
  }, [entityProfileSelector]);

  React.useEffect(() => {
    if (id) {
      dispatch(
        fetchProfileUser({
          userId: Number(id),
        })
      );

      dispatch(
        fetchCountAllOffersByUser({
          userId: Number(id),
        })
      );

      dispatch(
        fetchOffersByUser({
          page: 0,
          size: 20,
          queryParams: "",
          userId: Number(id),
        })
      );
    }
  }, [id]);

  const handleClickOpenAddMessageModal = () => {
    if (isAuthenticated) {
      formik.setFieldValue("content", "");
      setOpenAddMessageModal(true);
    } else {
      // open();
      dispatch(showUnauthorizedModal({}));
    }
  };

  const handleClickCancelAddMessageModal = () => {
    formik.setFieldValue("content", "");
    setOpenAddMessageModal(false);
  };

  const renderDialogAddMessage = () => {
    return (
      <React.Fragment>
        <Dialog
          open={openAddMessageModal}
          TransitionComponent={TransitionModal}
          keepMounted
          onClose={handleClickCancelAddMessageModal}
          aria-describedby="alert-dialog-slide-description"
        >
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>{t<string>("profile.title_send_message")}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {getFullnameUser(currentUser)}
              </DialogContentText>
              <FormControl
                fullWidth
                sx={{ mt: 3, minWidth: { sx: "auto", md: 400 } }}
                error={formik.touched.content && Boolean(formik.errors.content)}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  {t<string>("profile.write_your_message")}
                </InputLabel>
                <OutlinedInput
                  id="content"
                  name="content"
                  label={t<string>(
                    "entityProfileSelector?.user?.write_your_message"
                  )}
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  size="small"
                  multiline
                  maxRows={4}
                  rows={4}
                />
                <FormHelperText id="component-helper-text">
                  {formik.touched.content && formik.errors.content}
                </FormHelperText>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClickCancelAddMessageModal}
                color="neutral"
              >
                {t<string>("common.label_cancel")}
              </Button>
              <LoadingButton
                loading={loadingConversationSelector}
                type="submit"
                color="success"
              >
                {t<string>("common.label_send")}
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    );
  };

  React.useEffect(() => {
    if (addSuccessFavoriteUserSelector) {
      dispatch(resetFavoriteUsers({}));
      setIsFavoriteUser(true);
    }
  }, [addSuccessFavoriteUserSelector]);

  const handleCloseFavoriteModal = () => {
    setOpenFavoriteModal(false);
  };

  const handleAddFavoriteModal = () => {
    if (
      !isFavoriteUser &&
      entityProfileSelector?.user?.id !== currentUser?.id
    ) {
      if (isAuthenticated) {
        setOpenFavoriteModal(true);
      } else {
        open();
      }
    }
  };
  const handleClickOpenFavoriteModal = (event: any) => {
    if (isAuthenticated && !entityProfileSelector.myFavoriteUser) {
      setOpenFavoriteModal(true);
      const entity = {
        favoriteUser: {
          id: entityProfileSelector?.user?.id,
        },
        favoriteDate: convertDateTimeToServer(new Date()),
      };
      dispatch(addFavoriteUsers({ ...entity }));
      setOpenFavoriteModal(false);
    }
  };

  const getFavoriteUserColor = () => {
    if (isFavoriteUser) {
      return "#f75306";
    }
    return "color: rgba(0, 0, 0, 0.54)";
  };

  const renderDialogFavoriteUser = () => {
    return (
      <Dialog
        open={openFavoriteModal}
        TransitionComponent={TransitionModal}
        keepMounted
        onClose={() => setOpenFavoriteModal(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {t<string>("details_offer.title_add_favrite_user")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t<string>("details_offer.description_add_favrite_user")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFavoriteModal} color="neutral">
            {t<string>("common.label_cancel")}
          </Button>
          <Button onClick={handleClickOpenFavoriteModal} color="success">
            {t<string>("common.label_favorite")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleOpenReportUserModal = () => {
    if (isAuthenticated) {
      setOpenReportUserModal(true);
    } else {
      open();
    }
  };
  const handleClickReportUserModal = () => {
    setOpenReportUserModal(false);
    dispatch(reportUser(entityProfileSelector?.user?.id));
  };
  const renderDialogReportUser = () => {
    return (
      <Dialog
        open={openReportUserModal}
        TransitionComponent={TransitionModal}
        keepMounted
        onClose={() => setOpenReportUserModal(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{t<string>("profile.report_user")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t<string>("profile.description_report_user")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReportUserModal(false)} color="neutral">
            {t<string>("common.label_cancel")}
          </Button>
          <Button onClick={handleClickReportUserModal} color="error">
            {t<string>("common.label_report")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const addNewEventGA = () => {
    addEventGA(
      AllModulesEventGA.EventUser.Profile.eventName,
      AllModulesEventGA.EventUser.Profile.eventCategory,
      AllModulesEventGA.EventUser.Profile.eventLabel
    );
  };

  return (
    <Box>
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
              <Link color="inherit" to="/getting-started/installation/">
                {t<string>("profile.title_page_profile")}
              </Link>
              <Typography color="text.primary">
                {getFullnameUser(entityProfileSelector?.user)}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={4}
          style={{
            paddingTop: 50,
          }}
        >
          <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
            <Slide direction="left" in={startAnimation}>
              <Box>
                <Paper elevation={3} sx={{ p: 1 }}>
                  <Avatar
                    alt={entityProfileSelector?.user?.imageUrl}
                    src={getUserAvatar(
                      entityProfileSelector?.user?.id,
                      entityProfileSelector?.user?.imageUrl,
                      entityProfileSelector?.user?.sourceConnectedDevice
                    )}
                    sx={{
                      width: 80,
                      height: 80,
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginBottom: 2,
                      mt: 2,
                      border: "1px solid #b9b9b9",
                    }}
                  >
                    {getFullnameUser(entityProfileSelector?.user)?.charAt(0)}
                  </Avatar>
                  <h4>
                    {loadingProfileSelector ? (
                      <Skeleton animation="wave" height={30} />
                    ) : (
                      <React.Fragment>
                        {getFullnameUser(entityProfileSelector)}
                      </React.Fragment>
                    )}
                  </h4>

                  {
                    hasUserRole(
                        entityProfileSelector?.user?.authorities,
                        ROLE_SUPER_ADMIN
                    ) ? <Button color="neutral" size="small" endIcon={<VerifiedIcon fontSize="small" color="error"/>}>
                          Super Admin
                        </Button> :
                        hasUserRole(
                            entityProfileSelector?.user?.authorities,
                            ROLE_ADMIN
                        ) ? <Button color="neutral" size="small" endIcon={<VerifiedIcon fontSize="small" color="success"/>}>
                          Admin
                        </Button> : null
                  }

                  <Toolbar sx={{ justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      startIcon={<PhoneIcon />}
                      color="secondary"
                      size="small"
                      onClick={() => handleClickOpenAddMessageModal()}
                      disabled={
                        currentUser.id === entityProfileSelector?.user?.id
                      }
                    >
                      {t<string>("profile.send_message")}
                    </Button>
                  </Toolbar>

                  <Toolbar sx={{ justifyContent: "center" }}>
                    <Button
                      variant="outlined"
                      startIcon={
                        <FavoriteIcon sx={{ color: getFavoriteUserColor() }} />
                      }
                      color="secondary"
                      size="small"
                      onClick={() => handleAddFavoriteModal()}
                      disabled={
                        isFavoriteUser ||
                        entityProfileSelector?.user?.id === currentUser?.id
                      }
                    >
                      {t<string>("profile.favorite_user")}
                    </Button>
                  </Toolbar>
                </Paper>
              </Box>
            </Slide>

            {!loadingProfileSelector ? (
              <Box>
                <Card sx={{ my: 3 }}>
                  <CardContent>
                    <CustomRating />
                  </CardContent>
                  <CardActions disableSpacing>
                    <CustomShare url="https://github.com/nygardk/react-share/blob/master/demo/Demo.tsx">
                      <Tooltip
                        title={
                          <React.Fragment>
                            {t<string>("common.label_share")}
                          </React.Fragment>
                        }
                      >
                        <ShareIcon onClick={addNewEventGA} />
                      </Tooltip>
                    </CustomShare>

                    {!hasUserRole(
                      entityProfileSelector?.user?.authorities,
                      ROLE_SUPER_ADMIN
                    ) ? (
                      <IconButton
                        sx={{ marginLeft: "auto" }}
                        color="error"
                        onClick={() => handleOpenReportUserModal()}
                      >
                        <Tooltip
                          title={
                            <React.Fragment>
                              {t<string>("common.label_report")}
                            </React.Fragment>
                          }
                        >
                          <FlagIcon />
                        </Tooltip>
                      </IconButton>
                    ) : null}
                  </CardActions>
                </Card>

                {!loadingEntityCountOffersByUserSelector ? (
                  <Box>
                    <StatisticOffers
                      countOffersByUser={entityCountOffersByUserSelector}
                    />
                  </Box>
                ) : null}

                <Box sx={{ my: 3 }}>{<ProblemeDeclaration />}</Box>

                <Box sx={{display: { xs: "none", md: "block" }}}>
                  <img
                      className="full-img-responsive"
                      src={getBaseImageUrl(
                          "/assets/images/offer/details-offer/online_shoping_digital.jpg"
                      )}
                      alt="desktop-time-of-travel-address"
                      style={{borderRadius: 4}}
                  />
                </Box>
              </Box>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Slide direction="right" in={startAnimation}>
              <div>
                <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                  <Box sx={{ mt: 2 }}>
                    <h5>Personal Details</h5>
                    <List sx={{ bgcolor: "background.paper" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary="Firstname"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {/*Ali Connors*/}
                                  </Typography>
                                  {loadingProfileSelector ? (
                                    <Skeleton animation="wave" height={30} />
                                  ) : (
                                    entityProfileSelector?.user?.firstName
                                  )}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary="Lastname"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {/*Ali Connors*/}
                                  </Typography>
                                  {loadingProfileSelector ? (
                                    <Skeleton animation="wave" height={30} />
                                  ) : (
                                    entityProfileSelector?.user?.lastName
                                  )}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary="Email"
                              secondary={
                                <React.Fragment>
                                  {loadingProfileSelector ? (
                                    <Skeleton animation="wave" height={30} />
                                  ) : (
                                    entityProfileSelector?.user?.email
                                  )}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem
                            alignItems="flex-start"
                            secondaryAction={
                              <PhoneIcon
                                  onClick={() =>
                                      getUserAvatar(
                                          entityProfileSelector?.user?.id,
                                          entityProfileSelector?.user?.imageUrl,
                                          entityProfileSelector?.user
                                              ?.sourceConnectedDevice
                                      )
                                  }
                              />
                            }
                          >
                            <ListItemText
                              primary="Phone number"
                              secondary={
                                <React.Fragment>
                                  {loadingProfileSelector ? (
                                    <Skeleton animation="wave" height={30} />
                                  ) : (
                                    entityProfileSelector?.user?.phone
                                  )}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary="Adresse"
                              secondary={
                                <React.Fragment>
                                  {loadingProfileSelector ? (
                                    <Skeleton animation="wave" height={30} />
                                  ) : entityProfileSelector?.user?.address ? (
                                    entityProfileSelector?.user?.address?.city +
                                    ", " +
                                    entityProfileSelector?.user?.address
                                      ?.country
                                  ) : null}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary={t<string>(
                                "profile.label_link_profile_facebook"
                              )}
                              secondary={
                                <React.Fragment>
                                  <a
                                    href={
                                      entityProfileSelector?.user
                                        ?.linkProfileFacebook || ""
                                    }
                                    target={"_blank"}
                                    rel="noreferrer"
                                  >
                                    Facebook
                                  </a>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </Grid>
                      </Grid>
                    </List>
                  </Box>
                </Paper>

                <ListOffersProfile
                  listOffers={entitiesUserOffersSelector}
                  loading={loadingEntitiesUserOffersSelector}
                />
              </div>
            </Slide>
          </Grid>
        </Grid>
      </Container>
      {renderDialogAddMessage()}
      {renderDialogFavoriteUser()}
      {renderDialogReportUser()}

      {/*<UnauthorizeContentModal*/}
      {/*    isShowing={isShowing}*/}
      {/*    onOpen={open}*/}
      {/*    onClose={close}*/}
      {/*/>*/}
    </Box>
  );
}
