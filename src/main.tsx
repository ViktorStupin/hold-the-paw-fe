import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { Root } from './routes/Root.tsx';
import { initAuth } from './utils/helpers/api/initAuth.ts';

const bootstrap = async () => {
  const container = document.getElementById('root')!;
  await new Promise((r) => setTimeout(r, 300)); //for hydrahation
  await initAuth();

  createRoot(container).render(<Root />);
};

bootstrap();
