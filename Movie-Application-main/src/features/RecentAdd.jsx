import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const RecentAdd = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, loading } = useSelector((state) => state.user);
  const recentAdd = currentUser?.recentAdd || [];

  return (
    <div>
      {recentAdd.length === 0 ? (
        <motion.p
          className="text-red-600 text-center text-base sm:text-lg mt-8 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No Recent watched movies yet.
        </motion.p>
      ) : (
        <motion.div
          className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        xl:grid-cols-6 
        2xl:grid-cols-8 
        gap-3 sm:gap-5 md:gap-6
        justify-center
        mt-4
      "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {recentAdd.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 70,
              }}
              whileHover={{ scale: 1.05 }}
              className="flex justify-center"
            >
              <Link
                to={`/movie/${movie.id}`}
                className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px]"
              >
                <motion.div
                  className={`rounded-xl overflow-hidden flex flex-col shadow-md hover:shadow-yellow-400/30 transition-all duration-300 ${
                    theme === "light"
                      ? "bg-black text-white"
                      : " bg-white text-black"
                  }`}
                  whileHover={{
                    boxShadow: "0px 0px 25px rgba(255, 255, 0, 0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 150 }}
                >
                  <div className="w-full aspect-[2/3] bg-gray-700">
                    <motion.img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/fallback-image.jpg"
                      }
                      alt={movie.title}
                      className="w-full h-full object-cover object-top"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <h3 className="mt-2 py-2 text-center text-xs sm:text-sm font-medium px-2 truncate">
                    {movie.title}
                  </h3>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default RecentAdd;
