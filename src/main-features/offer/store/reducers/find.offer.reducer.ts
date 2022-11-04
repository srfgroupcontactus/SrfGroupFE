import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchFindOffer: (state: any) => {
    state.findOffer.loadingFindEntities = true;
  },
  fetchFindOfferSuccess: (state: any, action: any) => {
    state.findOffer.loadingEntities = false;
    state.findOffer.entities = action.payload.content;
  },
  fetchFindOfferFailure: (state: any, action: PayloadAction) => {
    state.findOffer.loadingEntities = false;
  },

  addFindOffer: (state: any) => {
    state.findOffer.loading = true;
    state.findOffer.addSuccess = false;
  },
  addFindOfferSuccess: (state: any, action: PayloadAction) => {
    state.findOffer.loading = false;
    state.findOffer.addSuccess = true;
    state.findOffer.entity = action.payload;
  },
  addFindOfferFailure: (state: any, action: PayloadAction) => {
    state.findOffer.loading = false;
    state.findOffer.addSuccess = false;
  },

  updateFindOffer: (state: any) => {
    state.findOffer.loading = true;
    state.findOffer.updateSuccess = false;
  },
  updateFindOfferSuccess: (state: any, action: PayloadAction) => {
    state.findOffer.loading = false;
    state.findOffer.updateSuccess = true;
    state.findOffer.entity = action.payload;
  },
  updateFindOfferFailure: (state: any, action: PayloadAction) => {
    state.findOffer.loading = false;
    state.findOffer.updateSuccess = false;
  },

  resetFindOffer: (state: any) => {
    state.findOffer = initialState.findOffer;
  },
};

export default reducer;
