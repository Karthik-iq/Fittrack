import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * GuestRoute: Redirects logged-in users away from /login and /register to /dashboard.
 */
export const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const hasToken = Boolean(localStorage.getItem('fittrack_token'));

  if (loading) {
    return null;
  }

  if (isAuthenticated || hasToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
