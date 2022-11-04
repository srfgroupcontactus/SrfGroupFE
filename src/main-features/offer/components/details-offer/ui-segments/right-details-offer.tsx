import React from "react";
import Grid from "@mui/material/Grid/Grid";
import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import Typography from "@mui/material/Typography/Typography";
import CardActions from "@mui/material/CardActions/CardActions";
import Button from "@mui/material/Button/Button";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import Avatar from "@mui/material/Avatar/Avatar";
import IconButton from "@mui/material/IconButton/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import MessageIcon from "@mui/icons-material/MessageOutlined";
import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField/TextField";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import { useFormik } from "formik";
import {
  initialValuesAddMessageDetailsOffer,
  validationSchemaAddMessageDetailsOffer,
} from "../validation/initial-values-add-comment-offer";
import { useTranslation } from "react-i18next";
import isEmpty from "lodash/isEmpty";
import { IOffer } from "../../../../../shared/model/offer.model";
import { IUser } from "../../../../../shared/model/user.model";
import {
  convertDateTimeToServer,
  getBaseImageUrl,
  getFullnameUser,
  getUserAvatar, hasUserRole,
} from "../../../../../shared/utils/utils-functions";
import { ALL_APP_ROUTES } from "../../../../../core/config/all-app-routes";
import { TransitionModal } from "../../../../../shared/pages/transition-modal";
import { ListItemButton } from "@mui/material";
import { StyledBadge } from "../../../../../shared/pages/styled-badge";
import CustomShare from "../../../../../shared/components/custom-share/CustomShare";
import Snackbar from "@mui/material/Snackbar";
import ProblemeDeclaration from "../../../../probleme-declaration/components/probleme-declaration";
import { showUnauthorizedModal } from "../../../../../core/config/store/common/slice";
import { useDispatch } from "react-redux";
import VerifiedIcon from '@mui/icons-material/Verified';
import {ROLE_ADMIN, ROLE_SUPER_ADMIN} from "../../../../../shared/constants/constants";

const initialValues = initialValuesAddMessageDetailsOffer;

