import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute: Checks localStorage for mocked JWT token.
 * Redirects unauthenticated users to /login with state preservation.
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Double check directly from localStorage as required by prompt
  const hasToken = Boolean(localStorage.getItem('fittrack_token'));

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
        <p className="mt-4 text-xs font-medium text-slate-400 tracking-wide uppercase">
          Verifying Session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated && !hasToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
