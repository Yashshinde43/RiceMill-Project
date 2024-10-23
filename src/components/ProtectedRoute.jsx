import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRole }) => {
  const userRole = localStorage.getItem("role");

  if (userRole === allowedRole) {
    return element;
  } else {
    return <Navigate to="/no-permission" />;
  }
};

export default ProtectedRoute;
