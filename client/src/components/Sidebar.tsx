import React from 'react';
import { SidebarElement } from './sideBar/sideBarElement';
import { TopsidebarElements } from './sideBar/sideBarElements';
import { RiBarChartLine } from 'react-icons/ri';

// Define the type for sidebar elements
interface SidebarMetadata {
  hideSidebar?: boolean;
}

export const Sidebar: React.FC<SidebarMetadata> = ({
  hideSidebar,
}) => {
  console.log(hideSidebar)
  return (
    <main className="relative z-999 w-16 h-screen  dark:bg-dark-base">
      <nav
        role="navigation"
        className="
      bg-[#f2f3f5] dark:bg-dark-base/80 h-screen flex flex-col backdrop-blur-lg gap-10 p-4 relative items-center"
      >
        <RiBarChartLine className="dark:text-dark-600" />
        {hideSidebar && <ul className="flex flex-col bg-light-100 dark:bg-dark-50/0  border-gray-300 items-center gap-2">
          {TopsidebarElements.map((element) => (
            <SidebarElement key={element.redirectTo} metadata={element} />
          ))}
        </ul>}
      </nav>
    </main>
  );
};
