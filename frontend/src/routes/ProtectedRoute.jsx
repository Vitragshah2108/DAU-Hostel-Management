import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ redirectTo = '/login' }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
};

export default ProtectedRoute;


