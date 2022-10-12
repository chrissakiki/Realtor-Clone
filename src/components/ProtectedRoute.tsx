import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import Spinner from "./Spinner";
const ProtectedRoute = () => {
  const { loggedIn, loading } = useAuthStatus();

  if (loading) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
