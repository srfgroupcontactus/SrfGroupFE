import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchSellerOffer: (state: any) => {
    state.sellerOffer.loadingEntities = true;
  },
  fetchSellerOfferSuccess: (state: any, action: any) => {
    state.sellerOffer.loadingSellerEntities = false;
    state.sellerOffer.entities = action.payload.content;
  },
  fetchSellerOfferFailure: (state: any, action: PayloadAction) => {
    state.sellerOffer.loadingEntities = false;
  },

  addSellerOffer: (state: any) => {
    state.sellerOffer.loading = true;
    state.sellerOffer.addSuccess = false;
  },
  addSellerOfferSuccess: (state: any, action: PayloadAction) => {
    state.sellerOffer.loading = false;
    state.sellerOffer.addSuccess = true;
    state.sellerOffer.entity = action.payload;
  },
  addSellerOfferFailure: (state: any, action: PayloadAction) => {
    state.sellerOffer.loading = false;
    state.sellerOffer.addSuccess = false;
  },

  updateSellerOffer: (state: any) => {
    state.sellerOffer.loading = true;
    state.sellerOffer.addSuccess = false;
  },
  updateSellerOfferSuccess: (state: any, action: PayloadAction) => {
    state.sellerOffer.loading = false;
    state.sellerOffer.updateSuccess = true;
    state.sellerOffer.entity = action.payload;
  },
  updateSellerOfferFailure: (state: any, action: PayloadAction) => {
    state.sellerOffer.loading = false;
    state.sellerOffer.updateSuccess = false;
  },

  resetSellerOffer: (state: any) => {
    state.sellerOffer = initialState.sellerOffer;
  },
};

export default reducer;
