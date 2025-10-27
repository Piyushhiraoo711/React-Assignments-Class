import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contextAPI/AppContext";
import { saveUser } from "../utils/localStorage";
import { useDispatch } from "react-redux";
import { userSignup } from "../user/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  // const {state , dispatch } = useContext(AppContext);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    isLogin: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  function handleSignup (username, password, isLogin)  {
    const userData = { username, password, isLogin };
    // dispatch({type: 'signup', payload: userData  })
    dispatch(userSignup(userData))
    // setUser(userData);
    // setIsLogged(true);
    saveUser(userData);
    // navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("userDetails", userDetails);
    if (userDetails.password === userDetails.confirmPassword) {
      handleSignup(
        userDetails.username,
        userDetails.password,
        userDetails.isLogin
      );
      navigate("/");
    } else {
      alert("Password mismatched");
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
        <h2 style={{ color: "#007bff", marginBottom: "20px" }}>Sign up</h2>

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
            placeholder="Enter Name"
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
          <input
            type="password"
            placeholder="Enter Confirm Password"
            name="confirmPassword"
            value={userDetails.confirmPassword}
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
            Sign up
          </button>
          <div style={{ display: "flex", fontSize: "10px" }}>
            <h2>
              <span>
                Already have an account ?{" "}
                <span
                  onClick={() => {
                    navigate("/login");
                  }}
                  style={{
                    fontSize: "16px",
                    color: "#007bff",
                    cursor: "pointer",
                  }}
                >
                  Login
                </span>
              </span>
            </h2>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
