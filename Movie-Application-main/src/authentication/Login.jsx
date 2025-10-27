import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, saveUser } from "../localStorage/localStorage";
import { useDispatch } from "react-redux";
import { loginUser } from "../slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/");
      } else {
        alert(resultAction.payload || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = user;

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    handleLogin(username, password);
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
        <div className="flex flex-col justify-center items-center w-[40%] h-[40%] bg-black/30 rounded-lg">
          <h2 className="font-semibold text-white">
            Enter Your info to Login{" "}
          </h2>
          <div className="mt-4 ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
              <input
                className=" border border-gray-300 rounded-md p-2 w-64 text-white "
                placeholder="Enter username or email ..."
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
              <input
                className=" border border-gray-300 rounded-md p-2 w-64 text-white "
                placeholder="Enter password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-purple-700 rounded-2xl py-1 text-white"
              >
                Login
              </button>
            </form>
            <div>
              <p className="mt-2 text-sm text-white">
                Don't have an account?
                <Link to="/signup" className="text-blue-500 underline-none">
                  <span> Sign Up </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
