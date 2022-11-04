import { invokeWS, MethodHttp } from "../../../../core/config/api-service";
import { StorageService } from "../../../../shared/services/storage.service";
import { AllAppConfig } from "../../../../core/config/all-config";
import { put } from "redux-saga/effects";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "../../../category/store/slice";

const apiUrl = "api/category";

export function* fetchCategoriesHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public${
      data.payload.sort
        ? `?page=${data.payload.page}&size=${data.payload.size}&sort=${data.payload.sort}`
        : ""
    }`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get,
    });
    yield put(fetchCategoriesSuccess(result?.data?.content));
  } catch (e) {
    console.error(e);
    yield put(fetchCategoriesFailure(e));
  }
}
