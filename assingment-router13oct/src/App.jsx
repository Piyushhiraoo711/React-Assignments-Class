import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import Edit from "./pages/EditProduct";
import Login from "./pages/Login";
import Addproduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import { useEffect, useState } from "react";
import { AppContext } from "./contextAPI/appContext";

function App() {
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const setUserDetails = {
    username: "admin",
    password: "1234",
  };

  useEffect(() => {
    try {
      localStorage.setItem("user", setUserDetails);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <AppContext value={(user, isLogged, setUserDetails)}>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/add/products" element={<Addproduct />} />
        </Routes>
      </AppContext>
    </>
  );
}

export default App;
