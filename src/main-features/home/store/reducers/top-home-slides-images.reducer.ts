import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  fetchTopHomeSlidesImages: (state: any) => {
    state.topHomeSlidesImages.loadingEntities = true;
  },
  fetchTopHomeSlidesImagesSuccess: (state: any, action: any) => {
    state.topHomeSlidesImages.loadingEntities = false;
    state.topHomeSlidesImages.entities = action.payload?.content;
  },
  fetchTopHomeSlidesImagesFailure: (state: any, action: PayloadAction) => {
    state.topHomeSlidesImages.loadingEntities = false;
  },
};

export default reducer;
