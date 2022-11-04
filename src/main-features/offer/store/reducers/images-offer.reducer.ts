import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  fetchImagesOffer: (state: any) => {
    state.imagesOffers.loadingEntities = true;
  },
  fetchImagesOfferSuccess: (state: any, action: any) => {
    state.imagesOffers.loadingEntities = false;
    state.imagesOffers.entities = action.payload.content;
  },
  fetchImagesOfferFailure: (state: any, action: PayloadAction) => {
    state.imagesOffers.loadingEntities = false;
  },
};

export default reducer;
