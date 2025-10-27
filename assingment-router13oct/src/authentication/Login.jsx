import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contextAPI/AppContext";
import { getUser, saveUser } from "../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "../user/userSlice";

const Login = () => {
  const navigate = useNavigate();
  // const { state, dispatch } = useContext(AppContext);

  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  function handleLogin(username, password, isLogin) {
    const userData = { username, password, isLogin };
    // dispatch({ type: "login", payload: userData });                                                                       
    saveUser(userData);
    dispatch(loggedInUser(userData));
    // setUser(userData);
    // setIsLogged(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password, isLogin } = getUser();
    console.log(username, password, isLogin);
    if (
      isLogin === false &&
      username === userDetails.username &&
      password === userDetails.password
    ) {
      console.log("userDetails", userDetails);
      handleLogin(userDetails.username, userDetails.password, !isLogin);
      navigate("/");
    } else {
      alert("Invalid Username and password");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f4f6f8",
        }}
      >
        <h2 style={{ color: "#007bff", marginBottom: "20px" }}>Login</h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            width: "300px",
          }}
        >
          <input
            type="text"
            min={2}
            max={25}
            placeholder="Enter Username"
            name="username"
            value={userDetails.username}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          />
          <input
            type="password"
            min={4}
            max={8}
            placeholder="Enter Password"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Login
          </button>
          <div style={{ display: "flex", fontSize: "10px" }}>
            <h2>
              <span>
                Already have an account ?{" "}
                <span
                  onClick={() => {
                    navigate("/signup");
                  }}
                  style={{
                    fontSize: "16px",
                    color: "#007bff",
                    cursor: "pointer",
                  }}
                >
                  Sign up
                </span>
              </span>
            </h2>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
