import React, { useEffect, useState } from "react";
import CarouselSlider from "../slider/CarouselSlider";
import SwiperSlider from "../slider/SwiperSlider";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesByCategory } from "../slice/movieSlice";

const Home = () => {
  const [allMovies, setAllMovies] = useState([]);
  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.user.currentUser);
  const { popular, horror, comedy, loading } = useSelector(
    (state) => state.movies
  );

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
    dispatch(fetchMoviesByCategory("popular"));
    dispatch(fetchMoviesByCategory("horror"));
    dispatch(fetchMoviesByCategory("comedy"));
    getMovies();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="bg-black min-h-screen">
        {allMovies.length > 0 ? (
          <CarouselSlider movies={allMovies} />
        ) : (
          <p className="text-white text-center pt-10">Loading movies...</p>
        )}
      </div>
      <div className="bg-black min-h-screen text-white p-4">
        <SwiperSlider title="Popular Movies" movies={popular} />
        <SwiperSlider title="Comedy Movies" movies={comedy} />
        <SwiperSlider title="Horror Movies" movies={horror} />
      </div>
    </>
  );
};

export default Home;
