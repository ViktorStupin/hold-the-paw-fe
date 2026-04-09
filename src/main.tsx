import { createRoot } from 'react-dom/client';
import { GlobalProvider } from './providers/GlobalProvider.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(<GlobalProvider />);
