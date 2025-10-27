import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
