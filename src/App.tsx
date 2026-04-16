import { Outlet } from 'react-router-dom';
import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';
import { Toaster } from 'sonner';
import { useIsHeaderNone } from './utils/helpers/layouts/useIsHeaderNone';

function App() {
  const isHeaderNone = useIsHeaderNone();

  return (
    <div className='flex min-h-dvh flex-col'>
      {!isHeaderNone && <Header />}
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position='top-right' richColors />
    </div>
  );
}

export default App;