import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { defaultValue, ICategory } from "./shared/model/category.model";
import { ITopHomeSlidesImages } from "./shared/model/top-home-slides-images.model";
import { ISellOffer } from "./shared/model/sell-offer.model";
import { IRentOffer } from "./shared/model/rent-offer.model";
import { defaultValueOFU } from "./shared/model/offer-favorite-user";
import { IOffer } from "./shared/model/offer.model";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//
test("renders App", () => {
  const store: any = mockStore({
    user: {
      isAuthenticated: false,
      nbeNotificationsNotRead: 0,
      nbeMessagesNotRead: 0,
      oneSignalId: "azerty",
      currentUser: {},
    },
    locale: {
      currentLocale: "fr",
    },
    address: {
      loadingEntities: false,
      entities: [],
    },
    newsLetter: {
      loadingEntity: false,
      addSuccess: false,
    },
    webSocketState: {
      listConnectedUsers: [],
    },
    category: {
      loadingEntity: false,
      entity: defaultValue,
      loadingEntities: false,
      entities: [] as ReadonlyArray<ICategory>,
      updateSuccess: false,
      errorMessage: null,
      totalItems: 0,
    },
    topHomeSlidesImages: {
      loadingEntities: false,
      errorMessage: null,
      entities: [] as ReadonlyArray<ITopHomeSlidesImages>,
      loadingEntity: false,
      entity: defaultValue,
      addSuccess: false,
      updateSuccess: false,
      totalItems: 0,
    },
    sellOffer: {
      loadingEntity: false,
      entity: defaultValue,
      loadingUpdateEntity: false,
      updateSuccess: false,
      addSuccess: false,
      entities: [] as ReadonlyArray<ISellOffer>,
      loadingEntities: false,
      errorMessage: null,
      loadingSellOffers: false,
      entitiesSellOffers: [] as ReadonlyArray<ISellOffer>,
      totalItemsSellOffers: 0,
    },
    rentOffer: {
      loadingEntity: false,
      entity: defaultValue,
      updateSuccess: false,
      entities: [] as ReadonlyArray<IRentOffer>,
      loadingEntities: false,
      errorMessage: null,
      loadingUpdateEntity: false,
      addSuccess: false,
      loadingRentOffers: false,
      entitiesRentOffers: [] as ReadonlyArray<IRentOffer>,
      totalItemsRentOffers: 0,
    },
    findOffer: {
      loadingEntity: false,
      entity: defaultValue,
      updateSuccess: false,
      entities: [] as ReadonlyArray<IRentOffer>,
      loadingEntities: false,
      errorMessage: null,
      loadingUpdateEntity: false,
      addSuccess: false,
      entitiesFindOffers: [] as ReadonlyArray<IRentOffer>,
    },
    offer: {
      loadingEntityWithFavoriteUser: false,
      entityWithFavoriteUser: defaultValueOFU,
      loadingEntity: false,
      entity: defaultValue,
      updateSuccess: false,
      deleteSuccess: false,
      entities: [] as ReadonlyArray<IOffer>,
      loadingEntities: false,
      errorMessage: null,
      totalItems: 0,
      totalPages: 0,

      entitiesForUser: [] as ReadonlyArray<IOffer>,
      loadingEntitiesForUser: false,

      loadingMyOffers: false,
      entitiesMyOffers: [] as ReadonlyArray<IOffer>,
      totalItemsMyOffers: 0,
      totalPagesMyOffers: 0,

      loadingRecentlyAddedOffers: false,
      entitiesRecentlyAddedOffers: [] as ReadonlyArray<IOffer>,
      totalItemsRecentlyAddedOffers: 0,
    },
    postHomeFeature: {
      loadingEntity: false,
      entity: defaultValue,
      errorMessage: null,
    },
    offerImages: {
      errorMessage: null,
      entitiesExistOfferImages: [],
      loadingExistOfferImages: false,
      totalItemsExistOfferImages: 0,
    },
  });

  const component = render(
    <Provider store={store}>
      <BrowserRouter>{/*<App />*/}</BrowserRouter>
    </Provider>
  );

  const textProject = screen.getAllByText("SRF");
  expect(textProject.length).toBeGreaterThan(0); // Array of  HTMLElement

  // const scrollToTopRouters = component.getByTestId('scroll-to-top-routers');
  // expect(scrollToTopRouters).toBeInTheDocument();

  const divScrollTop = component.getByTestId("back-to-top-anchor");
  expect(divScrollTop).toBeInTheDocument();
});
