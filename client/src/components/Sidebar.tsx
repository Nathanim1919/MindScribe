import React, { useContext } from 'react';
import { SidebarElement } from './sideBar/sideBarElement';
import { TopsidebarElements } from './sideBar/sideBarElements';
import { RiBarChartLine } from 'react-icons/ri';
import { useRouterState } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { CiLight } from 'react-icons/ci';
import ThemeContext from '../contexts/ThemeContext';
import { MdNightlight } from 'react-icons/md';

export const Sidebar: React.FC = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const currentMatch = useRouterState({ select: (s: any) => s.matches.at(-1) });
  const { hideSidebar, hideHeader } = currentMatch.staticData || {};

  const { setTheme, theme, setSideBar, sideBar } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark'; // Check if the current theme is dark mode
  const icon = isDarkMode ? (
    <MdNightlight className="text-gray-800 dark:text-white" />
  ) : (
    <CiLight className="text-gray-800 dark:text-white" />
  ); // Use the appropriate icon based on the theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); // Correctly toggle the theme
  };

  return (
    <main
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="navigation"
      className={`absolute -left-16  md:left-0 md:relative z-999 w-16 h-screen dark:bg-dark-base`}
    >
      <div
        role="navigation"
        className="
      bg-[#f2f3f5] dark:bg-dark-base/80 h-screen flex flex-col justify backdrop-blur-lg gap-10 p-4 relative items-center"
      >
        <RiBarChartLine className="dark:text-dark-600" />
        {!(hideSidebar === true && isHovered === false) && (
          <motion.ul
            initial={{ translateX: '-100%' }}
            animate={{ translateX: '0px', scale: 1 }}
            exit={{ opacity: 0, scale: 0.05 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-10"
          >
            <div
              className={`flex flex-col bg-light-100 dark:bg-dark-50/0  border-gray-300 items-center gap-2`}
            >
              {TopsidebarElements.map((element) => (
                <SidebarElement key={element.redirectTo} metadata={element} />
              ))}
            </div>
            {(hideSidebar || hideHeader) && (
              <button
                onClick={toggleTheme}
                className={`flex text-2xl cursor-pointer group mt-10 relative items-center w-10 h-10 p-1 justify-center hover:bg-light-100 hover:dark:bg-dark-100 rounded-full dark:text-white transition-colors`}
                aria-label={'Theme'}
              >
                {icon}
              </button>
            )}
          </motion.ul>
        )}
      </div>
    </main>
  );
};