export default function RightDetailsOffer({
  offerEntity,
  parentCallback,
  currentUser,
  isAuthenticated,
  myFavoriteUser,
  createConversationCallback,
  addSuccessConversation,
  isOnLine,
}: {
  offerEntity: IOffer | undefined;
  parentCallback: any;
  currentUser: IUser;
  isAuthenticated: boolean;
  myFavoriteUser: boolean;
  createConversationCallback: any;
  addSuccessConversation: boolean;
  isOnLine: any;
}) {
  const [messageAlert, setMessageAlert] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [contactWithPhone, setContactWithPhone] = React.useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAddMessageDetailsOffer,
    onSubmit: (values) => {
      sendMessage(values.content);
    },
  });

  const setResetValues = () => {
    formik.setFieldValue("fullName", getFullnameUser(currentUser));
    formik.setFieldValue("email", currentUser.email);
  };

  React.useEffect(() => {
    if (!isEmpty(currentUser)) {
      setResetValues();
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (addSuccessConversation) {
      formik.resetForm();
      setResetValues();
    }
  }, [addSuccessConversation]);

  const sendMessage = (content: string) => {
    const entity = {
      content: content,
      conversation: {
        dateCreated: convertDateTimeToServer(new Date()),
        senderUser: null,
        receiverUser: {
          id: offerEntity?.user?.id,
          email: offerEntity?.user?.email,
        },
      },
    };
    createConversationCallback(entity);
  };

  const [openFavoriteModal, setOpenFavoriteModal] = React.useState(false);
  const handleClickOpenFavoriteModal = (event: any) => {
    event.stopPropagation();
    if (!myFavoriteUser) {
      if (isAuthenticated) {
        setOpenFavoriteModal(true);
      } else {
        dispatch(showUnauthorizedModal({}));
      }
    }
  };
  const handleCloseFavoriteModal = () => {
    setOpenFavoriteModal(false);
  };

  const handleAddFavoriteModal = () => {
    setOpenFavoriteModal(false);
    parentCallback(offerEntity?.user?.id);
  };

  const redirectToPorfile = (userId: number) => {
    setTimeout(() => {
      navigate(ALL_APP_ROUTES.PROFILE + "/" + userId);
    }, 300);
  };

  const getFavoriteUserColor = () => {
    if (myFavoriteUser) {
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
        onClose={handleCloseFavoriteModal}
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
          <Button onClick={handleAddFavoriteModal} color="success">
            {t<string>("common.label_favorite")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const openPositionInGoogleMap = () => {
    console.log("offerEntity ", offerEntity);
    if (!offerEntity?.address) {
      setMessageAlert(t("details_offer.not_address_found_itenarary"));
      setOpenAlert(true);
    } else {
      window.open(
        "https://www.google.com/maps/@35.8235978,10.6309176,15z",
        "_new"
      );
    }
  };

  const openItenraireGoogleMap = () => {
    console.log("offerEntity ", offerEntity);
    if (!offerEntity?.address) {
      setMessageAlert(t("details_offer.not_address_found_itenarary"));
      setOpenAlert(true);
    } else if (!currentUser?.address) {
      setMessageAlert(t("details_offer.miss_address_account"));
      setOpenAlert(true);
    } else {
      window.open(
        "https://www.google.com/maps/dir/" +
          currentUser?.address?.lng +
          "," +
          currentUser?.address?.lng +
          "/" +
          offerEntity?.address?.lng +
          "," +
          offerEntity?.address?.lng +
          "",
        "_new"
      );
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const contactWithFacebookcontactWithFacebook = () => {
    if (!offerEntity?.user?.linkProfileFacebook) {
      setMessageAlert(
        t("details_offer.message_not_link_profile_facebook_exist")
      );
      setOpenAlert(true);
    } else {
      window.open(offerEntity?.user?.linkProfileFacebook, "_new");
    }
  };

  return (
    <Grid item xs={12} sm={12}>
      <Card>
        <Typography paragraph sx={{ m: 2 }}>
          {t<string>("details_offer.about_seller")}
        </Typography>
        <ListItemButton
          onClick={() => redirectToPorfile(offerEntity?.user?.id)}
          sx={{ display: "block" }}
        >
          <CardHeader
            avatar={
              offerEntity ? (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                  color={
                    isOnLine(offerEntity.user?.email) ? "success" : "error"
                  }
                >
                  <Avatar
                    aria-label="recipe"
                    alt={offerEntity.user?.imageUrl}
                    src={getUserAvatar(
                      offerEntity.user?.id,
                      offerEntity.user?.imageUrl,
                      offerEntity.user?.sourceConnectedDevice
                    )}
                    sx={{ border: "1px solid #b9b9b9" }}
                  >
                    {getFullnameUser(offerEntity?.user)?.charAt(0)}
                  </Avatar>
                </StyledBadge>
              ) : null
            }
            action={
              <IconButton
                aria-label="settings"
                sx={{ color: getFavoriteUserColor() }}
                onClick={(event: any) => handleClickOpenFavoriteModal(event)}
                disabled={offerEntity?.user?.id === currentUser?.id}
              >
                <FavoriteIcon />
              </IconButton>
            }
            title={
              hasUserRole(
                  offerEntity?.user?.authorities,
                  ROLE_SUPER_ADMIN
              ) ? <Button color="neutral" size="small" endIcon={<VerifiedIcon fontSize="small" color="error"/>}>
                {getFullnameUser(offerEntity?.user)}
              </Button> :
                  hasUserRole(
                      offerEntity?.user?.authorities,
                      ROLE_ADMIN
                  ) ? <Button color="neutral" size="small" endIcon={<VerifiedIcon fontSize="small" color="success"/>}>
                    {getFullnameUser(offerEntity?.user)}
                  </Button> : <Button color="neutral" size="small">
                    {getFullnameUser(offerEntity?.user)}
                  </Button>
            }
            subheader={offerEntity?.user?.email}
            onClick={() => redirectToPorfile(offerEntity?.user?.id)}
            role="button"
          />
        </ListItemButton>

        {offerEntity?.user?.address ? (
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {offerEntity?.user?.address.city},{" "}
              {offerEntity?.user?.address.country}
            </Typography>
          </CardContent>
        ) : null}

        <CardActions
          disableSpacing
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.74);" }}
        >
          <IconButton
            aria-label="add to favorites"
            sx={{ color: getFavoriteUserColor() }}
            onClick={handleClickOpenFavoriteModal}
            disabled={offerEntity?.user?.id === currentUser?.id}
          >
            <FavoriteIcon />
          </IconButton>

          <CustomShare url="https://github.com/nygardk/react-share/blob/master/demo/Demo.tsx">
            <Box sx={{ color: "#fff" }}>
              <ShareIcon />
            </Box>
          </CustomShare>

          <IconButton sx={{ marginLeft: "auto", color: "#fff" }}>
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        <Grid container item sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ "& > :not(style)": { m: 1 } }}>
              <form onSubmit={formik.handleSubmit}>
                <Typography paragraph className="text-center">
                  {t<string>("details_offer.send_message")}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    id="fullName"
                    name="fullName"
                    color="secondary"
                    label={t<string>("common.label_name")}
                    variant="standard"
                    fullWidth
                    disabled={
                      !(
                        formik.touched.fullName &&
                        Boolean(formik.errors.fullName)
                      )
                    }
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.fullName && Boolean(formik.errors.fullName)
                    }
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end", my: 2 }}>
                  <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id="email"
                    name="email"
                    color="secondary"
                    label={t<string>("common.label_email")}
                    variant="standard"
                    fullWidth
                    disabled={
                      !(formik.touched.email && Boolean(formik.errors.email))
                    }
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <MessageIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    id="content"
                    name="content"
                    color="secondary"
                    label="Message"
                    variant="standard"
                    fullWidth
                    multiline
                    rows={4}
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.content && Boolean(formik.errors.content)
                    }
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                    color="secondary"
                    type="submit"
                    disabled={currentUser.id === offerEntity?.user?.id}
                  >
                    {t<string>("common.label_send")}
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            sx={{ p: 2, borderLeft: "1px solid #cfcbcb;" }}
          >
            <Typography paragraph className="text-center">
              {t<string>("details_offer.contact_with")}
            </Typography>

            <Button
              color="secondary"
              variant="outlined"
              startIcon={<FacebookIcon />}
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => contactWithFacebookcontactWithFacebook()}
            >
              Facebook
            </Button>

            <Button
              color="secondary"
              variant="outlined"
              startIcon={<PhoneIcon />}
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => setContactWithPhone(!contactWithPhone)}
            >
              {contactWithPhone
                ? offerEntity?.user?.phone
                : t<string>("details_offer.show_number")}
            </Button>

            <a
              href={`mailto:${offerEntity?.user?.email}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                color="secondary"
                variant="outlined"
                startIcon={<EmailIcon />}
                fullWidth
                sx={{ mt: 3 }}
              >
                {t<string>("details_offer.send_email")}
              </Button>
            </a>
          </Grid>
        </Grid>
      </Card>

      <Grid container item spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
          <Card onClick={openPositionInGoogleMap}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Découvrir le quartier
              </Typography>
              <div style={{ maxHeight: 400, marginTop: 30 }}>
                <img
                  className="img-fluid"
                  src={getBaseImageUrl(
                    "/assets/images/offer/details-offer/desktop-map-neighbourhood.ext.svg"
                  )}
                  alt="desktop-map-neighbourhood"
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card onClick={openItenraireGoogleMap}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Découvrir le quartier
              </Typography>
              <div style={{ maxHeight: 400, marginTop: 30 }}>
                <img
                  className="img-fluid"
                  src={getBaseImageUrl(
                    "/assets/images/offer/details-offer/desktop-time-of-travel-address.ext.svg"
                  )}
                  alt="desktop-time-of-travel-address"
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container item spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
          <ProblemeDeclaration />
        </Grid>

        <Grid item xs={12} sm={6}>
          <img
              className="full-img-responsive"
              src={getBaseImageUrl(
                  "/assets/images/offer/details-offer/online_shoping_delivery.jpg"
              )}
              alt="desktop-time-of-travel-address"
              style={{borderRadius: 4}}
          />
        </Grid>

      </Grid>

      <div>{renderDialogFavoriteUser()}</div>
      <div>
        <Snackbar
          open={openAlert}
          autoHideDuration={5000}
          onClose={handleCloseAlert}
          message={messageAlert}
        />
      </div>

      {/*<UnauthorizeContentModal*/}
      {/*    isShowing={isShowing}*/}
      {/*    onOpen={open}*/}
      {/*    onClose={close}*/}
      {/*/>*/}
    </Grid>
  );
}
