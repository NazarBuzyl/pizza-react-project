import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunnkAPI) => {
    const {
      currentPage,
      categoryId,
      sortProperty,
      orderProperty,
      searchValue,
    } = params;
    const { data } = await axios.get(
      `https://63fa119d473885d837d7da72.mockapi.io/items?page=${currentPage}&limit=12${
        categoryId > 0 ? `&category=${categoryId}` : ""
      }&sortBy=${sortProperty}&order=${orderProperty}${
        searchValue ? `&search=${searchValue}` : ""
      }`
    );

    console.log(thunnkAPI);
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", //loading, success, error
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const selectPizzasData = (state) => state.pizzasReducer;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
