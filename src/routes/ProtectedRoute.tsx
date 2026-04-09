// routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { RoutePath } from './root.config';
import { Spinner } from '@/components/ui/spinner';

export const ProtectedRoute = () => {
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  
  if (!isInitialized) {
    return (
      <div className='flex-1 flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={RoutePath.Default} replace />;
  }


  return <Outlet />;
};
