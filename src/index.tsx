import React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { store } from "./core/config/store";
import { Provider } from "react-redux";
import setupAxiosInterceptors from "./core/config/axios-interceptor";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.css";
import { App } from "./App";
import { logout } from "./main-features/user/store/slice";

// Store initialize
// const store = initStore;
// const actions = bindActionCreators({ clearAuthentication}, store.dispatch);

const storeApp = store;
setupAxiosInterceptors(() => storeApp.dispatch(logout({})));

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={storeApp}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
