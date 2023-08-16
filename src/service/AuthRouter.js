import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router";

const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return true;
  } else return false;
};

export default function ProtectedRoutes() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/users/login" />;
}
