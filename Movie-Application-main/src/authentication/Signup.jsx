import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, saveUser } from "../localStorage/localStorage";
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
        className="w-full min-h-screen bg-cover bg-center flex justify-center items-center px-4 sm:px-6 md:px-8"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/19/8b/2f/198b2f01e73b905772279616eccc7c65.jpg')",
        }}
      >
        <div
          className={`flex flex-col justify-center items-center 
                w-full sm:w-[80%] md:w-[60%] lg:w-[40%] 
                h-auto md:h-[65%] 
                rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 
                backdrop-blur-sm transition-all duration-300
                ${
                  theme === "dark"
                    ? "bg-black/80 text-white"
                    : "bg-gray-100/90 text-black"
                }`}
        >
          <h2 className="font-semibold text-lg md:text-2xl mb-4 text-center">
            Enter Your Info to Register
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-sm"
          >
            <input
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-purple-600 outline-none"
              placeholder="Enter username or email ..."
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
            <input
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-purple-600 outline-none"
              placeholder="Enter password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <input
              className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-purple-600 outline-none"
              placeholder="Confirm password"
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white rounded-full py-2 font-medium transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm sm:text-base text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
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
