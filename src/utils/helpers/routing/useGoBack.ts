import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/routes/root.config';

export const useGoBack = () => {
  const navigate = useNavigate();

  return () => {
    const canGoBack = window.history.length > 1;

    if (canGoBack) {
      navigate(-1);
    } else {
      navigate(RoutePath.Default, { replace: true });
    }
  };
};