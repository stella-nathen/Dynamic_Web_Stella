import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",

  initialState: {
    colourFilter: "all",
    showOnlyFavourites: false,
  },

  reducers: {
    filterChanged(state, action) {
      state.colourFilter = action.payload;
    },

    favouritesOnlyToggled(state) {
      state.showOnlyFavourites = !state.showOnlyFavourites;
    },
  },
});

export const { filterChanged, favouritesOnlyToggled } = uiSlice.actions;

export const selectColourFilter = (state) => state.ui.colourFilter;

export const selectShowOnlyFavourites = (state) => state.ui.showOnlyFavourites;

export default uiSlice.reducer;
