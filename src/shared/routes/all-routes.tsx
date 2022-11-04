import React from "react";
import { Routes, Route } from "react-router-dom";
import { ALL_APP_ROUTES } from "../../core/config/all-app-routes";
// import {IAppProps} from "../../App";
import { PublicRoute } from "./public-route";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { allSessionSelector } from "../../main-features/user/store/slice";
import { PrivateRoute } from "./private-route";

const LazyHome = React.lazy(() => import("../../main-features/home/home"));
const LazySignUp = React.lazy(
  () => import("../../main-features/user/components/sign-up/sign-up")
);
const LazySignIn = React.lazy(
  () => import("../../main-features/user/components/sign-in/sign-in")
);
const LazySearch = React.lazy(
  () => import("../../main-features/offer/components/search/search")
);
const LazyContactUs = React.lazy(
  () => import("../../main-features/contact-us/components/contact-us")
);
const LazyFaq = React.lazy(
  () => import("../../main-features/faq/components/faq")
);
const LazyAboutUs = React.lazy(
  () => import("../../main-features/aboutus/components/about-us")
);
const LazyAddUpdateOffer = React.lazy(
  () => import("../../main-features/offer/components/add-update/add-update")
);
const LazyMyOffers = React.lazy(
  () => import("../../main-features/offer/components/my-offers/my-offers")
);
const LazyDetailsOffer = React.lazy(
  () =>
    import("../../main-features/offer/components/details-offer/details-offer")
);
const LazyAccount = React.lazy(
  () => import("../../main-features/user/components/account/account")
);
const LazyNotification = React.lazy(
  () => import("../../main-features/notification/components/notification")
);
const LazyChat = React.lazy(
  () => import("../../main-features/chat/components/chat")
);
const LazyFavoriteUser = React.lazy(
  () =>
    import(
      "../../main-features/favorite/components/favorite-users/favorite-users"
    )
);
const LazyCart = React.lazy(
  () => import("../../main-features/cart/components/cart")
);
const LazyOrder = React.lazy(
    () => import("../../main-features/cart/components/list_orders")
);

const LazyRentRequest = React.lazy(
    () => import("../../main-features/rent-request/components/rent_request")
);

const LazyProfile = React.lazy(
  () => import("../../main-features/user/components/profile/profile")
);
const LazyForgotPasswordInit = React.lazy(
  () =>
    import(
      "../../main-features/user/components/forgot-password/forgot-password-init"
    )
);
const LazyForgotPasswordFinish = React.lazy(
  () =>
    import(
      "../../main-features/user/components/forgot-password/forgot-password-finish"
    )
);
const LazyActivationAccount = React.lazy(
  () =>
    import(
      "../../main-features/user/components/activation-account/activation-account"
    )
);


