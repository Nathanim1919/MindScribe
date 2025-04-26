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
      className={`
        fixed bottom-0 md:top-0 left-0 w-full bg-dark-base grid place-items-center
        md:relative z-999 md:w-16 md:h-screen`}
    >
      <div
        role="navigation"
        className="
      bg-[#f2f3f5] dark:bg-dark-base/80 md:h-screen flex flex-col justify-center md:justify-start items-center backdrop-blur-lg gap-10 md:p-4 relative"
      >
        <RiBarChartLine className="hidden md:block dark:text-dark-600" />
        {(!hideSidebar || window.innerWidth < 768 || isHovered) && (
          <motion.ul
            initial={{ translateX: '-100%' }}
            animate={{ translateX: '0px', scale: 1 }}
            exit={{ opacity: 0, scale: 0.05 }}
            transition={{ duration: 0.2 }}
            className="flex md:flex-col gap-10 justify-between w-full items-center p-2"
          >
            <div
              className={`flex md:flex-col w-full h-full bg-light-100 dark:bg-dark-50/0  border-gray-300  gap-4 md:gap-2`}
            >
              {TopsidebarElements.map((element) => (
                <SidebarElement key={element.redirectTo} metadata={element} />
              ))}
            </div>
            {(hideSidebar || hideHeader) && (
              <button
                onClick={toggleTheme}
                className={`flex text-2xl cursor-pointer group md:mt-10 relative items-center w-10 h-10 p-1 justify-center hover:bg-light-100 hover:dark:bg-dark-100 rounded-full dark:text-white transition-colors`}
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
