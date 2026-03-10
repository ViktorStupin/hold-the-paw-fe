import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { Root } from './routes/Root.tsx';

createRoot(document.getElementById('root')!).render(<Root />);
