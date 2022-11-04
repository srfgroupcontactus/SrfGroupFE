import React from "react";
import { Box } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TypeDisplaySearchOffers } from "../../../../shared/enums/type-offer.enum";
import { useDispatch, useSelector } from "react-redux";
import {
  activePageMyOffers,
  deleteMyOffer,
  deleteSuccessMyOffers,
  entitiesMyOffers,
  fetchMyOffers,
  fetchPublicOffers,
  loadingEntitiesMyOffers,
  resetMyOffers,
  setActivePageMyOffer,
  totalItemsMyOffers,
  totalPagesMyOffers,
} from "../../store/slice";
import { TransitionModal } from "../../../../shared/pages/transition-modal";
import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs/Breadcrumbs";
import Typography from "@mui/material/Typography/Typography";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import Button from "@mui/material/Button/Button";
import queryString from "query-string";
import { getFullUrlWithParams } from "../../../../shared/utils/utils-functions";
import { IOffer } from "../../../../shared/model/offer.model";
import { ALL_APP_ROUTES } from "../../../../core/config/all-app-routes";
import { SearchAppBar } from "../../../../shared/layout/menus/SearchAppBar";
import { allCategorySelector } from "../../../category/store/slice";
import { allAddressSelector } from "../../../address/store/slice";
import LoadingSearchOffers from "../search/ui-segments/LoadingSearchOffers";
import Alert from "@mui/material/Alert";
import InfiniteScroll from "react-infinite-scroller";
import ItemsOffer from "../../../../shared/components/item-offer/ItemsOffer";
import { AllAppConfig } from "../../../../core/config/all-config";

