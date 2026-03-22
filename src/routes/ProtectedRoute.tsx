// src/routes/ProtectedRoute.tsx
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { PROTECTED_ROUTES_CONFIG, RoutePath } from './root.config';
import { useGoBack } from '@/utils/helpers/routing/useGoBack';

interface IProtectedRouteProps {
  onAuthRequired: (message: string) => void;
}

export const ProtectedRoute = ({ onAuthRequired }: IProtectedRouteProps) => {
  const location = useLocation();
  const { setReturnUrl, isAuthenticated, isLoggingOut } = useAuthStore();
  const goBack = useGoBack();

  useEffect(() => {
    if (isLoggingOut) return;

    if (!isAuthenticated && location.pathname !== RoutePath.Default) {
      const message = PROTECTED_ROUTES_CONFIG[location.pathname] ?? 'Авторизуйтесь, щоб продовжити';
      setReturnUrl(location.pathname);
      onAuthRequired(message);
      goBack();
    }
  }, [location.pathname, isAuthenticated]);

  if (!isAuthenticated) return null;

  return <Outlet />;
};
