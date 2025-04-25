// src/routes/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    // If no role found, redirect to login
    return <Navigate to="/unauthorized" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // If role not allowed, redirect to unauthorized or home
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
