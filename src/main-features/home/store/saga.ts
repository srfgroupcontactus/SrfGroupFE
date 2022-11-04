import { all, takeEvery } from "redux-saga/effects";
import {
  fetchTopHomeSlidesImages,
  fetchHomeFeatures,
} from "../../home/store/slice";
import { fetchTopHomeSlidesImagesHandler } from "./saga-handler/top-home-slides-images.generator";
import { fetchHomeFeaturesHandler } from "./saga-handler/home-features.generator";

export function* topHomeSlidesImagesSaga() {
  yield all([
    takeEvery(fetchTopHomeSlidesImages, fetchTopHomeSlidesImagesHandler),
    takeEvery(fetchHomeFeatures, fetchHomeFeaturesHandler),
  ]);
}

export default topHomeSlidesImagesSaga;
