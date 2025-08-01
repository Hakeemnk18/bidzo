import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useStoreSelector } from '../../../hooks/useStore';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  
  const user = useStoreSelector((state)=> state.auth)
  // console.log("protected ",user)
  if (user.loading) return null;
  const isAuthenticated = user.isAuthenticated && user.role === 'admin'

  

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
