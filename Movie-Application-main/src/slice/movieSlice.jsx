import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "/data.json";

const API_KEY = "2fd9a034";
const TMDB_API_KEY = "e32df389c6a214da047b0c9721fa1840";
const BASE_URL = "https://api.themoviedb.org/3";

const CATEGORY_MOVIES = {
  popular: [
    "Inception",
    "Avatar",
    "The Dark Knight",
    "Interstellar",
    "Avengers: Endgame",
    "Titanic",
    "Gladiator",
    "The Matrix",
    "Jurassic Park",
    "The Shawshank Redemption",
    "The Godfather",
    "Forrest Gump",
    "Spider-Man: No Way Home",
    "Black Panther",
    "The Avengers",
  ],
  horror: [
    "The Conjuring",
    "It",
    "Annabelle",
    "Insidious",
    "A Quiet Place",
    "The Nun",
    "Hereditary",
    "The Exorcist",
    "Paranormal Activity",
    "The Babadook",
    "Sinister",
    "Get Out",
    "The Ring",
    "The Grudge",
    "Scream",
  ],
  comedy: [
    "The Hangover",
    "Superbad",
    "Step Brothers",
    "21 Jump Street",
    "The Mask",
    "Dumb and Dumber",
    "Mean Girls",
    "Ted",
    "The Other Guys",
    "Zombieland",
    "Borat",
    "Tropic Thunder",
    "Anchorman: The Legend of Ron Burgundy",
    "Johnny English",
    "Mr. Bean's Holiday",
  ],
};

const fetchMoviesByTitles = async (titles) => {
  const responses = await Promise.all(
    titles.map(async (title) => {
      const res = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          title
        )}&apikey=${API_KEY}`
      );
      const data = await res.json();
      return data.Response === "True" ? data : null;
    })
  );
  return responses.filter(Boolean);
};

export const fetchMoviesByCategory = createAsyncThunk(
  "movies/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const cached = localStorage.getItem(`movies_${category}`);
      if (cached) return JSON.parse(cached);

      const titles = CATEGORY_MOVIES[category];
      const data = await fetchMoviesByTitles(titles);

      localStorage.setItem(`movies_${category}`, JSON.stringify(data));
      return { category, data };
    } catch (err) {
      return rejectWithValue(err.message);
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
      console.log("klshdkjb",res)

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

const initialState = {
  popular: [],
  horror: [],
  comedy: [],
  searchMovie: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // setSearchMovies: (state, action) => {
    //   state.searchMovie = action.payload;
    // },
    // clearSearch: (state) => {
    //   state.searchMovie = [];
    // },
    clearSearch: (state) => {
      state.searchMovie = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        const category = action.meta.arg;
        state[category] = action.payload;
      })
      .addCase(fetchMoviesByCategory.rejected, (state, action) => {
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
  },
});

export const { setSearchMovies, clearSearch } = movieSlice.actions;
export default movieSlice.reducer;

