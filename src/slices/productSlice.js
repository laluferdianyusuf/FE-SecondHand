import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.alert = action.payload;
    },
    removeProuct: (state, action) => {
      state.alert = "";
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectProduct = (state) => state.product;
export default productSlice.reducer;
