import { Outlet } from 'react-router-dom';
import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <h1 className='typo-h1'>Hold the Paw</h1>
      </main>
      <Footer />
    </>
  );
}

export default App;
