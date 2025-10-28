import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice.js";
import moviesReducer from "../slice/moviesSlice.js"

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
  },
});

export default store;