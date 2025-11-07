import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  isSidebarCollapsed: false,
};

const uiSlices = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode } = uiSlices.actions;
export default uiSlices.reducer;
