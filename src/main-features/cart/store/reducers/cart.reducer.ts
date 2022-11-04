import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchCart: (state: any) => {
    state.cart.loadingEntities = true;
  },
  fetchCartSuccess: (state: any, action: any) => {
    state.cart.loadingEntities = false;
    state.cart.entities = [
        ...state.cart.entities,
        ...action.payload.content
    ];
    state.cart.totalItems = action.payload?.totalElements;
    state.cart.totalPages = action.payload?.totalPages;
  },
  fetchCartFailure: (state: any, action: PayloadAction) => {
    state.cart.loadingEntities = false;
  },

  addCart: (state: any) => {
    state.cart.loading = true;
    state.cart.addSuccess = false;
  },
  addCartSuccess: (state: any, action: any) => {
    state.cart.loading = false;
    state.cart.addSuccess = true;
    state.cart.entity = action.payload;
  },
  addCartFailure: (state: any, action: PayloadAction) => {
    state.cart.loading = false;
  },

  updateByQuantityCart: (state: any) => {
    state.cart.loading = true;
    state.cart.addSuccess = false;
  },
  updateByQuantityCartSuccess: (state: any, action: any) => {
    state.cart.loading = false;
    state.cart.addSuccess = true;
    state.cart.entity = action.payload;
  },
  updateByQuantityCartFailure: (state: any, action: PayloadAction) => {
    state.cart.loading = false;
  },

  detailsCart: (state: any) => {
    state.cart.loading = true;
  },
  detailsCartSuccess: (state: any, action: any) => {
    state.cart.loading = false;
    state.cart.entity = action.payload;
  },
  detailsCartFailure: (state: any, action: PayloadAction) => {
    state.cart.loading = false;
  },

  deleteCart: (state: any) => {
    state.cart.loading = true;
    state.cart.deleteSuccess = false;
  },
  deleteCartSuccess: (state: any, action: any) => {
    state.cart.loading = false;
    state.cart.deleteSuccess = true;
  },
  deleteCartFailure: (state: any, action: PayloadAction) => {
    state.cart.loading = false;
  },

  setActivePage: (state: any, action: PayloadAction) => {
    state.cart.activePage = action.payload;
  },

  resetCart: (state: any) => {
    state.cart = initialState.cart;
  },
};

export default reducer;
