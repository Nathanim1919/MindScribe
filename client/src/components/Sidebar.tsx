import React from 'react';
import { SidebarElement } from './sideBar/sideBarElement';
import { TopsidebarElements } from './sideBar/sideBarElements';
import { RiBarChartLine } from 'react-icons/ri';

// Define the type for sidebar elements

export const Sidebar: React.FC = () => {
  return (
    <nav
      role="navigation"
      className="bg-[#f2f3f5] overflow-hidden dark:bg-dark-base h-screen flex flex-col gap-4 p-2 relative items-center"
    >
      <RiBarChartLine className="dark:text-dark-600" />
      <ul className="flex flex-col bg-white dark:bg-dark-50 border overflow-hidden border-gray-300 dark:border-dark-200 items-center gap-2 rounded-lg">
        {TopsidebarElements.map((element) => (
          <SidebarElement key={element.redirectTo} metadata={element} />
        ))}
      </ul>
    </nav>
  );
};
