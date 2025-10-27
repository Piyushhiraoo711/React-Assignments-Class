import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../features/Home.jsx";
import Login from "../authentication/Login.jsx";
import Signup from "../authentication/Signup.jsx";
import About from "../features/About.jsx";
import Contact from "../features/Contact.jsx";
import MovieDetails from "../features/MovieDetails.jsx";
import NotFound from "../features/NotFound.jsx";
import Profile from "../features/Profile.jsx";
import SearchMovies from "../features/SearchMovies.jsx";
import PublicRoute from "../protectedRoutes/PublicRoute .jsx";
import ProtectedRoute from "../protectedRoutes/ProtectedRoute .jsx";
import Movies from "../features/Movies.jsx";

const AppRoutes = () => {
  return (
    // <Routes>
    //   <Route path="/" element={<Home />} />
    //   <Route path="/login" element={<Login />} />
    //   <Route path="/signup" element={<Signup />} />
    //   <Route path="/about" element={<About />} />
    //   <Route path="/contact" element={<Contact />} />
    //   <Route path="/profile" element={<Profile />} />
    //   <Route path="/movie/:id" element={<MovieDetails />} />
    //   <Route path="/search/movies" element={<SearchMovies />} />
    //   <Route path="/404" element={<NotFound />} />
    // </Routes>
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/search/movies" element={<SearchMovies />} />
      <Route path="/404" element={<NotFound />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movie/:id"
        element={
          <ProtectedRoute>
            <MovieDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
