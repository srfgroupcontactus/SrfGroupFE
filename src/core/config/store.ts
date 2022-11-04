import websocketMiddleware from "./websocket-middleware";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./store/root-saga";
import rootReducer from "./store/root-reducer";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware();

const defaultMiddlewares = [sagaMiddleware, websocketMiddleware];

if (process.env.NODE_ENV === "development") {
  defaultMiddlewares.push(logger);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(defaultMiddlewares),
  devTools: process.env.NODE_ENV !== "production",
});

// then run the saga
sagaMiddleware.run(rootSaga);
