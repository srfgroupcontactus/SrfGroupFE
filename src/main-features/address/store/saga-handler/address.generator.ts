import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { StorageService } from "../../../../shared/services/storage.service";
import { AllAppConfig } from "../../../../core/config/all-config";
import { put } from "redux-saga/effects";
import {
  fetchAddressSuccess,
  fetchAddressFailure,
} from "../../../address/store/slice";

const apiUrl = "api/address";

export function* fetchAddressHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public${`?page=${data.payload.page}&size=${data.payload.size}&sort=${data.payload.sort}`}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchAddressSuccess(result?.data?.content));
  } catch (e) {
    console.error(e);
    yield put(fetchAddressFailure(e));
  }
}
