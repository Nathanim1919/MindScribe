import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { BlockProvider } from './contexts/BlockContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <BlockProvider>
      <App />
    </BlockProvider>
    </ThemeProvider>
  </StrictMode>,
);
