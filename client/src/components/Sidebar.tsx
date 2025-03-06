import React from 'react';
import { SidebarElement } from './sideBar/sideBarElement';
import { sidebarElements } from './sideBar/sideBarElements';
import { RiBarChartLine } from 'react-icons/ri';

// Define the type for sidebar elements

export const Sidebar: React.FC = () => {
  return (
    <nav className="bg-[#f2f3f5] w-20 h-screen flex flex-col gap-4 py-2 relative items-center">
      <RiBarChartLine />
      <ul className="flex flex-col bg-white border border-gray-300 items-center gap-2 py-4 rounded-lg">
        {sidebarElements.map((element, index) => (
          <SidebarElement key={index} metadata={element} />
        ))}
      </ul>
    </nav>
  );
};
