import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useStoreSelector } from '../../../hooks/useStore';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const user = useStoreSelector((state)=> state.auth)
  if (user.loading) return null;
  const isAuthenticated = user.isAuthenticated && user.role === 'user'

  return isAuthenticated ? children : <Navigate to="/user/login" replace />;
};

export default ProtectedRoute;
