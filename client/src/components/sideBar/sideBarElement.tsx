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
    <li className="mb-2">
      <Link
        to={redirectTo}
        onClick={handleClick}
        className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
        aria-label={title}
      >
        <span className="mr-2">{icon}</span>
        <span>{title}</span>
      </Link>
    </li>
  );
};
