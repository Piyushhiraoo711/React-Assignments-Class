import React from "react";
import Slider from "react-slick";

const MovieCarousel = ({ movies, title }) => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 800,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 5 } },
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-black text-white py-10 px-6">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-2">
            <div className="relative group cursor-pointer">
              <img
                src={movie.url}
                alt={movie.title}
                className="rounded-lg object-cover w-full h-[300px] transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 flex items-end justify-center transition duration-300 p-4">
                <p className="text-lg font-semibold">{movie.title}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
