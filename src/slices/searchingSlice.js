import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const searchSlice = createSlice({
  name: "searching",
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.search = action.payload;
    },
    removeSearch: (state, action) => {
      state.search = "";
    },
  },
});

export const { addSearch, removeSearch } = searchSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectSearching = (state) => state.search;
export default searchSlice.reducer;
