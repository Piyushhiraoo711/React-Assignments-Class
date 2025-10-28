import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import FavoriteMovieCard from "./FavoriteMovieCard";
import RecentAdd from "./RecentAdd";

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState("favorite");
  const currentUser = useSelector((state) => state.user.currentUser);
  const { theme, toggleTheme } = useTheme();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Please log in to see your profile.
      </div>
    );
  }
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    console.log("Selected value:", e.target.value);
  };

  return (
    <>
      <div
        className={`min-h-screen px-3 sm:px-6 md:px-10 py-10 mt-10 ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center sm:text-left sm:mt-10">
          {currentUser.username}
          {selectedOption === "favorite" ? " Favorites" : " Recent watched"}
        </h1>

        <div
          className="flex flex-col sm:flex-row items-center justify-center w-60
            gap-2 "
        >
          <label className="text-center sm:text-left">Select :</label>
          <select
            name="selection"
            id="select"
            value={selectedOption}
            onChange={handleChange}
            className={`p-2  border border-white ${
              theme === "dark" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <option value="favorite">Favorites</option>
            <option value="recent">Recent Watched</option>
          </select>
        </div>

        <div>
          {selectedOption === "favorite" ? (
            <FavoriteMovieCard />
          ) : (
            <RecentAdd />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
