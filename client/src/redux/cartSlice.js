import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartQuantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.cartQuantity += 1; // cart quantity
      state.quantity = action.payload.quantity;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity; // product quantity
      state.title = action.payload.title;
      state.unit_price = action.payload.price;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
