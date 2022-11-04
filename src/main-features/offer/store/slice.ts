import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import offerReducer from "./reducers/offer.reducer";
import sellerOfferReducer from "./reducers/seller.offer.reducer";
import rentOfferReducer from "./reducers/rent.offer.reducer";
import findOfferReducer from "./reducers/find.offer.reducer";
import myOffersReducer from "./reducers/my-offers.reducer";
import commentsOfferReducer from "./reducers/comment-offer.reducer";
import imagesOfferReducer from "./reducers/images-offer.reducer";

export const OFFER_KEY_IN_STORE = "offer";

export const offerSlice: Slice = createSlice({
  name: OFFER_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...offerReducer,
    ...sellerOfferReducer,
    ...rentOfferReducer,
    ...findOfferReducer,
    ...myOffersReducer,
    ...commentsOfferReducer,
    ...imagesOfferReducer,
  },
});

export const {
  //? ********************| PUBLIC_LIST_OFFERS ACTIONS |*******************/
  fetchPublicOffers,
  fetchPublicOffersSuccess,
  fetchPublicOffersFailure,
  setActivePageOffers,
  resetPublicOffers,

  //? ********************| DETAILS PUBLIC OFFER ACTIONS |*******************/
  fetchDetailsPublicOffer,
  fetchDetailsPublicOfferSuccess,
  fetchDetailsPublicOfferFailure,
  resetDetailsPublicOffer,

  //? ********************| COUNT OFFERS BY USER ACTIONS |*******************/
  fetchCountAllOffersByUser,
  fetchCountAllOffersByUserSuccess,
  fetchCountAllOffersByUserFailure,

  //? ********************| FETCH SELL OFFER FOR DETAILS ACTIONS |*******************/
  fetchSellDetailsOffers,
  fetchSellDetailsOffersSuccess,
  fetchSellDetailsOffersFailure,

  //? ********************| FETCH RENT OFFER FOR DETAILS ACTIONS |*******************/
  fetchRentDetailsOffers,
  fetchRentDetailsOffersSuccess,
  fetchRentDetailsOffersFailure,

  //? ********************| FETCH FIND OFFER FOR DETAILS ACTIONS |*******************/
  fetchFindDetailsOffers,
  fetchFindDetailsOffersSuccess,
  fetchFindDetailsOffersFailure,

  //? ********************| UPLOAD FILE OFFER ACTIONS |*******************/
  uploadFilesOffer,
  uploadFilesOfferSuccess,
  uploadFilesOfferFailure,

  //? ********************| REPORT OFFER ACTIONS |*******************/
  reportOffers,
  reportOffersSuccess,
  reportOffersFailure,

  //? ********************| FETCH OFFER ACTIONS |*******************/
  fetchOffer,
  fetchOfferSuccess,
  fetchOfferFailure,

  //? ********************| SELLER_OFFER ACTIONS |*******************/
  fetchSellerOffer,
  fetchSellerOfferSuccess,
  fetchSellerOfferFailure,
  addSellerOffer,
  addSellerOfferSuccess,
  addSellerOfferFailure,
  updateSellerOffer,
  updateSellerOfferSuccess,
  updateSellerOfferFailure,
  resetSellerOffer,

  //? ********************| RENT ACTIONS |*******************/
  fetchRentOffer,
  fetchRentOfferSuccess,
  fetchRentOfferFailure,
  addRentOffer,
  addRentOfferSuccess,
  addRentOfferFailure,
  updateRentOffer,
  updateRentOfferSuccess,
  updateRentOfferFailure,
  resetRentOffer,

  //? ********************| FIND ACTIONS |*******************/
  fetchFindOffer,
  fetchFindOfferSuccess,
  fetchFindOfferFailure,
  addFindOffer,
  addFindOfferSuccess,
  addFindOfferFailure,
  updateFindOffer,
  updateFindOfferSuccess,
  updateFindOfferFailure,
  resetFindOffer,

  //? ********************| MY_OFFERS ACTIONS |*******************/
  fetchMyOffers,
  fetchMyOffersSuccess,
  fetchMyOffersFailure,
  setActivePageMyOffer,
  resetMyOffers,

  //? ********************| DELETE OFFER ACTIONS |*******************/
  deleteMyOffer,
  deleteMyOfferSuccess,
  deleteMyOfferFailure,

  //? ********************| COMMENTS OFFER ACTIONS |*******************/
  fetchCommentsOffer,
  fetchCommentsOfferSuccess,
  fetchCommentsOfferFailure,
  resetFetchCommentsOffer,

  //? ********************| ADD COMMENT OFFER ACTIONS |*******************/
  addCommentOffer,
  addCommentOfferSuccess,
  addCommentOfferFailure,

  //? ********************| UPDATE COMMENT OFFER ACTIONS |*******************/
  updateCommentOffer,
  updateCommentOfferSuccess,
  updateCommentOfferFailure,

  //? ********************| DELETE COMMENT OFFER ACTIONS |*******************/
  deleteCommentOffer,
  deleteCommentOfferSuccess,
  deleteCommentOfferFailure,

  //? ********************| REPORT COMMENT OFFER ACTIONS |*******************/
  reportCommentOffer,
  reportCommentOfferSuccess,
  reportCommentOfferFailure,

  //? ********************| OFFERS BY USER ACTIONS |*******************/
  fetchOffersByUser,
  fetchOffersByUserSuccess,
  fetchOffersByUserFailure,
  resetfetchOffersByUser,

  //? ********************| RECENTLY OFFERS ACTIONS |*******************/
  fetchRecentlyOffer,
  fetchRecentlyOfferSuccess,
  fetchRecentlyOfferFailure,

  //? ********************| OFFERS WITH IMAGE ACTIONS |*******************/
  fetchImagesOffer,
  fetchImagesOfferSuccess,
  fetchImagesOfferFailure,

  //? ********************| FETCH DESCRIPTION NEW OFFER ACTIONS |*******************/
  fetchDescriptionNewOffer,
  fetchDescriptionNewOfferSuccess,
  fetchDescriptionNewOfferFailure,
} = offerSlice.actions;

