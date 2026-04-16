<<<<<<< HEAD
import { Outlet } from 'react-router-dom';
import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';
import { Toaster } from 'sonner';
import { useIsHeaderNone } from './utils/helpers/layouts/useIsHeaderNone';

function App() {
  const isHeaderNone = useIsHeaderNone();
=======
import { useEffect, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { USER_ROLE_LABEL_UA } from './constants/role.labes';
import { Back } from './components/Back/Back';
import { useIsAuthenticated } from './store/auth.store';
import { useUserStore } from './store/user.store';
import { RoutePath } from './routes/root.config';
import { Header } from './layouts/Header';

function App() {
  const { pathname } = useLocation();
  const isAuthenticated = useIsAuthenticated();
  const { user, fetchMe } = useUserStore();

  const hideBackOnRoutes = [
    RoutePath.Default,
    RoutePath.Home,
    RoutePath.Pets,
    RoutePath.CreatePetProfile,
    RoutePath.MyPets,
  ];

  const isAuthRoute = pathname === RoutePath.Auth || pathname.startsWith(`${RoutePath.Auth}/`);
  const hasOwnBackButton = pathname.startsWith('/edit-pet-profile/');
  const shouldShowBack =
    !isAuthRoute &&
    !hasOwnBackButton &&
    !hideBackOnRoutes.includes(pathname as (typeof hideBackOnRoutes)[number]);
>>>>>>> 4288acc (filter + fix)

  useEffect(() => {
    if (!isAuthenticated || user) return;

    void fetchMe();
  }, [isAuthenticated, user, fetchMe]);

  const headerUser = useMemo(() => {
    if (!user) {
      return {
        name: 'Користувач',
        type: 'Гість',
      };
    }

    return {
      name: user.role === 'personal' ? user.full_name : user.company_name,
      type: USER_ROLE_LABEL_UA[user.role],
    };
  }, [user]);

  return (
    <div className='flex min-h-dvh flex-col'>
<<<<<<< HEAD
      {!isHeaderNone && <Header />}
=======
      {!isAuthRoute && <Header user={headerUser} />}
>>>>>>> 4288acc (filter + fix)
      <main>
        <Outlet />
      </main>
<<<<<<< HEAD
      <Footer />
      <Toaster position='top-right' richColors />
=======
>>>>>>> 4288acc (filter + fix)
    </div>
  );
}

export default App;
