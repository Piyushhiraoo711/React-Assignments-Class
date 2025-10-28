import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3000/users";

const saveToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}?username=${userData.username}`);
      const existing = await res.json();
      if (existing.length > 0) return rejectWithValue("User already exists");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, isLogin: false }),
      });
      const newUser = await response.json();

      const usersRes = await fetch(API_URL);
      const allUsers = await usersRes.json();
      await Promise.all(
        allUsers.map((u) =>
          fetch(`${API_URL}/${u.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isLogin: false }),
          })
        )
      );

      const loginRes = await fetch(`${API_URL}/${newUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isLogin: true }),
      });
      const loggedInUser = await loginRes.json();

      const updatedUsers = allUsers
        .filter((u) => u.id !== loggedInUser.id)
        .concat(loggedInUser);
      saveToLocalStorage(updatedUsers);

      return loggedInUser;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(API_URL);
      const users = await res.json();

      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) return rejectWithValue("Invalid username or password");

      await Promise.all(
        users.map((u) =>
          fetch(`${API_URL}/${u.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isLogin: false }),
          })
        )
      );

      const loginRes = await fetch(`${API_URL}/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isLogin: true }),
      });
      const updatedUser = await loginRes.json();

      const updatedUsers = users.map((u) =>
        u.id === updatedUser.id ? updatedUser : { ...u, isLogin: false }
      );
      saveToLocalStorage(updatedUsers);

      return updatedUser;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "users/logoutUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isLogin: false }),
      });
      const data = await res.json();

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.id === data.id ? { ...u, isLogin: false } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addFavorite = createAsyncThunk(
  "user/addFavorite",
  async (movie, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const currentUser = state.user.currentUser;

      if (!currentUser) return rejectWithValue("User not logged in");

      const exists = currentUser.favorites?.some((m) => m.id === movie.id);
      if (exists) return currentUser;

      const updatedFavorites = currentUser.favorites
        ? [...currentUser.favorites, movie]
        : [movie];

      const res = await fetch(`http://localhost:3000/users/${currentUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorites: updatedFavorites }),
      });

      const data = await res.json();

      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = allUsers.map((u) =>
        u.id === currentUser.id ? { ...data } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(data));

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "user/removeFavorite",
  async (movieId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const currentUser = state.user.currentUser;

      if (!currentUser) return rejectWithValue("User not logged in");

      const updatedFavorites = currentUser.favorites?.filter(
        (m) => m.id !== movieId
      );

      const res = await fetch(`http://localhost:3000/users/${currentUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorites: updatedFavorites }),
      });

      const data = await res.json();

      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = allUsers.map((u) =>
        u.id === currentUser.id ? { ...data } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(data));

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addRecentMovie = createAsyncThunk(
  "user/addRecentMovie",
  async (movie, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const currentUser = state.user.currentUser;

      if (!currentUser) return rejectWithValue("User not logged in");

      const exists = currentUser.recentAdd?.some((m) => m.id === movie.id);
      if (exists) return currentUser;

      const updatedRecent = currentUser.recentAdd
        ? [...currentUser.recentAdd, movie]
        : [movie];

      const res = await fetch(`http://localhost:3000/users/${currentUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recentAdd: updatedRecent }),
      });

      const data = await res.json();

      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = allUsers.map((u) =>
        u.id === currentUser.id ? { ...data } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(data));

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeRecentMovie = createAsyncThunk(
  "user/removeRecentMovie",
  async (movieId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const currentUser = state.user.currentUser;

      if (!currentUser) return rejectWithValue("User not logged in");

      const updatedRecent = currentUser.recentAdd?.filter(
        (m) => m.id !== movieId
      );

      const res = await fetch(`http://localhost:3000/users/${currentUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recentAdd: updatedRecent }),
      });

      const data = await res.json();

      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = allUsers.map((u) =>
        u.id === currentUser.id ? { ...data } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("currentUser", JSON.stringify(data));

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  currentUser:
    JSON.parse(localStorage.getItem("users"))?.find((u) => u.isLogin) || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearRecentMovies: (state) => {
      if (state.currentUser) {
        state.currentUser.recentAdd = [];
        const updatedUsers = state.users.map((u) =>
          u.id === state.currentUser.id ? state.currentUser : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.currentUser = action.payload;
        saveToLocalStorage(state.users);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.users = state.users.map((u) =>
          u.id === action.payload.id ? action.payload : { ...u, isLogin: false }
        );
        saveToLocalStorage(state.users);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;

        state.currentUser = null;

        state.users = state.users.map((u) =>
          u.id === action.payload.id ? { ...u, isLogin: false } : u
        );

        localStorage.setItem("users", JSON.stringify(state.users));
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });

    builder
      .addCase(addRecentMovie.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(removeRecentMovie.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const { setCurrentUser, clearRecentMovies } = userSlice.actions;
export default userSlice.reducer;
