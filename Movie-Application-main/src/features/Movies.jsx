import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchByGenre,
  fetchMovies,
  fetchMoviesSorted,
} from "../slice/moviesSlice";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [genre, setGenre] = useState("");
  const [sortBy, setSortBy] = useState("");
  const { discoverMovies, loading, totalPages } = useSelector(
    (state) => state.movies
  );

  const genresList = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  useEffect(() => {
    if (genre) {
      dispatch(fetchByGenre({ genreId: genre, page }));
    } else if (sortBy) {
      dispatch(fetchMoviesSorted({ sortBy, page }));
    } else {
      dispatch(fetchMovies(page));
    }
  }, [genre, sortBy, page, dispatch]);

  const renderPagination = () => {
    const buttons = [];
    const maxButtons = 4;
    let startPage = Math.max(1, page - 1);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (page > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 rounded-md mx-1 bg-gray-700 text-white"
        >
          &lt;
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded-md mx-1 ${
            i === page ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"
          }`}
        >
          {i}
        </button>
      );
    }

    if (page < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 rounded-md mx-1 bg-gray-700 text-white"
        >
          &gt;
        </button>
      );
    }

    return buttons;
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark" ? " bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
      {loading && <p className="text-center">Loading...</p>}

      <div className="flex justify-center">
        <div className="mt-20">
          <div
            className="lex flex-col sm:flex-row items-center justify-center w-60
            gap-2 "
          >
            <label className="text-center sm:text-left">Sort By :</label>
            <select
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
              name="genre"
              className={`p-2 ml-1 border border-white ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <option value="" className="">
                Filter by Genre
              </option>
              {genresList.map((g) => (
                <option
                  className="text-gray-700  dark:text-gray-200 bg-white dark:bg-gray-800"
                  key={g.id}
                  value={g.id}
                >
                  {g.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-20">
          <div
            className="lex flex-col sm:flex-row items-center justify-center w-60
            gap-2 "
          >
            <label className="text-center sm:text-left">Sort By :</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`p-2 ml-1 border border-white ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <option value="" className="">
                Select
              </option>
              <option value="vote_average.desc">Highest Rated</option>
              <option value="vote_average.asc">Lowest Rated</option>
              <option value="release_date.desc">Newest</option>
              <option value="release_date.asc">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
        {discoverMovies.map((movie) => (
          <div
            key={movie.id}
            className="rounded-lg overflow-hidden"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/fallback.jpg"
              }
              alt={movie.title}
              className="w-full h-[300px] object-contain bg-black"
            />
            <p
              className="mt-2 text-center font-semibold truncate"
              title={movie.title}
            >
              {movie.title}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">{renderPagination()}</div>
    </div>
  );
};

export default Movies;
