import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { put } from "redux-saga/effects";
import {
    addOrderSuccess,
    addOrderFailure,
    fetchOrderSuccess,
    fetchOrderFailure,
} from "../slice";

const apiUrl = "api/order";


export function* addOrderHandler(data: any): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/create`;
        const result = yield invokeWS(
            {
                url: `${requestUrl}`,
                method: MethodHttp.post,
            },
            {
                ...data.payload,
            }
        );
        yield put(addOrderSuccess(result?.data));
    } catch (e) {
        yield put(addOrderFailure(e));
    }
}


export function* fetchOrderHandler(data: any): Generator<any, any, any> {
    try {
        const requestUrl = `${apiUrl}/current-user?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
        const result = yield invokeWS({
            url: `${requestUrl}`,
            method: MethodHttp.get,
        });
        yield put(fetchOrderSuccess(result?.data));
    } catch (e) {
        yield put(fetchOrderFailure(e));
    }
}
