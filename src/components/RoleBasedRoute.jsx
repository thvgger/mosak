// components/RoleBasedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case 'seller':
        return <Navigate to="/seller" replace />;
      case 'freelancer':
        return <Navigate to="/freelancer" replace />;
      case 'employer':
        return <Navigate to="/employer" replace />;
      default:
        return <Navigate to="/account" replace />;
    }
  }

  return children;
};

export default RoleBasedRoute;