import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import Navbar from "./features/Navbar.jsx";
import Footer from "./features/Footer.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
