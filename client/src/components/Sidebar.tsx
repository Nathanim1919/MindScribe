import React from 'react';
import { SidebarElement } from './sideBar/sideBarElement';
import { sidebarElements } from './sideBar/sideBarElements';

// Define the type for sidebar elements

export const Sidebar: React.FC = () => {
  return (
    <nav className="w-64 bg-gray-800 text-white p-4">
      <ul>
        {sidebarElements.map((element, index) => (
          <SidebarElement key={index} metadata={element} />
        ))}
      </ul>
    </nav>
  );
};
