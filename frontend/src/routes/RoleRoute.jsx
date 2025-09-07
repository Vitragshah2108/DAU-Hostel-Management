import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ADMIN, STUDENT } from '../utils/roles';

const RoleRoute = ({ allowedRoles = [ADMIN, STUDENT], redirectTo = '/login' }) => {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;
  if (!allowedRoles.includes(role)) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
};

export default RoleRoute;


