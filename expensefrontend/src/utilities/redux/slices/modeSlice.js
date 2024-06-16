import { createSlice } from "@reduxjs/toolkit";
const initalModeSlice = { darkMode: false };
const modeSlice = createSlice({
  name: "mode",
  initialState: initalModeSlice,
  reducers: {
    toggleMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const toggleActions = modeSlice.actions;
export const selectDarkMode = (state) => state.mode.darkMode;
export default modeSlice;
