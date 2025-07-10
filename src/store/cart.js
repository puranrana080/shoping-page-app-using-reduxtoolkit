import { createSlice } from "@reduxjs/toolkit";
const initialCartState = { items: [], totalQuantity: 0, changed: false };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.changed = true;
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
          description: newItem.description,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    increaseItemQuantity(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      existingItem.quantity++;
      state.totalQuantity++;

      existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
    },
    removeItemFromCart(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      state.totalQuantity--;
      state.changed = true;
      if (!existingItem) return;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== itemId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
