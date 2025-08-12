import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
  REGISTER,
  FLUSH,
  PAUSE,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import moviesReducers from "./slices/moviesSlice";
import adminReducers from "./slices/adminSlice";
import userReducers from "./slices/userSlice";
import authReducers from "./slices/authSlice";

// combine all reducers
const rootReducer = combineReducers({
  admin: adminReducers,
  user: userReducers,
  auth: authReducers,
  movies: moviesReducers,
});

// persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// warp rootreducer with persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [PERSIST, REHYDRATE, REGISTER, FLUSH, PAUSE, PURGE],
      },
    });
  },
});

// create persistor
export const persistor = persistStore(store);
