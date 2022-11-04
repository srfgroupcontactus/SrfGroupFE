import { initialState } from "../initial.state";
import {PayloadAction} from "@reduxjs/toolkit";

const reducer = {
    addOrder: (state: any) => {
        state.order.loading = true;
        state.order.addSuccess = false;
    },
    addOrderSuccess: (state: any, action: any) => {
        state.order.loading = false;
        state.order.addSuccess = true;
        state.order.entity = action.payload;
    },
    addOrderFailure: (state: any) => {
        state.order.loading = false;
    },

    fetchOrder: (state: any) => {
        state.order.loadingEntities = true;
    },
    fetchOrderSuccess: (state: any, action: any) => {
        state.order.loadingEntities = false;
        state.order.entities = [
            ...state.order.entities,
            ...action.payload.content
        ];
        state.order.totalItems = action.payload?.totalElements;
        state.order.totalPages = action.payload?.totalPages;
    },
    fetchOrderFailure: (state: any, action: PayloadAction) => {
        state.order.loadingEntities = false;
    },

    setActivePageOrder: (state: any, action: PayloadAction) => {
        state.order.activePage = action.payload;
    },

    resetOrder: (state: any) => {
        state.order = initialState.order;
    },
};

export default reducer;
