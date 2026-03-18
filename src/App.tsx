import { Outlet } from 'react-router-dom';
import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';

function App() {
  return (
    <div className='flex min-h-dvh flex-col'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
