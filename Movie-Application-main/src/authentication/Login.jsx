import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, saveUser } from "../localStorage/localStorage";
import { useDispatch } from "react-redux";
import { loginUser } from "../slice/userSlice";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

const handleLogin = async (username, password) => {
  try {
    const resultAction = await dispatch(loginUser({ username, password }));
    console.log("resultAction", resultAction);

    if (loginUser.fulfilled.match(resultAction)) {
      const data = resultAction.payload;

      if (data && data.success) {
        navigate("/");
        toast.success("Login successful");
      } 
    } else {
      toast.error("Login failed. Please try again.");
    }
  } catch (err) {
    console.error("Login error:", err);
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = user;

    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }

    handleLogin(username, password);
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
      h-auto md:h-[60%] 
      rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 
      backdrop-blur-md border border-white/20 transition-all duration-300
      ${
        theme === "dark" ? "bg-black/40 text-white" : "bg-white/40 text-black"
      }`}
        >
          <h2 className="font-semibold text-lg sm:text-xl md:text-2xl mb-4 text-center">
            Enter Your Info to Login
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center w-full"
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

            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white rounded-2xl py-2 mt-2 transition-all duration-300 w-64 sm:w-72 md:w-80 lg:w-96"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            Don’t have an account?
            <Link to="/signup" className="text-yellow-400 hover:underline ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
