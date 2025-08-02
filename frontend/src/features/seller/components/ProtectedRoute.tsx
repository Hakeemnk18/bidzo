import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useStoreSelector } from '../../../hooks/useStore';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const user = useStoreSelector((state)=> state.auth)
  console.log("public route",user)
  if(user.loading) return null
  const isAuthenticated = user.isAuthenticated && user.role === 'seller'

  return isAuthenticated ? children : <Navigate to="/seller/login" replace />;
};

export default ProtectedRoute;