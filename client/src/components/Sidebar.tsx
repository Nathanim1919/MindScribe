import React from 'react';
import { SidebarElement } from './sideBar/sideBarElement';
import { TopsidebarElements } from './sideBar/sideBarElements';
import { RiBarChartLine } from 'react-icons/ri';
import { useMatches } from '@tanstack/react-router';
import { motion } from 'motion/react';

interface SidebarProps {
  handleUserMenuClick?: (event: React.MouseEvent) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  handleUserMenuClick,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1] || {};
  const { hideSidebar } = currentMatch.staticData || {};


  return (
    <main
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="navigation"
      className={`
        fixed bottom-0 md:top-0 left-0 w-full bg-light-base dark:bg-dark-base grid place-items-center
        md:relative z-999 md:w-16 md:h-screen`}
    >
      <div
        role="navigation"
        className="
      bg-light-base dark:bg-dark-base/80 md:h-screen flex flex-col justify-center md:justify-start items-center backdrop-blur-lg gap-10 md:p-4 relative"
      >
        <RiBarChartLine className="hidden md:block dark:text-dark-600" />
        {(!hideSidebar || window.innerWidth < 768 || isHovered) && (
          <motion.ul
            initial={{ translateX: '-100%' }}
            animate={{ translateX: '0px', scale: 1 }}
            exit={{ opacity: 0, scale: 0.05 }}
            transition={{ duration: 0.2 }}
            className="flex md:flex-col gap-10 justify-between w-full items-center p-2 md:p-0"
          >
            <div
              className={`flex md:flex-col w-full h-full bg-light-base dark:bg-dark-50/0  border-gray-300  gap-4 md:gap-2`}
            >
              {TopsidebarElements.map((element) => (
                <SidebarElement key={element.redirectTo} metadata={element} />
              ))}
            </div>

            <div>
              
              <button
                onClick={(e) => {
                  if (handleUserMenuClick) {
                    handleUserMenuClick(e as React.MouseEvent);
                  }
                }}
                className="cursor-pointer w-10 h-10 p-1 bg-gray-200 dark:bg-dark-100 border border-light-300 dark:border-dark-200 hover:border-light-400 hover:dark:border-dark-300 rounded-full flex items-center justify-center"
              >
                <span className="text-md font-semibold dark:bg-dark-50 w-full h-full grid place-items-center rounded-full text-gray-700 dark:text-dark-500">
                  N
                </span>
              </button>
            </div>
          </motion.ul>
        )}
      </div>
    </main>
  );
};
