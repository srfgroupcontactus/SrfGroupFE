import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { StorageService } from "../../../../shared/services/storage.service";
import { AllAppConfig } from "../../../../core/config/all-config";
import { put } from "redux-saga/effects";
import {
  fetchHomeFeaturesSuccess,
  fetchHomeFeaturesFailure,
} from "../../../home/store/slice";

const apiUrl = "api/post-home-feature";

export function* fetchHomeFeaturesHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public/last`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchHomeFeaturesSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchHomeFeaturesFailure(e));
  }
}
