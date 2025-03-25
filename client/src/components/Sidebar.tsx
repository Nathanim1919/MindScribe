import React from 'react';
import { SidebarElement } from './sideBar/sideBarElement';
import { TopsidebarElements } from './sideBar/sideBarElements';
import { RiBarChartLine } from 'react-icons/ri';

// Define the type for sidebar elements

export const Sidebar: React.FC = () => {
  return (
    <main
    className='relative overflow-hidden h-screen  dark:bg-dark-base'
    >
      <nav
      role="navigation"
      className="
      bg-[#f2f3f5] overflow-hidden dark:bg-dark-base/80 h-screen flex flex-col backdrop-blur-lg gap-4 p-2 relative items-center"
      >
      <RiBarChartLine className="dark:text-dark-600" />
      <ul className="flex flex-col bg-white dark:bg-dark-50/0  overflow-hidden border-gray-300 items-center gap-2">
        {TopsidebarElements.map((element) => (
          <SidebarElement key={element.redirectTo} metadata={element} />
        ))}
      </ul>
    </nav>
    </main>
  );
};
