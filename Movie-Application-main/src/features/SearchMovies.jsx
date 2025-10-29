import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NotFound from "../features/NotFound.jsx";
import {
  addFavorite,
  addRecentMovie,
  removeFavorite,
  removeRecentMovie,
} from "../slice/userSlice";
import { useTheme } from "../context/ThemeContext";

const SearchMovies = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const { id } = useSelector((state) => state.movies.searchMovie);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const { searchMovie } = useSelector((state) => state.movies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchNext, setIsWatchNext] = useState(false);

  const handleWatchNext = () => {
    console.log(currentUser);
    if (!currentUser) {
      alert("Please login to add Watch Next");
      return;
    }

    if (!movie) return;
    if (isWatchNext) {
      dispatch(removeRecentMovie(movie.id));
    } else {
      dispatch(addRecentMovie(movie));
    }
    setIsWatchNext((prev) => !prev);
  };

  const handleFavorite = () => {
    console.log(currentUser);
    if (!currentUser) {
      alert("Please login to add favorites");
      return;
    }

    if (!movie) return;

    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }

    setIsFavorite((prev) => !prev);
  };

  // if (!searchMovie) {
  //   return <NotFound />;
  // }

  useEffect(() => {
    setMovie(...searchMovie);
    if (currentUser && Array.isArray(currentUser.favorites)) {
      const alreadyFavorite = currentUser.favorites.some(
        (fav) => String(fav.id) === String(id)
      );
      setIsFavorite(alreadyFavorite);
    } else {
      setIsFavorite(false);
    }
    if (currentUser && Array.isArray(currentUser.recentAdd)) {
      const alreadyWatchAdd = currentUser.recentAdd.some(
        (fav) => String(fav.id) === String(id)
      );
      setIsWatchNext(alreadyWatchAdd);
    } else {
      setIsWatchNext(false);
    }
  }, [id, currentUser]);

  return (
    <motion.div
      className={`min-h-screen from-gray-900 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {searchMovie.length === 0 && (
        <motion.p
          className="text-center text-gray-400 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No movies found
        </motion.p>
      )}

      {searchMovie.map((movie, index) => (
        <motion.div
          key={movie.id}
          // onClick={() => navigate(`/movie/${movie.id}`)}
          className="min-h-screen flex items-center justify-center p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            type: "spring",
            stiffness: 80,
          }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className={`max-w-5xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row ${
              theme === "light" ? "bg-black text-white" : "bg-white text-black"
            }`}
            whileHover={{
              boxShadow: "0px 0px 20px rgba(255, 255, 0, 0.25)",
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                  : "/fallback-image.jpg"
              }
              alt={movie.title}
              className="w-full md:w-1/3 object-cover brightness-90"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
            />

            <motion.div
              className="p-8 flex-1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h1
                className="text-4xl font-bold mb-3 text-yellow-400"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {movie.title}
              </motion.h1>

              <div className=" space-y-2">
                <p>
                  <span className="font-semibold ">Year :</span>{" "}
                  {movie.release_date}
                </p>
                <p>
                  <span className="font-semibold ">imdbID :</span>{" "}
                  {movie.id || "N/A"}
                </p>

                <p>
                  <span className="font-semibold ">Language :</span>{" "}
                  {movie.original_language || "N/A"}
                </p>
                <p>
                  <span className="font-semibold ">Overview :</span>{" "}
                  {movie.overview || "N/A"}
                </p>
              </div>

              <motion.p
                className="mt-4 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {movie.Plot}
              </motion.p>

              <motion.p
                className="mt-4 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span>Rating: {movie.vote_average || "N/A"}</span>
              </motion.p>

              {/* {selectedMovie?.id === movie.id && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite();
                  }}
                  className={`mt-4 px-5 py-2 rounded-lg font-semibold transition ${
                    isFavorite
                      ? "bg-red-500 hover:bg-red-400 text-white"
                      : "bg-yellow-400 hover:bg-yellow-300 text-black"
                  }`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </motion.button>
              )} */}
              <motion.button
                onClick={handleFavorite}
                className={`mt-4 px-5 py-2 rounded-lg font-semibold transition ${
                  isFavorite
                    ? "bg-red-500 hover:bg-red-400 text-white"
                    : "bg-yellow-400 hover:bg-yellow-300 text-black"
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </motion.button>

              <motion.button
                onClick={handleWatchNext}
                className={`mt-4 ml-2 px-5 py-2 rounded-lg font-semibold transition ${
                  isWatchNext
                    ? "bg-red-500 hover:bg-red-400 text-white"
                    : "bg-yellow-400 hover:bg-yellow-300 text-black"
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {isWatchNext ? "Remove from watch next" : "Add to watch next"}
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/"
                  className="inline-block font-semibold mt-4 px-5 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 "
                >
                  Back to Home
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SearchMovies;
