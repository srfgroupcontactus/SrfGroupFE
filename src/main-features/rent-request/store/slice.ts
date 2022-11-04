import {createSlice, Slice} from "@reduxjs/toolkit";
import {initialState} from './initial.state';
import rentRequestReducer from "./reducers/rent_request.reducer";

export const RENT_REQUEST_KEY_IN_STORE = "rentRequest";

export const rentRequestSlice: Slice = createSlice({
    name: RENT_REQUEST_KEY_IN_STORE,
    initialState: initialState,
    reducers: {
        ...rentRequestReducer,
    },
});


export const {

    //? ********************| ADD RENTREQUEST ACTIONS |*******************/
    addRentRequests,
    addRentRequestsSuccess,
    addRentRequestsFailure,


    //? ********************| FETCH RENTREQUEST SENT USERS ACTIONS |*******************/
    fetchRentRequestsSent,
    fetchRentRequestsSuccessSent,
    fetchRentRequestsFailureSent,
    setActivePageSentRentRequest,

    //? ********************| FETCH RENTREQUEST RECEIVED USERS ACTIONS |*******************/
    fetchRentRequestsReceived,
    fetchRentRequestsSuccessReceived,
    fetchRentRequestsFailureReceived,
    setActivePageReceivedRentRequest,

    //? ********************| RESET RENTREQUEST USERS ACTIONS |*******************/
    resetRentRequestsSent,
    resetRentRequestsReceived,
    resetRentRequests,

    //? ********************| DELETE RENTREQUEST USERS ACTIONS |*******************/
    deleteRentRequestsSent,
    deleteRentRequestsSentSuccess,
    deleteRentRequestsSentFailure,


    //? ********************| REFUSED RENTREQUEST USERS ACTIONS |*******************/
    refusedRentRequestsReceived,
    refusedRentRequestsReceivedSuccess,
    refusedRentRequestsReceivedFailure,


    //? ********************| ACCEPT RENTREQUEST USERS ACTIONS |*******************/
    acceptRentRequestsReceived,
    acceptRentRequestsReceivedSuccess,
    acceptRentRequestsReceivedFailure


} = rentRequestSlice.actions;

//? ********************| RENTREQUEST SELECTORS |*******************/
export const loadingRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.loading;
export const entityRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.entity;
export const loadingEntitiesSentRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.loadingEntitiesSent;
export const entitiesSentRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.entitiesSent;
export const totalItemsSentRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.totalItemsSent;
export const totalPagesSentRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.totalPagesSent;
export const activePageSentRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.activePageSent;
export const loadingEntitiesReceivedRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.loadingEntitiesReceived;
export const entitiesReceivedRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.entitiesReceived;
export const totalItemsReceivedRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.totalItemsReceived;
export const activePageReceivedRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.activePageReceived;
export const totalPagesReceivedRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.totalPagesReceived;
export const refusedSuccessReceivedRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.refusedSuccessReceived;
export const acceptedSuccessReceivedRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.acceptedSuccessReceived;
export const addSuccessRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.addSuccess;
export const deleteSuccessRentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.deleteSuccess;
export const deleteSuccessSentRequest = (state: any) =>
    state[RENT_REQUEST_KEY_IN_STORE].rentRequest.deleteSuccessSent;