//? ********************| PUBLIC OFFER SELECTORS |*******************/
export const allPublicOffersSelector = (state: any) =>
  state[OFFER_KEY_IN_STORE].publicOffer;
export const loadingPublicOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].publicOffer.loading;
export const entityPublicOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].publicOffer.entity;
export const loadingEntitiesPublicOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].publicOffer.loadingEntities;
export const entitiesPublicOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].publicOffer.entities;
export const totalItemsPublicOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].publicOffer.totalItems;
export const totalPagesPublicOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].publicOffer.totalPages;
export const activePagePublicOffer = (state: any) =>
    state[OFFER_KEY_IN_STORE].publicOffer.activePage;

//? ********************| SELLER OFFER SELECTORS |*******************/
export const allSellerOffersSelector = (state: any) =>
  state[OFFER_KEY_IN_STORE];
export const loadingSellerOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].sellerOffer.loading;
export const entitySellerOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].sellerOffer.entity;
export const entitiesSellerOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].sellerOffer.entities;
export const addSuccessSellerOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].sellerOffer.addSuccess;
export const updateSuccessSellerOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].sellerOffer.updateSuccess;

//? ********************| RENT OFFER SELECTORS |*******************/
export const allRentOffersSelector = (state: any) =>
  state[OFFER_KEY_IN_STORE].rentOffer;
export const loadingRentOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].rentOffer.loading;
export const entityRentOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].rentOffer.entity;
export const entitiesRentOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].rentOffer.entities;
export const addSuccessRentOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].rentOffer.addSuccess;
export const updateSuccessRentOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].rentOffer.updateSuccess;

//? ********************| FIND OFFER SELECTORS |*******************/
export const allFindOffersSelector = (state: any) =>
  state[OFFER_KEY_IN_STORE].findOffer;
export const loadingFindOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].findOffer.loading;
export const entityFindOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].findOffer.entity;
export const loadingEntitiesFindOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].findOffer.loadingEntities;
export const entitiesFindOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].findOffer.entities;
export const addSuccessFindOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].findOffer.addSuccess;
export const updateSuccessFindOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].findOffer.updateSuccess;