export default function MyOffers() {
  const [openDeleteOfferModal, setOpenDeleteOfferModal] = React.useState(false);
  const [deleteOfferId, setDeleteOfferId] = React.useState(-1);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [isSearchCalback, setIsSearchCalback] = React.useState<boolean>(false);
  const [typeDisplayOffers, setTypeDisplayOffers] =
    React.useState<TypeDisplaySearchOffers>(TypeDisplaySearchOffers.Grid);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { search } = useLocation();

  const loadingEntitiesMyOffersSelector =
    useSelector(loadingEntitiesMyOffers) ?? false;
  const entitiesMyOffersSelector = useSelector(entitiesMyOffers) ?? [];
  const totalItemsMyOffersSelector = useSelector(totalItemsMyOffers) ?? -1;
  const totalPagesMyOffersSelector = useSelector(totalPagesMyOffers) ?? 0;
  const activePageMyOffersSelector = useSelector(activePageMyOffers) ?? 0;
  const deleteSuccessMyOffersSelector =
    useSelector(deleteSuccessMyOffers) ?? false;

  const entitiesCategories = useSelector(allCategorySelector).entities ?? [];
  const entitiesAddress = useSelector(allAddressSelector).entities ?? [];

  const resetAll = () => {
    dispatch(resetMyOffers({}));
    dispatch(setActivePageMyOffer(0));
  };

  React.useEffect(() => {
    if( isFirstTime && entitiesMyOffersSelector.length === 0 ){
      setIsFirstTime(false);
      dispatch(setActivePageMyOffer(-1));
      resetAll();
    }
  }, [isFirstTime]);

  React.useEffect(() => {
    if (activePageMyOffersSelector >= 0 && !isFirstTime) {
      const values = queryString.parse(search);
      const queryParams = getFullUrlWithParams(values);
      dispatch(
        fetchMyOffers({
          page: activePageMyOffersSelector,
          size: AllAppConfig.OFFERS_PER_PAGE,
          queryParams: queryParams,
        })
      );
      setIsSearchCalback(false);
    }
  }, [activePageMyOffersSelector, isFirstTime]);

  React.useEffect(() => {
    if (isSearchCalback) {
      const values = queryString.parse(search);
      const queryParams = getFullUrlWithParams(values);
      dispatch(
        fetchMyOffers({
          page: activePageMyOffersSelector,
          size: AllAppConfig.OFFERS_PER_PAGE,
          queryParams: queryParams,
        })
      );
      setIsSearchCalback(false);
    }
  }, [isSearchCalback]);

  React.useEffect(() => {
    if (deleteSuccessMyOffersSelector) {
      dispatch(setActivePageMyOffer(-1));
      resetAll();
    }
  }, [deleteSuccessMyOffersSelector]);

  const handleClickOpenUpdateOffert = (offer: IOffer) => {
    navigate(`${ALL_APP_ROUTES.OFFER.ADD_UPDATE_OFFER}/${offer.id}/edit`);
  };

  const handleClickOpenDeleteOffertModal = (offer: IOffer) => {
    setDeleteOfferId(offer.id || -1);
    setOpenDeleteOfferModal(true);
  };

  const handleClickCancelDeleteOfferModal = () => {
    setOpenDeleteOfferModal(false);
  };

  const handleClickDeleteDeleteOfferModal = () => {
    setOpenDeleteOfferModal(false);
    dispatch(deleteMyOffer({ id: deleteOfferId }));
  };

  const renderDialogDeleteOffer = () => {
    return (
      <Dialog
        open={openDeleteOfferModal}
        TransitionComponent={TransitionModal}
        keepMounted
        onClose={handleClickCancelDeleteOfferModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {t<string>("my_offers.title_dialog_delete_offer")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t<string>("my_offers.description_dialog_delete_offer")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancelDeleteOfferModal} color="neutral">
            {t<string>("common.label_cancel")}
          </Button>
          <Button onClick={handleClickDeleteDeleteOfferModal} color="error">
            {t<string>("common.label_delete")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const searchCalback = (values: any) => {
    navigate({
      pathname: ALL_APP_ROUTES.OFFER.MY_OFFERS,
      search:
        "?" + new URLSearchParams(getFullUrlWithParams(values)).toString(),
    });
    // setActivePage(-1);
    setIsSearchCalback(true);
    resetAll();
  };

  const loadMore = () => {
    setIsFirstTime(false);
    dispatch(setActivePageMyOffer(activePageMyOffersSelector + 1));
  };

  const typeDisplay = (value: TypeDisplaySearchOffers) => {
    setTypeDisplayOffers(value);
  };

  const isUserOnline = (email: string): boolean => {
    return true;
  };

  return (
    <Box>
      <Container maxWidth="xl" className="details-offer-client">
        <Grid container sx={{ pt: 1 }}>
          <Grid item xs={12} sm={6} md={1}></Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" to={ALL_APP_ROUTES.HOME}>
                SRF
              </Link>
              <Typography color="text.primary">
                {t<string>("my_offers.title_page")}
              </Typography>
            </Breadcrumbs>
          </Grid>

          <Grid
            container
            style={{
              paddingTop: 50,
            }}
          >
            <Grid item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={6}>
              <div
                style={{
                  maxWidth: "100%",
                  marginBottom: 100,
                }}
              >
                <SearchAppBar
                  entitiesCategories={entitiesCategories.slice()}
                  searchCalback={searchCalback}
                  typeDisplayCallback={typeDisplay}
                  listAddress={entitiesAddress.slice()}
                />
              </div>

              {totalItemsMyOffersSelector > 0 ? (
                <Typography variant="subtitle2" color="text.secondary">
                  Total = {totalItemsMyOffersSelector}
                </Typography>
              ) : null}

              <InfiniteScroll
                pageStart={activePageMyOffersSelector}
                loadMore={loadMore}
                hasMore={totalPagesMyOffersSelector - 1 > activePageMyOffersSelector}
                loader={<div className="loader" key={0}></div>}
                threshold={0}
                initialLoad={false}
              >
                <ItemsOffer
                  listOffers={entitiesMyOffersSelector.slice()}
                  typeDisplay={typeDisplayOffers}
                  isOnLine={(email: string) => isUserOnline(email)}
                  forMe={true}
                  callbackEditOffer={handleClickOpenUpdateOffert}
                  callbackDeleteOffer={handleClickOpenDeleteOffertModal}
                />

                {loadingEntitiesMyOffersSelector ? (
                  <LoadingSearchOffers typeDisplay={typeDisplayOffers} />
                ) : null}
              </InfiniteScroll>

              {totalItemsMyOffersSelector === 0 &&
              !loadingEntitiesMyOffersSelector ? (
                <Alert severity="warning">No Offers found</Alert>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {renderDialogDeleteOffer()}
    </Box>
  );
}
