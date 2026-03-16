// src/routes/ProtectedRoute.tsx
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { PROTECTED_ROUTES_CONFIG } from './root.config';
import { useGoBack } from '@/utils/helpers/routing/useGoBack';

interface IProtectedRouteProps {
  onAuthRequired: (message: string) => void;
}

export const ProtectedRoute = ({ onAuthRequired }: IProtectedRouteProps) => {
  const location = useLocation();
  const { setReturnUrl, isAuthenticated } = useAuthStore();
  const goBack = useGoBack();

  useEffect(() => {
    if (!isAuthenticated) {
      const message =
        PROTECTED_ROUTES_CONFIG[location.pathname] ?? 'Щоб продовжити авторизуйтесь';
      setReturnUrl(location.pathname);
      onAuthRequired(message);
      goBack();
    }
  }, [location.pathname, isAuthenticated]);

  if (!isAuthenticated) return null;

  return <Outlet />;
};
