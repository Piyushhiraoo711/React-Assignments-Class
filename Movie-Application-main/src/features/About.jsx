import React from "react";
import { useTheme } from "../context/ThemeContext";

const About = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div
        className={`flex justify-center items-center flex-col mx-auto h-screen ${
          theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <h2 className="font-bold my-3">About Movie App</h2>
        <p>
          Welcome to Movie App — your personal movie management platform built
          to make exploring and organizing your favorite films effortless and
          fun. This app is powered by the OMDb API and built using React.js,
          Redux Toolkit, Axios, and Tailwind CSS to deliver a fast, responsive,
          and modern experience. Whether you’re searching for new releases,
          filtering by genre, or sorting your favorites, Movie App gives you
          complete control over your movie world.
        </p>
        <div className="flex flex-col my-3">
          <h2 className="font-bold"> Our goal is simple:</h2>
          <ul>
            <li>🎥 Help you discover movies you love.</li>
            <li>⭐ Let you save and personalize your collection.</li>
            <li>
              🔒 Keep your preferences safe using localStorage, even after
              logout.
            </li>
          </ul>
        </div>
        <h4>
          We believe movie discovery should be smooth, smart, and enjoyable —
          just like watching your favorite film.
        </h4>
      </div>
    </>
  );
};

export default About;
