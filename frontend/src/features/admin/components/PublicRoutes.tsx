import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useStoreSelector } from '../../../hooks/useStore';

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const user = useStoreSelector((state)=> state.auth)
  const isAuthenticated = user.isAuthenticated && user.role === 'admin'

  return isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : children ;
};

export default PublicRoute;