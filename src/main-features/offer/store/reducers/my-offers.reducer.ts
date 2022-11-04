import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchMyOffers: (state: any) => {
    state.myOffers.loadingEntities = true;
  },
  fetchMyOffersSuccess: (state: any, action: any) => {
    state.myOffers.loadingEntities = false;
    // state.myOffers.entities = action.payload?.content;
    state.myOffers.entities = [
      ...state.myOffers.entities,
      ...action.payload.content,
    ];
    state.myOffers.totalItems = action.payload?.totalElements;
    state.myOffers.totalPages = action.payload?.totalPages;
  },
  fetchMyOffersFailure: (state: any, action: PayloadAction) => {
    state.myOffers.loadingEntities = false;
  },

  deleteMyOffer: (state: any, action: PayloadAction) => {
    state.myOffers.loading = true;
    state.myOffers.deleteSuccess = false;
  },
  deleteMyOfferSuccess: (state: any, action: PayloadAction) => {
    state.myOffers.loading = false;
    state.myOffers.deleteSuccess = true;
  },
  deleteMyOfferFailure: (state: any, action: PayloadAction) => {
    state.myOffers.loading = false;
  },

  fetchOffer: (state: any) => {
    state.myOffers.loading = true;
  },
  fetchOfferSuccess: (state: any, action: any) => {
    state.myOffers.loading = false;
    state.myOffers.entity = action.payload;
  },
  fetchOfferFailure: (state: any, action: any) => {
    state.myOffers.loading = false;
  },

  setActivePageMyOffer: (state: any, action: PayloadAction) => {
    state.myOffers.activePage = action.payload;
  },

  resetMyOffers: (state: any) => {
    state.myOffers = initialState.myOffers;
  },
};

export default reducer;
