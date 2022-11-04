import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "../../home/store/initial.state";
import topHomeSlidesImages from "../../home/store/reducers/top-home-slides-images.reducer";
import homeFeatures from "../../home/store/reducers/home-feature.reducer";

export const HOME_KEY_IN_STORE = "home";

export const homeSlice: Slice = createSlice({
  name: HOME_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...topHomeSlidesImages,
    ...homeFeatures,
  },
});

export const {
  //? ********************| TOP_HOME_SLIDES ACTIONS |*******************/
  fetchTopHomeSlidesImages,
  fetchTopHomeSlidesImagesSuccess,
  fetchTopHomeSlidesImagesFailure,

  //? ********************| HOME_FEATURE ACTIONS |*******************/
  fetchHomeFeatures,
  fetchHomeFeaturesSuccess,
  fetchHomeFeaturesFailure,
} = homeSlice.actions;

//? ********************| TOP_HOME_SLIDES SELECTORS |*******************/
export const entitiesTopHomeSlidesImages = (state: any) =>
  state[HOME_KEY_IN_STORE].topHomeSlidesImages.entities;

//? ********************| FEATURE HOME SELECTORS |*******************/
export const loadingHomeFeatures = (state: any) =>
  state[HOME_KEY_IN_STORE].homeFeatures.loading;
export const entityHomeFeatures = (state: any) =>
  state[HOME_KEY_IN_STORE].homeFeatures.entity;
