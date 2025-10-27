import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contextAPI/AppContext";

function PublicRoute({ children }) {
  const { isLogged } = useContext(AppContext);

  if (isLogged) {
    return <Navigate to="/" replace />;
  }
 
  return children;
}

export default PublicRoute;
