import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contextAPI/AppContext";

function ProtectedRoute({ children }) {
  const { isLogged } = useContext(AppContext);

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
