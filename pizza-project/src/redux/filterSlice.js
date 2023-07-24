import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  dataSort: {
    value: "popularity",
    sortProperty: "rating",
    orderProperty: "desc",
  },
  searchValue: "",
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
      state.currentPage = 1;
    },
    setDataSort: (state, action) => {
      state.dataSort = action.payload;
      state.currentPage = 1;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.dataSort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
    updateFilters(state, action) {
      state.categoryId = 0;
      state.dataSort = {
        value: "popularity",
        sortProperty: "rating",
        orderProperty: "desc",
      };
      state.searchValue = "";
      state.currentPage = 1;
    },
  },
});

export const selectFilter = (state) => state.filterReducer;

export const {
  setCategoryId,
  setDataSort,
  setSearchValue,
  setCurrentPage,
  setFilters,
  updateFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
