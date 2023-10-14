import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type CartItemType= {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  type: number;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: CartItemType[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const updateTotalStates = (state: CartSliceState) => {
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
    addItem: (state, action: PayloadAction<CartItemType>) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!findItem) {
        state.items.push({ ...action.payload, count: 1 });
      } else findItem.count++;

      updateTotalStates(state);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (findItem) {
        findItem.count--;

        if (findItem.count === 0)
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
      }

      updateTotalStates(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      updateTotalStates(state);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cartReducer;
export const selectCartItemById =
  (id: string, activeIndexType: number, activeIndexSize: number) =>
  (state: RootState) =>
    state.cartReducer.items.find(
      (obj) => obj.id === `${id}#${activeIndexType}#${activeIndexSize}`
    );

export const { addItem, removeItem, clearItems, minusItem } =
  filterSlice.actions;

export default filterSlice.reducer;
