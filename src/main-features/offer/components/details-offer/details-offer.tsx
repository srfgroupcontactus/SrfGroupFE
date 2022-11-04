import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router";
import Zoom from "@mui/material/Zoom/Zoom";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography/Typography";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import Box from "@mui/material/Box/Box";
import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddLocation from "@mui/icons-material/AddLocation";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import CardActions from "@mui/material/CardActions/CardActions";
import Button from "@mui/material/Button/Button";
import FlagIcon from "@mui/icons-material/Flag";
import IconButton from "@mui/material/IconButton/IconButton";
import ShareIcon from "@mui/icons-material/Share";

import "./details-offer.scss";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import { useTranslation } from "react-i18next";
import AccordionDetails from "@mui/material/AccordionDetails/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary/AccordionSummary";
import Accordion from "@mui/material/Accordion/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import Alert from "@mui/material/Alert";
import {
  allSessionSelector,
  getNumberOfCarts,
  listConnectedUsersWebsocket,
} from "../../../user/store/slice";
import {
  entitiesCommentsOffer,
  entityCommentsOffer,
  entityPublicOffer,
  fetchDetailsPublicOffer,
  addCommentOffer,
  loadingCommentsOffer,
  loadingEntitiesCommentsOffer,
  loadingPublicOffer,
  totalItemsCommentsOffer,
  addSuccessCommentsOffer,
  deleteSuccessCommentsOffer,
  fetchCommentsOffer,
  updateSuccessCommentsOffer,
  resetFetchCommentsOffer,
  updateCommentOffer,
  deleteCommentOffer,
  reportCommentOffer,
  reportOffers,
  isLoadedSellDetailsOffers,
  entitiesSellDetailsOffers,
  fetchSellDetailsOffers,
  fetchRentDetailsOffers,
  entitiesRentDetailsOffers,
  isLoadedRentDetailsOffers,
  isLoadedFindDetailsOffers,
  entitiesFindDetailsOffers,
  fetchFindDetailsOffers,
} from "../../store/slice";
import { TransitionModal } from "../../../../shared/pages/transition-modal";
import { IReportOffer } from "../../../../shared/model/report-offer.model";
import { ICart } from "../../../../shared/model/cart.model";
import { ALL_APP_ROUTES } from "../../../../core/config/all-app-routes";
import { TypeOfferEnum } from "../../../../shared/enums/type-offer.enum";
import { ConvertReactTimeAgo } from "../../../../shared/pages/react-time-ago";
import { OfferTypeContact } from "../../../../shared/enums/offer-type-contact.enum";
import CartSellDetailsOffer from "./ui-segments/cart-sell-details-offer";
import RightDetailsOffer from "./ui-segments/right-details-offer";
import { IConversationContent } from "../../../../shared/model/conversation-content";
import {
  convertDateTimeToServer,
  isOnLine,
} from "../../../../shared/utils/utils-functions";
import CommentDetailsOffer from "./ui-segments/comment-details-offer";
import {
  addEventGA,
  AllModulesEventGA,
} from "../../../../shared/providers/google-anaylitics";
import { ICommentOffer } from "../../../../shared/model/comment-offer.model";
import { AllAppConfig } from "../../../../core/config/all-config";
import SwiperDetailsOffer from "./ui-segments/swiper-details-offer";
import {
  addConversation,
  loadingConversation,
} from "../../../chat/store/slice";
import {addCart, addSuccessCart, loadingCart, resetCart} from "../../../cart/store/slice";
import CustomShare from "../../../../shared/components/custom-share/CustomShare";
import {
  addFavoriteUsers,
  addSuccessFavoriteUser,
} from "../../../favorite/store/slice";
import ListRelatedDetailsOffer from "./ui-segments/list-related-details-offer";
import { showUnauthorizedModal } from "../../../../core/config/store/common/slice";
import {toast} from "react-toastify";
import i18n from "i18next";
import AddRentDetailsOffer from "./ui-segments/add_rent_details_offer";

