import React from 'react';
import { SidebarElement } from './sideBar/sideBarElement';
import { TopsidebarElements } from './sideBar/sideBarElements';
import { RiBarChartLine } from 'react-icons/ri';
import { useRouterState } from '@tanstack/react-router';
import { motion } from 'motion/react';

export const Sidebar: React.FC = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const currentMatch = useRouterState({ select: (s: any) => s.matches.at(-1) });
  const { hideSidebar } = currentMatch.staticData || {};

  return (
    <main
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="navigation"
      className={`relative z-999  w-16 h-screen dark:bg-dark-base`}
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
            className={`flex flex-col bg-light-100 dark:bg-dark-50/0 ${hideSidebar}   border-gray-300 items-center gap-2`}
          >
            {TopsidebarElements.map((element) => (
              <SidebarElement key={element.redirectTo} metadata={element} />
            ))}
          </motion.ul>
        )}
      </div>
    </main>
  );
};
