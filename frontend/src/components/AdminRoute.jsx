import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const ADMIN_EMAIL = "admin123@gmail.com";

  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/trending" replace />;
  }

  return children;
}

export default AdminRoute;