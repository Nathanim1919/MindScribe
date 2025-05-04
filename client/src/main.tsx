import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { BlockProvider } from './contexts/BlockContext.tsx';
import { PreferencesProvider } from './contexts/PreferencesContext.tsx';
import { AuthProvider } from './contexts/authContext.tsx';
import { EntryProvider } from './contexts/EntryContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <PreferencesProvider>
        <BlockProvider>
          <AuthProvider>
            <EntryProvider>
              <App />
            </EntryProvider>
          </AuthProvider>
        </BlockProvider>
      </PreferencesProvider>
    </ThemeProvider>
  </StrictMode>,
);
