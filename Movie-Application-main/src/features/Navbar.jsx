import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slice/userSlice";
import { clearSearch, fetchSearchMovies } from "../slice/moviesSlice";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { searchMovie } = useSelector((state) => state.movies.searchMovie);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const handleLogout = async () => {
    if (currentUser) {
      await dispatch(logoutUser(currentUser.id));
      navigate("/login");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return alert("Please enter movie name");

    const resultAction = await dispatch(fetchSearchMovies(query));

    if (fetchSearchMovies.fulfilled.match(resultAction)) {
      const movies = resultAction.payload;

      if (movies && movies.length > 0) {
        console.log("Movies found:", movies);
        setQuery("");
        navigate("/search/movies");
      } else {
        console.warn("No movies found");
        setQuery("");
        navigate("/404");
        toast.error("No movie found");
      }
    } else {
      console.error("Error fetching movies:", resultAction.error);
      setQuery("");
      navigate("/404");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 bg-gradient-to-r shadow-lg ${
        theme === "dark"
          ? "from-black to-purple-700  text-white"
          : "from-white to-purple-700  text-black"
      }`}
    >
      <div className="flex flex-wrap justify-between items-center px-6 md:px-8 py-3 gap-3 md:gap-6">
        <div
          onClick={() => navigate("/")}
          className="font-extrabold tracking-wide cursor-pointer"
        >
          <span className="text-2xl text-yellow-400">Movie</span> App
        </div>
        <div>{searchMovie}</div>
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full sm:w-auto justify-center"
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-2 rounded-l-lg text-white border border-white w-60 sm:w-72 md:w-80"
          />
          <button
            type="submit"
            className="bg-white border border-white text-black px-4 py-2 rounded-r-lg font-semibold"
          >
            Search
          </button>
        </form>

        <ul className="flex flex-wrap gap-4 md:gap-6 font-medium justify-center md:justify-end">
          <li
            onClick={toggleTheme}
            className={`hover:text-yellow-300 cursor-pointer transition`}
          >
            {theme === "light" ? "Light" : "Dark"}
          </li>
          <li className="hover:text-yellow-300 cursor-pointer transition">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-yellow-300 cursor-pointer transition">
            <Link to="/movies">Movies</Link>
          </li>
          <li className="hover:text-yellow-300 cursor-pointer transition">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-yellow-300 cursor-pointer transition">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="hover:text-yellow-300 cursor-pointer transition">
            <Link to="/profile">Profile</Link>
          </li>
          <li
            onClick={handleLogout}
            className="hover:text-yellow-300 cursor-pointer transition"
          >
            <Link to={currentUser?.isLogin ? "/" : "/login"}>
              {currentUser?.isLogin ? "Logout" : "Sign In"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
