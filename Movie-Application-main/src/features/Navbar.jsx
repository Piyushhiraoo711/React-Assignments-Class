import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slice/userSlice";
import { clearSearch, fetchSearchMovies } from "../slice/movieSlice";

const API_KEY = "e32df389c6a214da047b0c9721fa1840";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { searchMovie } = useSelector((state) => state.movies.searchMovie);
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (currentUser) {
      await dispatch(logoutUser(currentUser.id));
      navigate("/login");
    }
  };

  // const handleSearch = async (e) => {
  //   e.preventDefault();

  //   if (!query.trim()) return alert("Please enter movie name");
  //   console.log("query", query);
  //   try {
  //     const res = await fetch(
  //       `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
  //         query
  //       )}`
  //     );
  //     const data = await res.json();
  //     console.log("search movies", data.results);

  //     if (data) {
  //       dispatch(setSearchMovies(data.results));
  //       setQuery("");
  //       navigate("/search/movies");
  //     } else {
  //       dispatch(clearSearch());
  //       setQuery("");
  //       navigate("/404");
  //     }
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return alert("Please enter movie name");

    const resultAction = await dispatch(fetchSearchMovies(query));

    if (fetchSearchMovies.fulfilled.match(resultAction)) {
      setQuery("");
      navigate("/search/movies");
    } else {
      dispatch(clearSearch());
      setQuery("");
      navigate("/404");
    }
  };
  
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black to-purple-700 text-white shadow-lg">
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
          {/* <li className="hover:text-yellow-300 cursor-pointer transition">
            <Link to="/profile">Profile</Link>
          </li> */}
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
