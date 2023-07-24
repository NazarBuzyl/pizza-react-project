import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../redux/filterSlice";
import cartReducer from "../redux/cartSlice";
import pizzasReducer from "../redux/pizzasSlice";

export const store = configureStore({
  reducer: {
    filterReducer,
    cartReducer,
    pizzasReducer,
  },
});
