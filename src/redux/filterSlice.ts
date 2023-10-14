import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export enum Sort {
  PRICE = "price",
  NAME = "name",
  RATING = "rating",
}

export enum Order {
  ASC = "asc",
  DESC = "desc",
}

export type DataSort = {
  value: string;
  sortProperty: Sort;
  orderProperty: Order;
};

interface FilterSliceState {
  categoryId: number;
  dataSort: DataSort;
  searchValue: string;
  currentPage: number;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  dataSort: {
    value: "popularity",
    sortProperty: Sort.RATING,
    orderProperty: Order.DESC,
  },
  searchValue: "",
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
      state.currentPage = 1;
    },
    setDataSort: (state, action: PayloadAction<DataSort>) => {
      state.dataSort = action.payload;
      state.currentPage = 1;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.dataSort = action.payload.dataSort;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
    updateFilters(state) {
      state.categoryId = 0;
      state.dataSort = {
        value: "popularity",
        sortProperty: Sort.RATING,
        orderProperty: Order.DESC,
      };
      state.searchValue = "";
      state.currentPage = 1;
    },
  },
});

export const selectFilter = (state: RootState) => state.filterReducer;

export const {
  setCategoryId,
  setDataSort,
  setSearchValue,
  setCurrentPage,
  setFilters,
  updateFilters,
} = filterSlice.actions;

export default filterSlice.reducer;

export const sortList: Array<DataSort> = [
  { value: "popularity", sortProperty: Sort.RATING, orderProperty: Order.DESC },
  {
    value: "price: high to low",
    sortProperty: Sort.PRICE,
    orderProperty: Order.DESC,
  },
  {
    value: "price: low to high",
    sortProperty: Sort.PRICE,
    orderProperty: Order.ASC,
  },
  {
    value: "alphabetical: A-Z",
    sortProperty: Sort.NAME,
    orderProperty: Order.ASC,
  },
  {
    value: "alphabetical: Z-A",
    sortProperty: Sort.NAME,
    orderProperty: Order.DESC,
  },
];
