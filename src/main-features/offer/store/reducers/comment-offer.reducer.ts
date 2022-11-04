import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchCommentsOffer: (state: any) => {
    state.commentsOffer.loadingEntities = true;
  },
  fetchCommentsOfferSuccess: (state: any, action: any) => {
    state.commentsOffer.loadingEntities = false;
    state.commentsOffer.entities = action.payload.content;
    state.commentsOffer.totalItems = action.payload?.totalElements;
    state.commentsOffer.totalPages = action.payload?.totalPages;
  },
  fetchCommentsOfferFailure: (state: any, action: PayloadAction) => {
    state.commentsOffer.loadingEntities = false;
  },

  addCommentOffer: (state: any) => {
    state.commentsOffer.loading = true;
    state.commentsOffer.addSuccess = false;
  },
  addCommentOfferSuccess: (state: any, action: PayloadAction) => {
    state.commentsOffer.loading = false;
    state.commentsOffer.addSuccess = true;
    state.commentsOffer.entity = action.payload;
  },
  addCommentOfferFailure: (state: any, action: PayloadAction) => {
    state.commentsOffer.loading = false;
  },

  updateCommentOffer: (state: any) => {
    state.commentsOffer.loading = true;
    state.commentsOffer.updateSuccess = false;
  },
  updateCommentOfferSuccess: (state: any, action: PayloadAction) => {
    state.commentsOffer.loading = false;
    state.commentsOffer.updateSuccess = true;
    state.commentsOffer.entity = action.payload;
  },
  updateCommentOfferFailure: (state: any, action: PayloadAction) => {
    state.commentsOffer.loading = false;
  },

  deleteCommentOffer: (state: any) => {
    state.commentsOffer.loading = true;
    state.commentsOffer.deleteSuccess = false;
  },
  deleteCommentOfferSuccess: (state: any, action: PayloadAction) => {
    state.commentsOffer.loading = false;
    state.commentsOffer.deleteSuccess = true;
    state.commentsOffer.entity = action.payload;
  },
  deleteCommentOfferFailure: (state: any, action: PayloadAction) => {
    state.commentsOffer.loading = false;
  },

  reportCommentOffer: (state: any) => {
    state.commentsOffer.loading = true;
    state.commentsOffer.reportSuccess = false;
  },
  reportCommentOfferSuccess: (state: any, action: PayloadAction) => {
    state.commentsOffer.loading = false;
    state.commentsOffer.reportSuccess = true;
  },
  reportCommentOfferFailure: (state: any, action: PayloadAction) => {
    state.commentsOffer.loading = false;
  },

  resetFetchCommentsOffer: (state: any) => {
    state.commentsOffer = initialState.commentsOffer;
  },
};

export default reducer;
