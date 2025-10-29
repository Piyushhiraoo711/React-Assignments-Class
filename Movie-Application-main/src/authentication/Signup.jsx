import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "../slice/userSlice";
import { useTheme } from "../context/ThemeContext";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    isLogin: true,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  function handleSignup(username, password, isLogin) {
    const userData = { username, password, isLogin };
    // setUser(userData);
    // setIsLogged(true);
    // saveUser(userData);
    dispatch(signupUser({ username, password }));
    navigate("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    handleSignup(user.username, user.password, user.isLogin);
    console.log("User Info:", user);
  };
  return (
    <>
      <div
        className="w-full h-screen bg-cover bg-center flex justify-center items-center px-4"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/19/8b/2f/198b2f01e73b905772279616eccc7c65.jpg')",
        }}
      >
        <div
          className={`flex flex-col justify-center items-center 
      w-full sm:w-[80%] md:w-[60%] lg:w-[40%] 
      h-auto md:h-[70%] 
      rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 
      backdrop-blur-md border border-white/20 transition-all duration-300
      ${
        theme === "dark" ? "bg-black/40 text-white" : "bg-white/40 text-black"
      }`}
        >
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl mb-4 text-center">
            Enter Your Info to Register
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center w-full max-w-sm"
          >
            <input
              className="border border-gray-300 rounded-md p-2 w-64 sm:w-72 md:w-80 lg:w-96 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter username or email ..."
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
            <input
              className="border border-gray-300 rounded-md p-2 w-64 sm:w-72 md:w-80 lg:w-96 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <input
              className="border border-gray-300 rounded-md p-2 w-64 sm:w-72 md:w-80 lg:w-96 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm password"
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white rounded-full py-2 mt-2 font-medium transition-all duration-300 w-64 sm:w-72 md:w-80 lg:w-96"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm sm:text-base text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-400 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
