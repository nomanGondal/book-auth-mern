// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const user = JSON.parse(localStorage.getItem('user'));

// Agar user exist karta hai to token nikal lo
const token = user?.token;
  
  
  if (!token) {
    alert("Please log in first");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
