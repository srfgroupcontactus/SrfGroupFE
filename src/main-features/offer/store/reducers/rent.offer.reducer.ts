import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchRentOffer: (state: any) => {
    state.rentOffer.loadingEntities = true;
  },
  fetchRentOfferSuccess: (state: any, action: any) => {
    state.rentOffer.loadingEntities = false;
    state.rentOffer.entities = action.payload.content;
  },
  fetchRentOfferFailure: (state: any, action: PayloadAction) => {
    state.rentOffer.loadingEntities = false;
  },

  addRentOffer: (state: any) => {
    state.rentOffer.loading = true;
    state.rentOffer.addSuccess = false;
  },
  addRentOfferSuccess: (state: any, action: PayloadAction) => {
    state.rentOffer.loading = false;
    state.rentOffer.addSuccess = true;
    state.rentOffer.entity = action.payload;
  },
  addRentOfferFailure: (state: any, action: PayloadAction) => {
    state.rentOffer.loading = false;
    state.rentOffer.addSuccess = false;
  },

  updateRentOffer: (state: any) => {
    state.rentOffer.loading = true;
    state.rentOffer.updateSuccess = false;
  },
  updateRentOfferSuccess: (state: any, action: PayloadAction) => {
    state.rentOffer.loading = false;
    state.rentOffer.updateSuccess = true;
    state.rentOffer.entity = action.payload;
  },
  updateRentOfferFailure: (state: any, action: PayloadAction) => {
    state.rentOffer.loading = false;
    state.rentOffer.updateSuccess = false;
  },

  resetRentOffer: (state: any) => {
    state.rentOffer = initialState.rentOffer;
  },
};

export default reducer;
