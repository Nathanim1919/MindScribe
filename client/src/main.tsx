import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { BlockProvider } from './contexts/BlockContext.tsx';
import { PreferencesProvider } from './contexts/PreferencesContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BlockProvider>
        <PreferencesProvider>
          <App />
        </PreferencesProvider>
      </BlockProvider>
    </ThemeProvider>
  </StrictMode>,
);
