import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// * FLUSH: Flush all pending state to the storage.
// * REHYDRATE: Load the persisted state back into the Redux store.
// * PAUSE: Pause the persistence process.
// * PERSIST: Start the persistence process.
// * PURGE: Wipe out all the persisted state.
// * REGISTER: Register a new persistor.

import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

/**
 * persistReducer: Enhances your root reducer with persistence capabilities.*
 *  middleware: (getDefaultMiddleware) => ...: Customizes the default middleware.
 * serializableCheck: A built-in middleware to check if actions and state are serializable.
 * The configuration here ignores certain actions related to redux-persist to prevent warnings or errors from non-serializable data.
 */
