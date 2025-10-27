import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselSlider = ({ movies }) => {
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
    <div className="w-full h-[80vh] md:h-screen overflow-hidden bg-black text-white">
      {movies && movies.length > 0 ? (
        <Slider {...settings}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative w-full h-[60vh] md:h-screen"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : "/fallback-image.jpg"
                }
                alt={movie.title || "Movie Poster"}
                className="w-full h-full object-contain rounded-lg shadow-lg"
              />

              <div className="absolute inset-0 from-black via-black/40 to-transparent flex flex-col justify-end px-6 md:px-10 py-12">
                <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {movie.title}
                </h2>
                <p className="max-w-2xl text-gray-300 text-sm md:text-base line-clamp-3">
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
