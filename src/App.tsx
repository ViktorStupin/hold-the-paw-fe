import { Outlet } from 'react-router-dom';
import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';

/** Тимчасові дані користувача для хедера — замінити на store/API після інтеграції профілю */
const HEADER_USER = {
  name: 'Бірюкова Вікторія',
  type: 'Приватна особа',
} as const;

function App() {
  return (
    <div className='flex min-h-dvh flex-col'>
      <Header user={HEADER_USER} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
