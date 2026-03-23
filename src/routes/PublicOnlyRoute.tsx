// src/routes/PublicOnlyRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuthenticated } from '@/store/auth.store';
import { RoutePath } from '@/routes/root.config';

export const PublicOnlyRoute = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to={RoutePath.Default} replace />;
  }

  return <Outlet />;
};
