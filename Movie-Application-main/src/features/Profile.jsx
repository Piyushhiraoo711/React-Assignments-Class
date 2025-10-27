import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const favorites = currentUser?.favorites || [];

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Please log in to see your profile.
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-6 mt-10">
        <h1 className="text-3xl font-bold mb-6">
          {currentUser.username}'s Favorites
        </h1>

        {favorites.length === 0 ? (
          <motion.p
            className="text-red-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No favorite movies yet.
          </motion.p>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {favorites.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 70,
                }}
                whileHover={{ scale: 1.07, rotateY: 5 }}
              >
                <Link to={`/movie/${movie.id}`}>
                  <motion.div
                    className="bg-gray-800 rounded-lg overflow-hidden flex flex-col shadow-lg"
                    whileHover={{
                      boxShadow: "0px 0px 20px rgba(255, 255, 0, 0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 150 }}
                  >
                    <div className="w-full aspect-[2/3] bg-gray-700">
                      <motion.img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                            : "/fallback-image.jpg"
                        }
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <h3 className="text-white mt-1 py-2 text-center text-sm font-medium px-2">
                      {movie.title}
                    </h3>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Profile;
