import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../slice/userSlice";

const FavoriteButton = ({ movie }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const isFavorite =
    currentUser?.favorites?.some((m) => m.imdbID === movie.imdbID) || false;

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.imdbID));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <button
      onClick={handleFavorite}
      className={`mt-4 px-4 py-2 rounded-lg font-semibold ${
        isFavorite ? "bg-red-500 hover:bg-red-400" : "bg-yellow-400 hover:bg-yellow-300"
      }`}
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};
