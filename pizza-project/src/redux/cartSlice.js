import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const updateTotalStates = (state, action) => {
  state.totalPrice = state.items.reduce((acc, item) => {
    return acc + item.price * item.count;
  }, 0);

  state.totalCount = state.items.reduce((acc, item) => {
    return acc + item.count;
  }, 0);
};

export const filterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!findItem) {
        state.items.push({ ...action.payload, count: 1 });
      } else findItem.count++;

      updateTotalStates(state);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      updateTotalStates(state);
    },
    clearItems: (state, action) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
    minusItem: (state, action) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      findItem.count--;

      if (!findItem.count > 0)
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );

      updateTotalStates(state);
    },
  },
});

export const selectCart = (state) => state.cartReducer;
export const selectCartItemById =
  (id, activeIndexType, activeIndexSize) => (state) =>
    state.cartReducer.items.find(
      (obj) => obj.id === `${id}#${activeIndexType}#${activeIndexSize}`
    );

export const { addItem, removeItem, clearItems, minusItem } =
  filterSlice.actions;

export default filterSlice.reducer;
