import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const user = {
    username: "admin",
    password: "1234",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserDetails((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("userDetails", userDetails);

    if (
      userDetails.username === user.username &&
      userDetails.password === user.password
    ) {
      localStorage.getItem("user");
      console.log("user", localStorage.setItem("user", true));
      navigate("/");
    } else {
      alert("Login Failed");
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
        </form>
      </div>
    </>
  );
};

export default Login;
