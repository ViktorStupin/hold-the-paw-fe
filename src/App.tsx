import { Outlet } from 'react-router-dom';
import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';

function App() {
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
