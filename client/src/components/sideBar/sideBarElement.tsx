import React from 'react';
import { SidebarElementPropType } from '../../types/sideBar.type';
import { Link } from '@tanstack/react-router';

// SidebarElement component
export const SidebarElement: React.FC<{ metadata: SidebarElementPropType }> = ({
  metadata,
}) => {
  const { title, icon, redirectTo, onClick } = metadata;

  const handleClick = () => {
    if (onClick) {
      onClick(); // Trigger logout or other actions
    }
  };

  return (
    <li className="mb-4">
      <Link
        to={redirectTo}
        onClick={handleClick}
        className="flex group relative items-center p-2 justify-center hover:text-gray-400 transition-colors"
        aria-label={title}
      >
        <span className="">{icon}</span>
        <span className="absolute left-0 bg-white py-[4px] px-2 border border-gray-400 shadow-2xl rounded-[4px] hidden  group-hover:block group-hover:left-10 transform transition-left duration-200 ease-in-out">
          {title}
        </span>
      </Link>
    </li>
  );
};
