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
        className="w-full h-screen bg-cover bg-center flex justify-center items-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/19/8b/2f/198b2f01e73b905772279616eccc7c65.jpg')",
        }}
      >
        <div
          className={`flex flex-col justify-center items-center w-[40%] h-[40%] rounded-lg ${
            theme === "dark"
              ? "bg-black/30  text-white"
              : "bg-gray-500 text-black"
          }`}
        >
          <h2 className="font-semibold ">Enter Your info to Register </h2>
          <div className="mt-4 ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
              <input
                className=" border border-gray-300 rounded-md p-2 w-64  "
                placeholder="Enter username or email ..."
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
              <input
                className=" border border-gray-300 rounded-md p-2 w-64  "
                placeholder="Enter password"
                type="text"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <input
                className=" border border-gray-300 rounded-md p-2 w-64  "
                placeholder="Enter confirm password"
                type="text"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
              />
              <button type="submit" className="bg-purple-700 rounded-2xl py-1">
                Sign Up
              </button>
            </form>
            <div>
              <p className="mt-2 text-sm ">
                Already have an account?
                <Link to="/login" className="text-blue-800 underline-none">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
