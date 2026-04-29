import { useLocation } from 'react-router-dom';
import { RoutePath } from '@/routes/root.config';

export const useIsHeaderNone = () => {
  const { pathname } = useLocation();
  return pathname.startsWith(`${RoutePath.Auth}/`);
};
