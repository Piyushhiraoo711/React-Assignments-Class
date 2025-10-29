import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const TMDB_API_KEY = "e32df389c6a214da047b0c9721fa1840";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=popular&language=en-US&page=1`
      );
      if (!res.ok) throw new Error("Failed to fetch movies");
      const data = await res.json();
      if (data.errorMessage) throw new Error(data.errorMessage);

      localStorage.setItem("popularMovies", JSON.stringify(data.results));

      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHorrorMovies = createAsyncThunk(
  "movies/fetchHorrorMovies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=horror&language=en-US&page=3`
      );
      if (!res.ok) throw new Error("Failed to fetch movies");
      const data = await res.json();
      if (data.errorMessage) throw new Error(data.errorMessage);

      localStorage.setItem("horrorMovies", JSON.stringify(data.results));

      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchComedyMovies = createAsyncThunk(
  "movies/fetchComedyMovies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=comedy&language=en-US&page=1`
      );
      if (!res.ok) throw new Error("Failed to fetch movies");
      const data = await res.json();
      if (data.errorMessage) throw new Error(data.errorMessage);

      localStorage.setItem("comedyMovies", JSON.stringify(data.results));

      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSearchMovies = createAsyncThunk(
  "movies/fetchSearchMovies",
  async (query, { rejectWithValue }) => {
    try {
      if (!query.trim()) return rejectWithValue("Query is empty");

      const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          query
        )}&language=en-US&page=1`
      );
      console.log("klshdkjb", res);

      if (!res.ok) {
        return rejectWithValue(`Error: ${res.status}`);
      }

      const data = await res.json();

      return data.results || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchByGenre = createAsyncThunk(
  "movies/fetchByGenre",
  async ({ genreId, page = 1 }, { rejectWithValue }) => {
    try {
      const url = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`;
      console.log("Fetching:", url);

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch movies");

      const data = await res.json();
      return {
        results: data.results,
        totalPages: data.total_pages,
        currentPage: page,
      };
    } catch (error) {
      console.error("Error fetching by genre:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (pageNumber = 1, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${pageNumber}`
      );

      if (!res.ok) throw new Error("Failed to fetch movies");

      const data = await res.json();
      return {
        results: data.results,
        totalPages: data.total_pages,
        currentPage: pageNumber,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchMoviesSorted = createAsyncThunk(
  "movies/fetchMoviesSorted",
  async (
    { genreId = "", sortBy = "popularity.desc", page = 1 },
    { rejectWithValue }
  ) => {
    try {
      const url = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&page=${page}${
        genreId ? `&with_genres=${genreId}` : ""
      }&sort_by=${sortBy}`;

      console.log("Fetching:", url);

      const response = await axios.get(url);

      if (!response.data || !response.data.results) {
        throw new Error("Invalid data from TMDB");
      }

      return {
        results: response.data.results,
        totalPages: response.data.total_pages,
        currentPage: page,
      };
    } catch (error) {
      console.error("TMDB fetch failed:", error);
      return rejectWithValue(
        error.response?.data?.status_message || error.message
      );
    }
  }
);

const initialState = {
  popular: JSON.parse(localStorage.getItem("popularMovies")) || [],
  horror: JSON.parse(localStorage.getItem("horrorMovies")) || [],
  comedy: JSON.parse(localStorage.getItem("horrorMovies")) || [],
  searchMovie: [],
  discoverMovies: [],
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchMovie = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.discoverMovies = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchByGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.discoverMovies = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchHorrorMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHorrorMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.horror = action.payload;
      })
      .addCase(fetchHorrorMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchComedyMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComedyMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.comedy = action.payload;
      })
      .addCase(fetchComedyMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchSearchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchMovie = action.payload;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.loading = false;
        state.searchMovie = [];
        state.error = action.payload || "Something went wrong";
      });

    builder
      .addCase(fetchMoviesSorted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesSorted.fulfilled, (state, action) => {
        state.loading = false;
        state.discoverMovies = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchMoviesSorted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchMovies, clearSearch } = moviesSlice.actions;
export default moviesSlice.reducer;
