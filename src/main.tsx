import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { Root } from './routes/Root.tsx';
import { initAuth } from './utils/helpers/api/initAuth.ts';
const bootstrap = async () => {
  const container = document.getElementById('root')!;
  await initAuth();

  createRoot(container).render(<Root />);
};

bootstrap();