export default function DetailsOfffer() {
  const [startAnimation, setStartAnimation] = React.useState(false);
  const [isFavoriteUser, setIsFavoriteUser] = React.useState(false);
  const [openReportOfferModal, setOpenReportOfferModal] = React.useState(false);
  const [activeCommentPage, setActiveCommentPage] = React.useState(-1);
  const [expandedDetailsOffer, setExpandedDetailsOffer] =
    React.useState<boolean>(true);
  const [defaultLanguage, setDefaultLanguage] = React.useState("fr");
  const [listCommentsForOffer, setListCommentsForOffer] = React.useState<any[]>(
    []
  );

  const { id } = useParams<{ id: string }>();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isAuthenticated, currentUser } = useSelector(allSessionSelector);

  const loadingPublicOfferSelector = useSelector(loadingPublicOffer) ?? false;
  const entityPublicOfferSelector = useSelector(entityPublicOffer) ?? {};

  const loadingCommentsOfferSelector =
    useSelector(loadingCommentsOffer) ?? false;
  // const entityCommentsOfferSelector = useSelector(entityCommentsOffer) ?? {};
  const loadingEntitiesCommentsOfferSelector =
    useSelector(loadingEntitiesCommentsOffer) ?? {};
  const entitiesCommentsOfferSelector =
    useSelector(entitiesCommentsOffer) ?? [];
  const totalItemsCommentsOfferSelector =
    useSelector(totalItemsCommentsOffer) ?? [];
  const addSuccessCommentsOfferSelector =
    useSelector(addSuccessCommentsOffer) ?? [];
  const updateSuccessCommentsOfferSelector =
    useSelector(updateSuccessCommentsOffer) ?? [];
  const deleteSuccessCommentsOfferSelector =
    useSelector(deleteSuccessCommentsOffer) ?? [];

  const addSuccessFavoriteUserSelector =
    useSelector(addSuccessFavoriteUser) ?? false;

  const loadingConversationSelector = useSelector(loadingConversation) ?? false;

  const isLoadedSellDetailsOffersSelector =
    useSelector(isLoadedSellDetailsOffers) ?? false;
  const entitiesSellDetailsOffersSelector =
    useSelector(entitiesSellDetailsOffers) ?? [];
  const isLoadedRentDetailsOffersSelector =
    useSelector(isLoadedRentDetailsOffers) ?? false;
  const entitiesRentDetailsOffersSelector =
    useSelector(entitiesRentDetailsOffers) ?? [];
  const isLoadedFindDetailsOffersSelector =
    useSelector(isLoadedFindDetailsOffers) ?? false;
  const entitiesFindDetailsOffersSelector =
    useSelector(entitiesFindDetailsOffers) ?? [];

  const listConnectedUsersWebsocketSelector =
    useSelector(listConnectedUsersWebsocket) ?? [];

  const addSuccessCartSelector = useSelector(addSuccessCart) ?? false;
  const loadingCartSelector = useSelector(loadingCart) ?? false;

  React.useEffect(() => {
    if (entitiesCommentsOfferSelector.length) {
      if (activeCommentPage === 0) {
        setListCommentsForOffer([...entitiesCommentsOfferSelector]);
      } else {
        setListCommentsForOffer([
          ...listCommentsForOffer,
          ...entitiesCommentsOfferSelector,
        ]);
      }
    }
  }, [entitiesCommentsOfferSelector]);

  React.useEffect(() => {
    if (id) {
      console.log("id details ", id);
      if (id) {
        dispatch(fetchDetailsPublicOffer({ id }));

        // From related list
        if (activeCommentPage === 0) {
          if (isAuthenticated) {
            dispatch(
              fetchCommentsOffer({
                offerId: Number(id),
                page: activeCommentPage,
                size: AllAppConfig.COMMENTS_PER_PAGE,
                queryParams: "",
              })
            );
          }
        } else {
          setActiveCommentPage(0);
        }
      }
    }
  }, [id]);

  React.useEffect(() => {
    if (activeCommentPage >= 0) {
      if (isAuthenticated) {
        dispatch(
          fetchCommentsOffer({
            offerId: Number(id),
            page: activeCommentPage,
            size: AllAppConfig.COMMENTS_PER_PAGE,
            queryParams: "",
          })
        );
      }
    }
  }, [activeCommentPage]);

  React.useEffect(() => {
    if (
      entityPublicOfferSelector &&
      entityPublicOfferSelector.offer &&
      !loadingPublicOfferSelector
    ) {
      setIsFavoriteUser(entityPublicOfferSelector.myFavoriteUser || false);
      setTimeout(() => {
        setStartAnimation(true);
      }, 300);

      if (
        entityPublicOfferSelector.offer.typeOffer === TypeOfferEnum.Sell &&
        !isLoadedSellDetailsOffersSelector
      ) {
        dispatch(fetchSellDetailsOffers({}));
      } else if (
        entityPublicOfferSelector.offer.typeOffer === TypeOfferEnum.Rent &&
        !isLoadedRentDetailsOffersSelector
      ) {
        dispatch(fetchRentDetailsOffers({}));
      } else if (
        entityPublicOfferSelector.offer.typeOffer === TypeOfferEnum.Find &&
        !isLoadedFindDetailsOffersSelector
      ) {
        dispatch(fetchFindDetailsOffers({}));
      }
    }
  }, [entityPublicOfferSelector]);

  React.useEffect(() => {
    if (
      addSuccessCommentsOfferSelector ||
      updateSuccessCommentsOfferSelector ||
      deleteSuccessCommentsOfferSelector
    ) {
      setListCommentsForOffer([]);
      dispatch(resetFetchCommentsOffer({}));
      if (activeCommentPage === 0) {
        dispatch(
          fetchCommentsOffer({
            offerId: Number(id),
            page: 0,
            size: AllAppConfig.COMMENTS_PER_PAGE,
            queryParams: "",
          })
        );
      } else {
        setActiveCommentPage(0);
      }
    }
  }, [
    addSuccessCommentsOfferSelector,
    updateSuccessCommentsOfferSelector,
    deleteSuccessCommentsOfferSelector,
  ]);

  const reportOffer = () => {
    setOpenReportOfferModal(true);
  };
  const handleCloseReportOfferModal = () => {
    setOpenReportOfferModal(false);
  };

  const handleAddReportOfferModal = () => {
    setOpenReportOfferModal(false);
    const entity: IReportOffer = {
      offer: entityPublicOfferSelector?.offer,
      user: {},
    };
    dispatch(reportOffers({ ...entity }));
  };

  const renderDialogReportOffer = () => {
    return (
      <Dialog
        open={openReportOfferModal}
        TransitionComponent={TransitionModal}
        keepMounted
        onClose={handleCloseReportOfferModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {t<string>("details_offer.title_dialog_report_offer")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t<string>("details_offer.description_dialog_report_offer")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReportOfferModal} color="neutral">
            {t<string>("common.label_cancel")}
          </Button>
          <Button color="success" onClick={handleAddReportOfferModal}>
            {t<string>("common.label_report")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleChangeDetailsOffer = () => {
    setExpandedDetailsOffer(!expandedDetailsOffer);
  };

  const getNameCategory = (): string => {
    if (defaultLanguage === "en") {
      return entityPublicOfferSelector?.offer?.category?.titleEn || "";
    } else if (defaultLanguage === "fr") {
      return entityPublicOfferSelector?.offer?.category?.titleFr || "";
    }
    return entityPublicOfferSelector?.offer?.category?.titleAr || "";
  };

  React.useEffect(() => {
    if (addSuccessCartSelector) {
      dispatch(resetCart({}));
      dispatch(getNumberOfCarts({}));
    }
  }, [addSuccessCartSelector]);

  const addNewCart = (cart: ICart) => {
    if (isAuthenticated) {

      if( entityPublicOfferSelector?.offer?.amount ){
        const entity: ICart = {
          quantity: cart.quantity,
          sellOffer: {
            id: entityPublicOfferSelector?.offer?.id,
          },
        };
        dispatch(addCart({ ...entity }));
      }
      else{
        toast.error(i18n.t<string>('details_offer.missing_amount'));
      }
    }
    else{
      dispatch(showUnauthorizedModal({}));
    }
  };

  const handleCallbackFavorite = (userId: number) => {
    if (entityPublicOfferSelector?.offer?.user?.id !== currentUser?.id) {
      const entity = {
        favoriteUser: {
          id: entityPublicOfferSelector?.offer?.user?.id,
          username: entityPublicOfferSelector?.offer?.user?.username,
        },
        favoriteDate: convertDateTimeToServer(new Date()),
      };
      dispatch(addFavoriteUsers({ ...entity }));
    }
  };

  React.useEffect(() => {
    if (addSuccessFavoriteUserSelector) {
      setIsFavoriteUser(true);
    }
  }, [addSuccessFavoriteUserSelector]);

  const createConversation = (conversation: IConversationContent) => {
    if (
      currentUser.id !== entityPublicOfferSelector?.offer?.user?.id &&
      isAuthenticated
    ) {
      dispatch(addConversation({ ...conversation }));
    } else {
      // open();
      dispatch(showUnauthorizedModal({}));
    }
  };

  const parentCallbackLoadMoreComments = () => {
    setActiveCommentPage(activeCommentPage + 1);
  };

  const handleCallbackAddComment = (content: string) => {
    if (content) {
      const entity: ICommentOffer = {
        createdDate: convertDateTimeToServer(new Date()),
        content: content,
        offer: {
          id: entityPublicOfferSelector?.offer?.id,
          user: {
            id: entityPublicOfferSelector?.offer?.user?.id,
            email: entityPublicOfferSelector?.offer?.user?.email,
          },
        },
        user: {},
      };
      dispatch(addCommentOffer({ ...entity }));

      // Add event GA
      addEventGA(
        AllModulesEventGA.EventOffer.AddCommentOffer.eventName,
        AllModulesEventGA.EventOffer.AddCommentOffer.eventCategory,
        AllModulesEventGA.EventOffer.AddCommentOffer.eventLabel
      );
    }
  };

  const handleCallbackDeleteComment = (commentId: number) => {
    dispatch(deleteCommentOffer({ id: commentId }));
  };

  const parentCallbackReportComment = (comment: ICommentOffer) => {
    const entity = {
      commentOffer: comment,
      user: {},
    };
    dispatch(reportCommentOffer({ ...entity }));
  };

  const parentCallbackUpdateComment = (content: string, commentid: number) => {
    let commentUpdate = entitiesCommentsOfferSelector.find(
      (comment: ICommentOffer) => comment.id === commentid
    );
    commentUpdate = {
      ...commentUpdate,
      content: content,
    };
    dispatch(updateCommentOffer({ ...commentUpdate }));
    // updateComment(commentUpdate);

    // Add event GA
    addEventGA(
      AllModulesEventGA.EventOffer.UpdateCommentOffer.eventName,
      AllModulesEventGA.EventOffer.UpdateCommentOffer.eventCategory,
      AllModulesEventGA.EventOffer.UpdateCommentOffer.eventLabel
    );
  };

  const isUserOnline = (email: string) => {
    return isOnLine(
      listConnectedUsersWebsocketSelector.slice(),
      email,
      currentUser?.email
    );
  };

  const addNewEventGA = () => {
    addEventGA(
      AllModulesEventGA.EventOffer.ShareOffer.eventName,
      AllModulesEventGA.EventOffer.ShareOffer.eventCategory,
      AllModulesEventGA.EventOffer.ShareOffer.eventLabel
    );
  };

  return (
    <Box>
      <Container maxWidth="xl" className="details-offer-client">
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
                {t<string>("common.label_search")}
              </Link>
              <Typography color="text.primary">
                {entityPublicOfferSelector?.offer?.title}
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>

        {loadingPublicOfferSelector ? (
          <Box sx={{ paddingTop: 10, textAlign: "center" }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : null}

        {loadingPublicOfferSelector ? null : (
          <Grid
            container
            style={{
              paddingTop: 50,
              paddingBottom: 50,
            }}
          >
            <Grid item xs={12} sm={6}>
              <SwiperDetailsOffer {...entityPublicOfferSelector?.offer} />
              <Zoom in={startAnimation}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    {entityPublicOfferSelector?.offer?.amount ? (
                      <Typography
                        variant="h4"
                        sx={{ textAlign: "center", fontWeight: 600 }}
                        color="secondary"
                      >
                        {entityPublicOfferSelector?.offer?.amount?.toLocaleString(
                          "tn-TN"
                        )}{" "}
                        TND
                      </Typography>
                    ) : null}

                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      display="flex"
                    >
                      <InfoOutlinedIcon fontSize="small" sx={{ mr: 0.9 }} />
                      {entityPublicOfferSelector?.offer?.typeOffer ===
                      TypeOfferEnum.Sell
                        ? t<string>("common.for_sell")
                        : entityPublicOfferSelector?.offer?.typeOffer ===
                          TypeOfferEnum.Rent
                        ? t<string>("common.for_rent")
                        : entityPublicOfferSelector?.offer?.typeOffer ===
                          TypeOfferEnum.Find
                        ? t<string>("common.for_find")
                        : null}
                    </Typography>

                    {entityPublicOfferSelector?.offer?.startDate &&
                    entityPublicOfferSelector?.offer?.endDate ? (
                      <Box>
                        <Typography color="text.secondary" gutterBottom>
                          {t<string>("common.label_start_date")}:&nbsp;
                          <strong>
                            <ConvertReactTimeAgo
                              convertDate={
                                entityPublicOfferSelector?.offer?.startDate
                              }
                            />
                          </strong>
                        </Typography>
                        <Typography
                          color="text.secondary"
                          gutterBottom
                          display="flex"
                        >
                          {t<string>("common.label_end_date")}:&nbsp;
                          <strong>
                            <ConvertReactTimeAgo
                              convertDate={
                                entityPublicOfferSelector?.offer?.endDate
                              }
                            />
                          </strong>
                        </Typography>
                      </Box>
                    ) : null}

                    {entityPublicOfferSelector?.offer?.typePeriodRent ? (
                      <Typography
                        color="text.secondary"
                        gutterBottom
                        display="flex"
                      >
                        {t<string>("common.label_period")}:&nbsp;
                        <strong>
                          {t<string>(
                            "common.type_periode_rent_" +
                              entityPublicOfferSelector?.offer?.typePeriodRent
                          )}
                          &nbsp;
                        </strong>
                      </Typography>
                    ) : null}

                    <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                      {entityPublicOfferSelector?.offer?.title}
                    </Typography>

                    <Typography
                      sx={{ fontSize: "0.8rem", mt: 1 }}
                      color="text.secondary"
                      display="flex"
                    >
                      <AccessTimeIcon fontSize="small" sx={{ mr: 0.9 }} />{" "}
                      <ConvertReactTimeAgo
                        convertDate={
                          entityPublicOfferSelector?.offer?.dateCreated
                        }
                      />
                    </Typography>
                    {entityPublicOfferSelector?.offer?.address ? (
                      <Typography
                        sx={{ mb: 1.8, fontSize: "0.8rem", mt: 1 }}
                        color="text.secondary"
                        display="flex"
                      >
                        <AddLocation fontSize="small" sx={{ mr: 0.9 }} />
                        {entityPublicOfferSelector?.offer?.address?.city},{" "}
                        {entityPublicOfferSelector?.offer?.address?.country}
                      </Typography>
                    ) : null}

                    {entityPublicOfferSelector?.offer?.category ? (
                      <Typography
                        sx={{ mb: 1.8, fontSize: "0.8rem", mt: 1 }}
                        color="text.secondary"
                        display="flex"
                      >
                        <EmojiObjectsIcon fontSize="small" sx={{ mr: 0.9 }} />
                        {t<string>("details_offer.label_category")}{" "}
                        {getNameCategory()}
                      </Typography>
                    ) : null}

                    <Accordion
                      sx={{ mt: "40px !important" }}
                      elevation={0}
                      expanded={expandedDetailsOffer}
                      onChange={handleChangeDetailsOffer}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon
                            sx={{
                              backgroundColor: "yellow",
                              borderRadius: "50%",
                            }}
                          />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className="bg-brown"
                      >
                        {t<string>("details_offer.label_details_offer")}
                      </AccordionSummary>
                      <AccordionDetails>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              entityPublicOfferSelector?.offer?.description ||
                              "",
                          }}
                        ></div>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                  <CardActions disableSpacing>
                    <CustomShare>
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

                    <IconButton
                      sx={{ marginLeft: "auto" }}
                      onClick={reportOffer}
                      color="error"
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
                  </CardActions>
                </Card>
              </Zoom>

              {isAuthenticated ? (
                <Box sx={{ mb: 3 }}>
                  <CommentDetailsOffer
                    offerEntity={entityPublicOfferSelector?.offer}
                    listCommentsByOffer={listCommentsForOffer}
                    account={currentUser}
                    isAuthenticated={isAuthenticated}
                    loadingListComments={loadingEntitiesCommentsOfferSelector}
                    loadingUpdateEntity={loadingCommentsOfferSelector}
                    loadingAddEntity={loadingCommentsOfferSelector}
                    parentCallbackAddComment={handleCallbackAddComment}
                    parentCallbackDeleteComment={handleCallbackDeleteComment}
                    parentCallbackUpdateComment={parentCallbackUpdateComment}
                    parentCallbackReportComment={parentCallbackReportComment}
                    parentCallbackLoadMoreComments={
                      parentCallbackLoadMoreComments
                    }
                    totalItems={totalItemsCommentsOfferSelector}
                  />
                </Box>
              ) : null}

              {
                entityPublicOfferSelector?.offer?.typeContactClient !== OfferTypeContact.direct &&
                entityPublicOfferSelector.offer?.typeOffer === TypeOfferEnum.Sell ? (
                  <CartSellDetailsOffer
                    parentCallbackAddCart={addNewCart}
                    loadingAddCart={loadingCartSelector}
                  />
                ) : entityPublicOfferSelector?.offer?.typeContactClient !== OfferTypeContact.direct &&
                  entityPublicOfferSelector.offer?.typeOffer === TypeOfferEnum.Rent ? (
                    <AddRentDetailsOffer offer={entityPublicOfferSelector.offer} />
                ) : null
              }

              {entityPublicOfferSelector?.offer?.typeContactClient ===
                OfferTypeContact.direct &&
              entityPublicOfferSelector.offer?.typeOffer ===
                TypeOfferEnum.Sell ? (
                <Box sx={{ my: 3 }}>
                  <Alert severity="warning">
                    {t<string>("details_offer.offer_contact_direct")}
                  </Alert>
                </Box>
              ) : null}
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={6}
              sx={{ pl: { xs: 0, sm: 4 } }}
              spacing={2}
            >
              <RightDetailsOffer
                parentCallback={handleCallbackFavorite}
                offerEntity={entityPublicOfferSelector?.offer}
                currentUser={currentUser}
                isAuthenticated={isAuthenticated}
                myFavoriteUser={isFavoriteUser}
                createConversationCallback={createConversation}
                addSuccessConversation={loadingConversationSelector}
                isOnLine={isUserOnline}
              />
            </Grid>
          </Grid>
        )}

        <Box className="list-offer-relative" sx={{ mt: 5 }}>
          {!loadingPublicOfferSelector ? (
            <Typography
              variant="h4"
              gutterBottom
              className="uppercase"
              sx={{ textAlign: "center" }}
            >
              {t<string>("details_offer.similair_offers")}
            </Typography>
          ) : null}

          {entityPublicOfferSelector?.offer?.typeOffer ===
          TypeOfferEnum.Sell ? (
            <ListRelatedDetailsOffer
              listOffers={entitiesSellDetailsOffersSelector}
            />
          ) : entityPublicOfferSelector?.offer?.typeOffer ===
            TypeOfferEnum.Rent ? (
            <ListRelatedDetailsOffer
              listOffers={entitiesRentDetailsOffersSelector}
            />
          ) : entityPublicOfferSelector?.offer?.typeOffer ===
            TypeOfferEnum.Find ? (
            <ListRelatedDetailsOffer
              listOffers={entitiesFindDetailsOffersSelector}
            />
          ) : null}
        </Box>
      </Container>
      {renderDialogReportOffer()}
    </Box>
  );
}
