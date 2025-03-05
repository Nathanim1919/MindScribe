import React from 'react';
import { SidebarElement } from './sideBar/sideBarElement';
import { sidebarElements } from './sideBar/sideBarElements';
import { RiBarChartLine } from 'react-icons/ri';

// Define the type for sidebar elements

export const Sidebar: React.FC = () => {
  return (
    <nav className="bg-gray-800 w-24 h-screen flex flex-col relative items-center gap-4">
      <div className="">
        <RiBarChartLine />
      </div>
      <ul className='bg-red-500 h-full flex flex-col'>
        {sidebarElements.map((element, index) => (
          <SidebarElement key={index} metadata={element} />
        ))}
      </ul>
    </nav>
  );
};
