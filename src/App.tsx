import { Outlet, useLocation } from 'react-router-dom';
import { Back } from './components/Back/Back';
import { RoutePath } from './routes/root.config';
import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';

/** Тимчасові дані користувача для хедера — замінити на store/API після інтеграції профілю */
const HEADER_USER = {
  name: 'Бірюкова Вікторія',
  type: 'Приватна особа',
} as const;

function App() {
  const { pathname } = useLocation();

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

  return (
    <div className='flex min-h-dvh flex-col'>
      {!isAuthRoute && <Header user={HEADER_USER} />}
      <main>
        {shouldShowBack && (
          <div className='u-container pt-2 md:hidden'>
            <Back />
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
