import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

type FetchPizzasArgs = {
  currentPage: number;
  categoryId: number;
  sortProperty: string;
  orderProperty: string;
  searchValue: string;
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>(
  "pizza/fetchPizzasStatus",
  async (params) => {
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

    return data;
  }
);
type PizzaItem = {
  id: string;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (bilder) => {
    bilder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    bilder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });

    bilder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzasData = (state: RootState) => state.pizzasReducer;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
