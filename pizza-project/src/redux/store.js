import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../redux/filterSlice";
import cartReducer from "../redux/cartSlice";

export const store = configureStore({
  reducer: {
    filterReducer,
    cartReducer,
  },
});
