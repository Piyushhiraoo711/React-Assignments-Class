import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  addFavorite,
  addRecentMovie,
  removeFavorite,
  removeRecentMovie,
} from "../slice/userSlice";
import Loader from "../features/Loader";
import { useTheme } from "../context/ThemeContext";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useSelector((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchNext, setIsWatchNext] = useState(false);

  const fetchMovie = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e32df389c6a214da047b0c9721fa1840`
      );
      const data = await res.json();
      if (data && data.Response !== "False") {
        setMovie(data);
        console.log("movie details", data);
      } else {
        console.error("Movie not found");
      }
    } catch (err) {
      console.error("Error fetching movie:", err);
    }
  };

  const handleWatchNext = () => {
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

  useEffect(() => {
    fetchMovie();

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

  if (!movie) {
    return <Loader />;
  }

  return (
    <motion.div
      className={`min-h-screen mt-10 flex items-center justify-center p-6 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={`max-w-5xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row ${
          theme === "light" ? "bg-black text-white" : "bg-white text-black"
        }`}
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        whileHover={{
          boxShadow: "0px 0px 20px rgba(255, 255, 0, 0.25)",
        }}
      >
        <motion.img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : "/fallback-image.jpg"
          }
          alt={movie.Title}
          className="w-full md:w-1/3 object-cover brightness-90"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.03 }}
        />

        <motion.div
          className="p-8 flex-1"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h1
            className="text-4xl font-bold mb-3 text-yellow-400"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {movie.Title}
          </motion.h1>

          <div className="space-y-2">
            <p>
              <span className="font-semibold ">Title :</span> {movie.title}
            </p>
            <p>
              <span className="font-semibold ">Year :</span>{" "}
              {movie.release_date}
            </p>
            <p>
              <span className="font-semibold ">Origin:</span>{" "}
              {movie.origin_country || "N/A"}
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
            transition={{ delay: 0.4 }}
          >
            {movie.Plot}
          </motion.p>

          <motion.p
            className="mt-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>Rating: {movie.vote_average || "N/A"}</span>
          </motion.p>

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
            transition={{ delay: 0.6 }}
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
  );
};

export default MovieDetails;
