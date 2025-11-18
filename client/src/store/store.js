import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../slices/uiSlices";
import { api } from "../api/apiSlice";
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
