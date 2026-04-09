import { useEffect } from 'react';
import { initAuth } from '@/utils/helpers/api/initAuth';
import { prefetchMe } from '@/queries/user/user.queries';
import { useQueryClient } from '@tanstack/react-query';
import { getAuthState } from '@/store/auth.store';

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    initAuth().then(() => {
      const { isAuthenticated } = getAuthState();
      if (isAuthenticated) prefetchMe(queryClient);
    });
  }, []);

  return <>{children}</>;
};
