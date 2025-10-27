import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../products/productSlice.js";
import userReducer from "../user/userSlice.js";

const store = configureStore({
  reducer: {
    products: productReducer,
    users: userReducer,
  },
});

export default store;
