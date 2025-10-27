import { createSlice, current } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    currentProduct: [],
  },
  reducers: {
    addProducts: (state, action) => {
      [{ ...state, products: [...state.products, action.payload] }];
    },
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getSelectedProduct: (state, action) => {
      console.log("product details", action.payload);
      state.currentProduct = action.payload;
    },
    editProduct: (state, action) => {
      console.log("redux data", action.payload.id);
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    },
    deletedProduct: (state, action) => {
      const productId = action.payload;
      console.log(productId);
      //   console.log(
      //     "isdnjxzjckjuxn",
      //     state.products.filter((product) =>
      //       product.id === productId ? product : null
      //     )
      //   );
      //   state.products = state.products.filter((product) =>
      //     product.id !== productId ? product : null
      //   );
    },
  },
});

export const {
  getProducts,
  addProducts,
  editProduct,
  deletedProduct,
  getSelectedProduct,
} = productSlice.actions;
export default productSlice.reducer;
