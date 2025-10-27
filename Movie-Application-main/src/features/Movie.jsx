import React, { useEffect } from "react";

const Movie = () => {
  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=e32df389c6a214da047b0c9721fa1840"
    )
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("Error fetching movies:", err));
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      <div>Movie</div>
    </>
  );
};

export default Movie;
