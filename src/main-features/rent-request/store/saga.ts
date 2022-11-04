import {all, takeEvery} from "redux-saga/effects";
import { addRentRequests, fetchRentRequestsSent, fetchRentRequestsReceived, deleteRentRequestsSent,
    refusedRentRequestsReceived, acceptRentRequestsReceived} from "./slice";
import {
    acceptRentRequestsReceivedHandler,
    addRentRequestsHandler, deleteRentRequestsSentHandler,
    fetchRentRequestsReceivedHandler,
    fetchRentRequestsSentHandler, refusedRentRequestsReceivedHandler
} from "./saga-handler/rent_request.generator";


export function* rentRequestSaga() {
    yield all([
        takeEvery(addRentRequests, addRentRequestsHandler),
        takeEvery(fetchRentRequestsSent, fetchRentRequestsSentHandler),
        takeEvery(fetchRentRequestsReceived, fetchRentRequestsReceivedHandler),
        takeEvery(deleteRentRequestsSent, deleteRentRequestsSentHandler),
        takeEvery(refusedRentRequestsReceived, refusedRentRequestsReceivedHandler),
        takeEvery(acceptRentRequestsReceived, acceptRentRequestsReceivedHandler),
    ]);
}

export default rentRequestSaga;