export default function AllRoutes() {
  const { isAuthenticated } = useSelector(allSessionSelector);

  return (
    <Box>
      <Routes>
        <Route
          path={ALL_APP_ROUTES.HOME}
          element={
            <React.Suspense fallback={<>...</>}>
              <LazyHome />
            </React.Suspense>
          }
        />

        <Route
          path="*"
          element={
            <React.Suspense fallback={<>...</>}>
              <LazyHome />
            </React.Suspense>
          }
        />

        <Route
          path={ALL_APP_ROUTES.REGISTER}
          element={
            <PublicRoute
              isAuthenticated={isAuthenticated}
              path={ALL_APP_ROUTES.REGISTER}
            >
              <React.Suspense fallback={<>...</>}>
                <LazySignUp />
              </React.Suspense>
            </PublicRoute>
          }
        />

        <Route
          path={ALL_APP_ROUTES.LOGIN}
          element={
            <PublicRoute
              isAuthenticated={isAuthenticated}
              path={ALL_APP_ROUTES.LOGIN}
            >
              <React.Suspense fallback={<>...</>}>
                <LazySignIn />
              </React.Suspense>
            </PublicRoute>
          }
        />

        <Route
          path={ALL_APP_ROUTES.FORGOT_PASSWORD_INIT}
          element={
            <PublicRoute
              isAuthenticated={isAuthenticated}
              path={ALL_APP_ROUTES.FORGOT_PASSWORD_INIT}
            >
              <React.Suspense fallback={<>...</>}>
                <LazyForgotPasswordInit />
              </React.Suspense>
            </PublicRoute>
          }
        />

        <Route
          path={ALL_APP_ROUTES.FORGOT_PASSWORD_FINISH}
          element={
            <PublicRoute
              isAuthenticated={isAuthenticated}
              path={ALL_APP_ROUTES.FORGOT_PASSWORD_FINISH}
            >
              <React.Suspense fallback={<>...</>}>
                <LazyForgotPasswordFinish />
              </React.Suspense>
            </PublicRoute>
          }
        />

        <Route
          path={ALL_APP_ROUTES.SEARCH}
          element={
            <React.Suspense fallback={<>...</>}>
              <LazySearch />
            </React.Suspense>
          }
        />

        <Route
          path={ALL_APP_ROUTES.SUPPORT.CONTACT_US}
          element={
            <React.Suspense fallback={<>...</>}>
              <LazyContactUs />
            </React.Suspense>
          }
        />

        <Route
          path={ALL_APP_ROUTES.SUPPORT.FAQ}
          element={
            <React.Suspense fallback={<>...</>}>
              <LazyFaq />
            </React.Suspense>
          }
        />

        <Route
          path={ALL_APP_ROUTES.SUPPORT.ABOUT_US}
          element={
            <React.Suspense fallback={<>...</>}>
              <LazyAboutUs />
            </React.Suspense>
          }
        />

        <Route
          path={ALL_APP_ROUTES.OFFER.ADD_UPDATE_OFFER}
          element={
            <React.Suspense fallback={<>...</>}>
              <LazyAddUpdateOffer />
            </React.Suspense>
          }
        />

        <Route
          path={ALL_APP_ROUTES.ADD_UPDATE_OFFER + "/:id/edit"}
          element={
            <React.Suspense fallback={<>...</>}>
              <LazyAddUpdateOffer />
            </React.Suspense>
          }
        />

        <Route
          path={ALL_APP_ROUTES.OFFER.MY_OFFERS}
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              path={ALL_APP_ROUTES.LOGIN}
            >
              <React.Suspense fallback={<>...</>}>
                <LazyMyOffers />
              </React.Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path={ALL_APP_ROUTES.DETAILS_OFFER + "/:id"}
          element={
            <React.Suspense fallback={<>...</>}>
              <LazyDetailsOffer />
            </React.Suspense>
          }
        />

        <Route
          path={ALL_APP_ROUTES.ACCOUNT}
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              path={ALL_APP_ROUTES.LOGIN}
            >
              <React.Suspense fallback={<>...</>}>
                <LazyAccount />
              </React.Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path={ALL_APP_ROUTES.NOTIFICATION.LIST}
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              path={ALL_APP_ROUTES.LOGIN}
            >
              <React.Suspense fallback={<>...</>}>
                <LazyNotification />
              </React.Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path={ALL_APP_ROUTES.CHAT.LIST}
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              path={ALL_APP_ROUTES.LOGIN}
            >
              <React.Suspense fallback={<>...</>}>
                <LazyChat />
              </React.Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path={ALL_APP_ROUTES.FAVORITE.USER}
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              path={ALL_APP_ROUTES.LOGIN}
            >
              <React.Suspense fallback={<>...</>}>
                <LazyFavoriteUser />
              </React.Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path={ALL_APP_ROUTES.CART.LIST}
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              path={ALL_APP_ROUTES.LOGIN}
            >
              <React.Suspense fallback={<>...</>}>
                <LazyCart />
              </React.Suspense>
            </PrivateRoute>
          }
        />

        <Route
          path={ALL_APP_ROUTES.ORDER.LIST}
          element={
              <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  path={''}
              >
                  <React.Suspense fallback={<>...</>}>
                      <LazyOrder />
                  </React.Suspense>
              </PrivateRoute>
          }
        />

        <Route
          path={ALL_APP_ROUTES.RENT_REQUEST.LIST}
          element={
              <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  path={''}
              >
                  <React.Suspense fallback={<>...</>}>
                      <LazyRentRequest />
                  </React.Suspense>
              </PrivateRoute>
          }
        />

        <Route
          path={ALL_APP_ROUTES.PROFILE + "/:id"}
          element={
            <React.Suspense fallback={<>...</>}>
              <LazyProfile />
            </React.Suspense>
          }
        />

        <Route
          path={`${ALL_APP_ROUTES.ACTIVATION_ACCOUNT}`}
          element={
            <PublicRoute
              isAuthenticated={isAuthenticated}
              path={`${ALL_APP_ROUTES.ACTIVATION_ACCOUNT}/:key`}
            >
              <React.Suspense fallback={<>...</>}>
                <LazyActivationAccount />
              </React.Suspense>
            </PublicRoute>
          }
        />

        {/*<Route*/}
        {/*    path={`${ALL_APP_ROUTES.ACTIVATION_ACCOUNT}/:key?`}*/}
        {/*    element={*/}
        {/*        <PublicRoute isAuthenticated={props.isAuthenticated}  path={ALL_APP_ROUTES.LOGIN}>*/}
        {/*            <React.Suspense fallback={<>...</>}>*/}
        {/*                <LazyActivationAccount />*/}
        {/*            </React.Suspense>*/}
        {/*        </PublicRoute>*/}
        {/*    }*/}
        {/*/>*/}

        {/*<Route*/}
        {/*    path={ALL_APP_ROUTES.FORGOT_PASSWORD_INIT}*/}
        {/*    element={*/}
        {/*        <PublicRoute isAuthenticated={props.isAuthenticated}  path={ALL_APP_ROUTES.LOGIN}>*/}
        {/*            <React.Suspense fallback={<>...</>}>*/}
        {/*                <LazyForgotPassword />*/}
        {/*            </React.Suspense>*/}
        {/*        </PublicRoute>*/}
        {/*    }*/}
        {/*/>*/}

        {/*<Route*/}
        {/*    path={`${ALL_APP_ROUTES.FORGOT_PASSWORD_FINISH}/:key?`}*/}
        {/*    element={*/}
        {/*        <PublicRoute isAuthenticated={props.isAuthenticated}  path={ALL_APP_ROUTES.LOGIN}>*/}
        {/*            <React.Suspense fallback={<>...</>}>*/}
        {/*                <LazyForgotPasswordFinish />*/}
        {/*            </React.Suspense>*/}
        {/*        </PublicRoute>*/}
        {/*    }*/}
        {/*/>*/}

        {/*<Route*/}
        {/*    path={ALL_APP_ROUTES.SEARCH}*/}
        {/*    element={*/}
        {/*        <React.Suspense fallback={<>...</>}>*/}
        {/*            <LazySearch />*/}
        {/*        </React.Suspense>*/}
        {/*    }*/}
        {/*/>*/}

        {/*<Route*/}
        {/*    path={ALL_APP_ROUTES.ADD_UPDATE_OFFER}*/}
        {/*    element={*/}
        {/*        <React.Suspense fallback={<>...</>}>*/}
        {/*            <LazyAddUpdateOffer />*/}
        {/*        </React.Suspense>*/}
        {/*    }*/}
        {/*/>*/}

        {/*<Route*/}
        {/*    path={ALL_APP_ROUTES.DETAILS_OFFER + '/:id'}*/}
        {/*    element={*/}
        {/*        <React.Suspense fallback={<>...</>}>*/}
        {/*            <LazyDetailsOffer />*/}
        {/*        </React.Suspense>*/}
        {/*    }*/}
        {/*/>*/}

        {/*<Route*/}
        {/*    path={ALL_APP_ROUTES.PROFILE + '/:id'}*/}
        {/*    element={*/}
        {/*        <React.Suspense fallback={<>...</>}>*/}
        {/*            <LazyProfile />*/}
        {/*        </React.Suspense>*/}
        {/*    }*/}
        {/*/>*/}

        {/*<Route*/}
        {/*    path={ALL_APP_ROUTES.ACCOUNT}*/}
        {/*    element={*/}
        {/*        <PrivateRoute isAuthenticated={props.isAuthenticated}  path={ALL_APP_ROUTES.LOGIN}>*/}
        {/*            <React.Suspense fallback={<>...</>}>*/}
        {/*                <LazyAccount />*/}
        {/*            </React.Suspense>*/}
        {/*        </PrivateRoute>*/}
        {/*    }*/}
        {/*/>*/}

        {/*<Route*/}
        {/*    path={ALL_APP_ROUTES.OFFER.MY_OFFERS}*/}
        {/*    element={*/}
        {/*        <PrivateRoute isAuthenticated={props.isAuthenticated}  path={ALL_APP_ROUTES.LOGIN}>*/}
        {/*            <React.Suspense fallback={<>...</>}>*/}
        {/*                <LazyMyOffers />*/}
        {/*            </React.Suspense>*/}
        {/*        </PrivateRoute>*/}
        {/*    }*/}
        {/*/>*/}

        {/*<Route*/}
        {/*    path={ALL_APP_ROUTES.FAVORITE.USER}*/}
        {/*    element={*/}
        {/*        <PrivateRoute isAuthenticated={props.isAuthenticated}  path={ALL_APP_ROUTES.LOGIN}>*/}
        {/*            <React.Suspense fallback={<>...</>}>*/}
        {/*                <LazyFavoriteUser />*/}
        {/*            </React.Suspense>*/}
        {/*        </PrivateRoute>*/}
        {/*    }*/}
        {/*/>*/}

        {/*<Route*/}
        {/*    path={ALL_APP_ROUTES.CART.LIST}*/}
        {/*    element={*/}
        {/*        <PrivateRoute isAuthenticated={props.isAuthenticated}  path={ALL_APP_ROUTES.LOGIN}>*/}
        {/*            <React.Suspense fallback={<>...</>}>*/}
        {/*                <LazyCart />*/}
        {/*            </React.Suspense>*/}
        {/*        </PrivateRoute>*/}
        {/*    }*/}
        {/*/>*/}

        {/*<Route*/}
        {/*    path={ALL_APP_ROUTES.CHAT.LIST}*/}
        {/*    element={*/}
        {/*        <PrivateRoute isAuthenticated={props.isAuthenticated}  path={ALL_APP_ROUTES.LOGIN}>*/}
        {/*            <React.Suspense fallback={<>...</>}>*/}
        {/*                <LazyChat />*/}
        {/*            </React.Suspense>*/}
        {/*        </PrivateRoute>*/}
        {/*    }*/}
        {/*/>*/}

        {/*<Route*/}
        {/*    path={ALL_APP_ROUTES.NOTIFICATION.LIST}*/}
        {/*    element={*/}
        {/*        <PrivateRoute isAuthenticated={props.isAuthenticated}  path={ALL_APP_ROUTES.LOGIN}>*/}
        {/*            <React.Suspense fallback={<>...</>}>*/}
        {/*                <LazyNotification />*/}
        {/*            </React.Suspense>*/}
        {/*        </PrivateRoute>*/}
        {/*    }*/}
        {/*/>*/}

        {/*<Route path={ALL_APP_ROUTES.SUPPORT.CONTACT_US}*/}
        {/*       element={*/}
        {/*           <React.Suspense fallback={<>...</>}>*/}
        {/*               <LazyContactUs />*/}
        {/*           </React.Suspense>*/}
        {/*       } />*/}

        {/*<Route path={ALL_APP_ROUTES.SUPPORT.FAQ}*/}
        {/*       element={*/}
        {/*           <React.Suspense fallback={<>...</>}>*/}
        {/*               <LazyFaq />*/}
        {/*           </React.Suspense>*/}
        {/*       } />*/}

        {/*<Route path={ALL_APP_ROUTES.SUPPORT.ABOUT_US}*/}
        {/*       element={*/}
        {/*           <React.Suspense fallback={<>...</>}>*/}
        {/*               <LazyAboutUs />*/}
        {/*           </React.Suspense>*/}
        {/*       } />*/}

        {/*<Route path="/about" element={<About />} />*/}
        {/*<Route path="/posts" element={<Posts />}>*/}
        {/*    <Route path="list" element={<PostLists />} />*/}
        {/*    <Route path=":slug" element={<Post />} />*/}
        {/*</Route>*/}
      </Routes>
    </Box>
    // /*
    // <Routes>
    //     <Route index element={<Home />} />
    //     {/*<Route path={ALL_APP_ROUTES.HOME}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyHome />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</Route>*/}
    //
    //     {/*<PublicRoute isAuthenticated={props.isAuthenticated}  path={ALL_APP_ROUTES.REGISTER}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazySignUp />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</PublicRoute>*/}
    //
    //     {/*<PublicRoute isAuthenticated={props.isAuthenticated} path={ALL_APP_ROUTES.LOGIN} >*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazySignIn />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</PublicRoute>*/}
    //
    //     {/*<PublicRoute isAuthenticated={props.isAuthenticated} path={`${ALL_APP_ROUTES.ACTIVATION_ACCOUNT}/:key?`}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyActivationAccount />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</PublicRoute>*/}
    //
    //     {/*<Route path={ALL_APP_ROUTES.SEARCH}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazySearch />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</Route>*/}
    //
    //     {/*<Route path={ALL_APP_ROUTES.ADD_UPDATE_OFFER}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyAddUpdateOffer />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</Route>*/}
    //
    //     {/*<Route path={ALL_APP_ROUTES.ADD_UPDATE_OFFER + '/:id/edit'}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyAddUpdateOffer />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</Route>*/}
    //
    //     {/*<Route path={ALL_APP_ROUTES.DETAILS_OFFER + '/:id'}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyDetailsOffer />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</Route>*/}
    //     {/*<Route path={ALL_APP_ROUTES.PROFILE + '/:id'}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyProfile />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</Route>*/}
    //
    //     {/*<PrivateRoute isAuthenticated={props.isAuthenticated} path={ALL_APP_ROUTES.ACCOUNT}>*/}
    //     {/*    <Route path={ALL_APP_ROUTES.ACCOUNT}>*/}
    //     {/*        <React.Suspense fallback={<>...</>}>*/}
    //     {/*            <LazyAccount/>*/}
    //     {/*        </React.Suspense>*/}
    //     {/*    </Route>*/}
    //     {/*</PrivateRoute>*/}
    //
    //     {/*<Route path={ALL_APP_ROUTES.SUPPORT.CONTACT_US}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyContactUs />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</Route>*/}
    //     {/*<Route path={ALL_APP_ROUTES.SUPPORT.ABOUT_US}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyAboutUs />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</Route>*/}
    //     {/*<Route path={ALL_APP_ROUTES.SUPPORT.FAQ}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyFaq />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</Route>*/}
    //
    //     {/*<PrivateRoute isAuthenticated={props.isAuthenticated} path={ALL_APP_ROUTES.OFFER.MY_OFFERS}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyMyOffers />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</PrivateRoute>*/}
    //
    //     {/*<PrivateRoute isAuthenticated={props.isAuthenticated} path={ALL_APP_ROUTES.FAVORITE.USER}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyFavoriteUser />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</PrivateRoute>*/}
    //
    //     {/*<PrivateRoute isAuthenticated={props.isAuthenticated} path={ALL_APP_ROUTES.CHAT.LIST}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyChat />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</PrivateRoute>*/}
    //
    //     {/*<PrivateRoute isAuthenticated={props.isAuthenticated} path={ALL_APP_ROUTES.NOTIFICATION.LIST}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyNotification />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</PrivateRoute>*/}
    //
    //     {/*<PublicRoute isAuthenticated={props.isAuthenticated} path={ALL_APP_ROUTES.FORGOT_PASSWORD_INIT} >*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyForgotPassword />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</PublicRoute>*/}
    //
    //     {/*<PublicRoute isAuthenticated={props.isAuthenticated} path={`${ALL_APP_ROUTES.FORGOT_PASSWORD_FINISH}/:key?`}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyForgotPasswordFinish />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</PublicRoute>*/}
    //
    //     {/*<PrivateRoute isAuthenticated={props.isAuthenticated} path={ALL_APP_ROUTES.CART.LIST}>*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyCart />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</PrivateRoute>*/}
    //
    //     {/*<Route path="*">*/}
    //     {/*    <React.Suspense fallback={<>...</>}>*/}
    //     {/*        <LazyHome />*/}
    //     {/*    </React.Suspense>*/}
    //     {/*</Route>*/}
    //
    //     {/*<Route path="*">*/}
    //         {/*<Home />*/}
    //     {/*</Route>*/}
    // {/*</Routes>*/}
  );
}