//? ********************| MY OFFERS SELECTORS |*******************/
export const loadingMyOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].myOffers.loading;
export const entityMyOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].myOffers.entity;
export const loadingEntitiesMyOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].myOffers.loadingEntities;
export const entitiesMyOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].myOffers.entities;
export const totalItemsMyOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].myOffers.totalItems;
export const totalPagesMyOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].myOffers.totalPages;
export const activePageMyOffers = (state: any) =>
    state[OFFER_KEY_IN_STORE].myOffers.activePage;
export const deleteSuccessMyOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].myOffers.deleteSuccess;

//? ********************| COMMENTS OFFER SELECTORS |*******************/
export const loadingCommentsOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].commentsOffer.loading;
export const entityCommentsOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].commentsOffer.entity;
export const loadingEntitiesCommentsOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].commentsOffer.loadingEntities;
export const entitiesCommentsOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].commentsOffer.entities;
export const totalItemsCommentsOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].commentsOffer.totalItems;
export const totalPagesCommentsOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].commentsOffer.totalPages;
export const addSuccessCommentsOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].commentsOffer.addSuccess;
export const updateSuccessCommentsOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].commentsOffer.updateSuccess;
export const deleteSuccessCommentsOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].commentsOffer.deleteSuccess;
export const reportSuccessCommentsOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].commentsOffer.reportSuccess;

//? ********************| USER OFFERS SELECTORS |*******************/
export const loadingEntitiesUserOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].userOffers.loadingEntities;
export const entitiesUserOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].userOffers.entities;
export const totalItemsUserOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].userOffers.totalItems;
export const totalPagesUserOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].userOffers.totalPages;

//? ********************| RECENTLY OFFERS SELECTORS |*******************/
export const loadingEntitiesRecentlyOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].recentlyOffers.loadingEntities;
export const entitiesRecentlyOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].recentlyOffers.entities;
export const totalItemsRecentlyOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].recentlyOffers.totalItems;
export const totalPagesRecentlyOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].recentlyOffers.totalPages;

//? ********************| IMAGES OFFERS SELECTORS |*******************/
export const loadingEntitiesImagesOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].imagesOffers.loadingEntities;
export const entitiesImagesOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].imagesOffers.entities;
export const totalItemsImagesOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].imagesOffers.totalItems;
export const totalPagesImagesOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].imagesOffers.totalPages;

//? ********************| DESCRIPTION NEW OFFER SELECTORS |*******************/
export const loadingImagesDescriptionNewOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].descriptionNewOffer.loading;
export const entityDescriptionNewOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].descriptionNewOffer.entity;

//? ********************| SELL DETAILS OFFER SELECTORS |*******************/
export const loadingEntitiesSellDetailsOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].sellDetailsOffers.loadingEntities;
export const entitiesSellDetailsOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].sellDetailsOffers.entities;
export const isLoadedSellDetailsOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].sellDetailsOffers.isLoaded;

//? ********************| RENT DETAILS OFFER SELECTORS |*******************/
export const loadingEntitiesRentDetailsOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].rentDetailsOffers.loadingEntities;
export const entitiesRentDetailsOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].rentDetailsOffers.entities;
export const isLoadedRentDetailsOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].rentDetailsOffers.isLoaded;

//? ********************| RENT DETAILS OFFER SELECTORS |*******************/
export const loadingEntitiesFindDetailsOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].findDetailsOffers.loadingEntities;
export const entitiesFindDetailsOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].findDetailsOffers.entities;
export const isLoadedFindDetailsOffers = (state: any) =>
  state[OFFER_KEY_IN_STORE].findDetailsOffers.isLoaded;

//? ********************| COUNT OFFERS SELECTORS |*******************/
export const loadingEntityCountOffersByUser = (state: any) =>
  state[OFFER_KEY_IN_STORE].countOffersByUser.loading;
export const entityCountOffersByUser = (state: any) =>
  state[OFFER_KEY_IN_STORE].countOffersByUser.entity;
