// hooks/useRequireAuth.ts
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { useAuthModalStore } from '@/store/authModal.store';

export const useRequireAuth = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setReturnUrl = useAuthStore((s) => s.setReturnUrl);
  const openModal = useAuthModalStore((s) => s.open);
  const navigate = useNavigate();

  const requireAuth = (path: string, message: string) => {
    if (!isAuthenticated) {
      setReturnUrl(path);
      openModal(message);
      return;
    }

    navigate(path);
  };

  return { requireAuth };
};