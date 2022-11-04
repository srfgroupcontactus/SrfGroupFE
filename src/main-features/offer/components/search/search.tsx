import Box from "@mui/material/Box";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPublicOffers,
  entitiesPublicOffer,
  loadingEntitiesPublicOffer,
  resetPublicOffers,
  totalItemsPublicOffer,
  totalPagesPublicOffer, activePagePublicOffer, setActivePageOffers,
} from "../../store/slice";
import { TypeDisplaySearchOffers } from "../../../../shared/enums/type-offer.enum";
import { AllAppConfig } from "../../../../core/config/all-config";
import {
  getFullUrlWithParams,
  isOnLine,
} from "../../../../shared/utils/utils-functions";
import queryString from "query-string";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ALL_APP_ROUTES } from "../../../../core/config/all-app-routes";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { SearchAppBar } from "../../../../shared/layout/menus/SearchAppBar";
import { allCategorySelector } from "../../../category/store/slice";
import { allAddressSelector } from "../../../address/store/slice";
import LoadingSearchOffers from "./ui-segments/LoadingSearchOffers";
import InfiniteScroll from "react-infinite-scroller";
import ItemsOffer from "../../../../shared/components/item-offer/ItemsOffer";
import Alert from "@mui/material/Alert";
import LeftSearch from "./ui-segments/LeftSearch";
import RightSearch from "./ui-segments/RightSearch";
import {
  allSessionSelector,
  listConnectedUsersWebsocket,
} from "../../../user/store/slice";
import './search.scss';
import HorizontalItems from "./ui-segments/horizontal-items";

export default function Search() {

  const [typeDisplayOffers, setTypeDisplayOffers] =
    React.useState<TypeDisplaySearchOffers>(TypeDisplaySearchOffers.Grid);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [isSearchCalback, setIsSearchCalback] = React.useState<boolean>(false);
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { currentUser } = useSelector(allSessionSelector);

  const entitiesPublicOfferSelector = useSelector(entitiesPublicOffer) ?? [];
  const totalItemsPublicOfferSelector =
    useSelector(totalItemsPublicOffer) ?? -1;
  const totalPagesPublicOfferSelector = useSelector(totalPagesPublicOffer) ?? 0;
  const activePagePublicOfferSelector =
      useSelector(activePagePublicOffer) ?? -1;
  const loadingEntitiesPublicOfferSelector =
    useSelector(loadingEntitiesPublicOffer) ?? false;

  const entitiesCategories = useSelector(allCategorySelector).entities ?? [];
  const entitiesAddress = useSelector(allAddressSelector).entities ?? [];
  const listConnectedUsersWebsocketSelector =
    useSelector(listConnectedUsersWebsocket) ?? [];

  const resetAll = () => {
    dispatch(resetPublicOffers({}));
    dispatch(setActivePageOffers(0));
  };

  React.useEffect(() => {

    if(isFirstTime && entitiesPublicOfferSelector.length === 0){
      setIsFirstTime(false);
      dispatch(setActivePageOffers(-1));
      resetAll();
    }

  }, [isFirstTime]);

  React.useEffect(() => {
    if (activePagePublicOfferSelector >= 0 && !isFirstTime) {
      const values = queryString.parse(search);
      const queryParams = getFullUrlWithParams(values);
      dispatch(
        fetchPublicOffers({
          page: activePagePublicOfferSelector,
          size: AllAppConfig.OFFERS_PER_PAGE,
          queryParams: queryParams,
        })
      );
      setIsSearchCalback(false);
    }
  }, [activePagePublicOfferSelector, isFirstTime]);

  React.useEffect(() => {
    if (isSearchCalback) {
      const values = queryString.parse(search);
      const queryParams = getFullUrlWithParams(values);
      dispatch(
        fetchPublicOffers({
          page: activePagePublicOfferSelector,
          size: AllAppConfig.OFFERS_PER_PAGE,
          queryParams: queryParams,
        })
      );
      setIsSearchCalback(false);
    }
  }, [isSearchCalback]);

  const loadMore = () => {
    setIsFirstTime(false);
    dispatch(setActivePageOffers(activePagePublicOfferSelector + 1));
  };

  const searchCalback = (values: any) => {
    navigate(
      {
        pathname: ALL_APP_ROUTES.SEARCH,
        search:
          "?" + new URLSearchParams(getFullUrlWithParams(values)).toString(),
      },
      { replace: false }
    );
    setIsSearchCalback(true);
    resetAll();
  };

  const typeDisplay = (value: TypeDisplaySearchOffers) => {
    setTypeDisplayOffers(value);
  };

  const isUserOnline = (email: string) => {
    return isOnLine(
      listConnectedUsersWebsocketSelector.slice(),
      email,
      currentUser.email
    );
  };

  return (
    <Box sx={{ px: { xs: 2, md: 0 } }}>
      <Grid container sx={{ pt: 2 }}>
        <Grid item xs={12} sm={6} md={1}></Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to={ALL_APP_ROUTES.HOME}>
              SRF
            </Link>
            <Typography color="text.primary">
              {t<string>("common.label_search")}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={6} sx={{ mt: 0 }}>
        <Grid item xs={12} sm={6} md={1}></Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={2}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <LeftSearch
            listAddress={entitiesAddress.slice()}
            filterCallback={searchCalback}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{ pt: { xs: "0 !important", md: "48px !important" } }}
        >
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

          {
            entitiesCategories?.length ? <HorizontalItems listCategories={entitiesCategories}/> : null
          }

          <InfiniteScroll
            pageStart={activePagePublicOfferSelector}
            loadMore={loadMore}
            hasMore={totalPagesPublicOfferSelector - 1 > activePagePublicOfferSelector}
            loader={<div className="loader" key={0}></div>}
            threshold={0}
            initialLoad={false}
          >
            <ItemsOffer
              listOffers={entitiesPublicOfferSelector.slice()}
              typeDisplay={typeDisplayOffers}
              isOnLine={(email: string) => isUserOnline(email)}
            />

            {loadingEntitiesPublicOfferSelector ? (
              <LoadingSearchOffers typeDisplay={typeDisplayOffers} />
            ) : totalItemsPublicOfferSelector === 0 ? (
              <Alert severity="warning">No Offers found</Alert>
            ) : null}
          </InfiniteScroll>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={2}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <RightSearch />
        </Grid>
      </Grid>
    </Box>
  );
}
