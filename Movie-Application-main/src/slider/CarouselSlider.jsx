import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useSelector } from "react-redux";
import Loader from "../features/Loader";

const CarouselSlider = ({ movies }) => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.movies);
  const { theme } = useTheme();
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div
      className={`w-full h-[80vh] md:h-screen overflow-hidden ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } `}
    >
      {movies && movies.length > 0 ? (
        <Slider {...settings}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`movie/${movie.id}`)}
              className="relative w-full h-[60vh] md:h-screen"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    : "/fallback-image.jpg"
                }
                alt={movie.title || "Movie Poster"}
                className="w-full h-full object-contain rounded-lg shadow-lg"
              />

              <div className="absolute inset-0 from-black via-black/40 to-transparent flex flex-col justify-end px-6 md:px-10 py-12 px-10 ml-20px">
                <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {movie.title}
                </h2>
                <p className="max-w-2xl text-sm md:text-base line-clamp-3">
                  {movie.release_date}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center mt-20 text-gray-400">Loading movies...</p>
      )}
    </div>
  );
};

export default CarouselSlider;
