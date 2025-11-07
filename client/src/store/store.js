import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../slices/uiSlices";
export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});
