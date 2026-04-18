import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';
import { Toaster } from 'sonner';
import { RoutePath } from './routes/root.config';
import { useIsHeaderNone } from './utils/helpers/layouts/useIsHeaderNone';

function App() {
  const isHeaderNone = useIsHeaderNone();
  const { pathname } = useLocation();
  const isHomeRoute = pathname === RoutePath.Default || pathname === RoutePath.Home;

  return (
    <div className='flex min-h-dvh flex-col'>
      {!isHeaderNone && <Header />}
      <main>
        <Outlet />
      </main>
      {isHomeRoute ? <Footer /> : null}
      <Toaster position='top-right' richColors />
    </div>
  );
}

export default App;
