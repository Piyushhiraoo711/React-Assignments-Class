import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice.js";
import movieReducer from "../slice/movieSlice.jsx"

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
  },
});

export default store;