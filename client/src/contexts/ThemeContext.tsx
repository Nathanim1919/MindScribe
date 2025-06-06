import React, { createContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';
export type entrieListStyle = 'grid' | 'list';
export type sideBar = 'hide' | 'show';

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  listStyle: entrieListStyle;
  setListStyle: (listStyle: entrieListStyle) => void;
  sideBar: sideBar;
  setSideBar: (sideBar: sideBar) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  listStyle: 'grid',
  setListStyle: () => {},
  sideBar: 'hide',
  setSideBar: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme || 'light';
  });

  const [listStyle, setListStyle] = useState<entrieListStyle>(() => {
    const savedListStyle = localStorage.getItem(
      'listStyle',
    ) as entrieListStyle | null;
    return savedListStyle || 'grid';
  });

  const [sideBar, setSideBar] = useState<sideBar>('hide');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('listStyle', listStyle);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (listStyle === 'list') {
      document.documentElement.classList.add('list');
    } else {
      document.documentElement.classList.remove('list');
    }
  }, [theme, listStyle]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, listStyle, setListStyle, sideBar, setSideBar }}
    >
      {children}
    </ThemeContext.Provider>
  );
}; // <-- Missing closing bracket was here

export const ThemeConsumer = ThemeContext.Consumer;

export default ThemeContext;
