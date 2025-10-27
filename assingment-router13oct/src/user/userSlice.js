import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loggedInUser: null,
  },
  reducers: {
    loggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    userLogin: (state, action) => {
      [{ ...state, users: action.payload }];
    },
    userSignup: (state, action) => {
      [{ ...state, users: [...state.users, action.payload] }];
    },
    userLogout: (state, action) => {
      state.users = { ...state.users, isLogin: false };
      console.log("user logout data", action.payload);
    },
  },
});

export const { userLogin, userSignup, userLogout, loggedInUser } =
  userSlice.actions;
export default userSlice.reducer;
