import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../redux/filterSlice";

export const store = configureStore({
  reducer: {
    filterReducer,
  },
});
