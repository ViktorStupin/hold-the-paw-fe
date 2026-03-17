import { Outlet } from 'react-router-dom';
import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';
import { useEffect } from 'react';
import { useAuthStore } from './store/auth.store';

function App() {
  const { refreshTokenExpiresAt, logout } = useAuthStore();

  useEffect(() => {
    if (refreshTokenExpiresAt && Date.now() > refreshTokenExpiresAt) {
      logout();
    }
  }, []);

  console.log(import.meta.env.BASE_URL);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
