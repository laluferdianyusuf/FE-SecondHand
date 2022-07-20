import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import searchingReducer from "../slices/searchingSlice";
import productReducer from "../slices/productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchingReducer,
    product: productReducer,
  },
});
