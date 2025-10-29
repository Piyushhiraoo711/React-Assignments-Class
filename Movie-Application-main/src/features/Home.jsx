import React, { useEffect, useState } from "react";
import CarouselSlider from "../slider/CarouselSlider";
import SwiperSlider from "../slider/SwiperSlider";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../features/Footer.jsx";
import {
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchPopularMovies,
} from "../slice/moviesSlice";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const [allMovies, setAllMovies] = useState([]);
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const { popular, horror, comedy } = useSelector((state) => state.movies);

  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=e32df389c6a214da047b0c9721fa1840&language=en-US&page=1"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.results) {
        setAllMovies(data.results);
      } else {
        console.error("Unexpected API response:", data);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchHorrorMovies());
    dispatch(fetchComedyMovies());
    getMovies();
  }, [dispatch]);

  return (
    <>
      <div
        className={`min-h-screen transition-colors duration-500 ${
          theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <section
          className={`min-h-screen transition-colors duration-500 ${
            theme === "dark" ? "bg-black" : "bg-gray-100"
          }`}
        >
          {allMovies.length > 0 ? (
            <CarouselSlider movies={allMovies} />
          ) : (
            <p
              className={`text-center pt-10 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Loading movies...
            </p>
          )}
        </section>

        <section
          className={`min-h-screen p-4 transition-colors duration-500 ${
            theme === "dark"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          <SwiperSlider title="Popular Movies" movies={popular} />
          <SwiperSlider title="Horror Movies" movies={horror} />
          <SwiperSlider title="Comedy Movies" movies={comedy} />
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Home;
