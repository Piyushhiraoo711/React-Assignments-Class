import React from "react";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../redux/userSlice";

const FavoriteMovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-3 hover:scale-105 transition-transform">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold text-center">{movie.Title}</h3>
      <p className="text-gray-400 text-sm text-center mb-3">{movie.Year}</p>
      <button
        onClick={() => dispatch(removeFavorite(movie.imdbID))}
        className="w-full bg-red-600 hover:bg-red-500 text-white rounded-md py-2"
      >
        Remove
      </button>
    </div>
  );
};

export default FavoriteMovieCard;
