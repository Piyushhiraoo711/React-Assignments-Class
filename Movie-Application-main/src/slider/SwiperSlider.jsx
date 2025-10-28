import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const SwiperSlider = ({ title, movies = [] }) => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const { theme } = useTheme();

  const navigate = useNavigate();

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className={`relative mb-10 w-full ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 px-4 sm:px-6">
        {title}
      </h2>

      <div className="relative group">
        {!isBeginning && (
          <button
            onClick={handlePrev}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {!isEnd && (
          <button
            onClick={handleNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        )}

        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={6}
          loop={false}
          onSlideChange={handleSlideChange}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={800}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 8 },
            480: { slidesPerView: 2.5, spaceBetween: 8 },
            640: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 4, spaceBetween: 12 },
            1024: { slidesPerView: 5, spaceBetween: 14 },
            1280: { slidesPerView: 6, spaceBetween: 16 },
          }}
          className="px-3 sm:px-5"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div
                className="px-1 sm:px-2 cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <div className="relative">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/fallback.jpg"
                    }
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="mt-2 text-center text-xs sm:text-sm truncate px-1">
                  {movie.title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperSlider;
