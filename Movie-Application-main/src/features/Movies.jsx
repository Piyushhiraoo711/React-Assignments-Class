import React, { useState, useEffect } from "react";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=e32df389c6a214da047b0c9721fa1840&language=en-US&page=${pageNumber}`
      );
      const data = await res.json();

      if (data.results) {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const renderPagination = () => {
    const buttons = [];
    const maxButtons = 3;
    let startPage = Math.max(1, page - 1);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (page > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 rounded-md mx-1 bg-gray-700 text-white"
        >
          &lt;
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded-md mx-1 ${
            i === page ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"
          }`}
        >
          {i}
        </button>
      );
    }

    if (page < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 rounded-md mx-1 bg-gray-700 text-white"
        >
          &gt;
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
      {loading && <p className="text-center">Loading...</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="rounded-lg overflow-hidden">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/fallback.jpg"
              }
              alt={movie.title}
              className="w-full h-[300px] object-cover"
            />
            <p
              className="mt-2 text-center font-semibold truncate"
              title={movie.title}
            >
              {movie.title}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">{renderPagination()}</div>
    </div>
  );
};

export default Movies;
