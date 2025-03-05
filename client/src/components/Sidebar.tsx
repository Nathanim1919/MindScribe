import { GoHome } from 'react-icons/go';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { Link } from '@tanstack/react-router';
import React from 'react';

// Define the type for sidebar elements
type SidebarElement = {
  title: string;
  icon: React.ReactNode;
  redirectTo: string;
  onClick?: () => void; // Optional click handler for logout
};

export const Sidebar: React.FC = () => {
  // Sidebar elements configuration
  const sidebarElements: SidebarElement[] = [
    {
      title: 'Dashboard',
      icon: <GoHome />,
      redirectTo: '/dashboard',
    },
    {
      title: 'Profile',
      icon: <FiUser />,
      redirectTo: '/profile',
    },
    {
      title: 'Settings',
      icon: <FiSettings />,
      redirectTo: '/settings',
    },
    {
      title: 'Logout',
      icon: <FiLogOut />,
      redirectTo: '/logout',
      onClick: () => {
        // Handle logout logic here
        console.log('User logged out');
      },
    },
  ];

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

// SidebarElement component
export const SidebarElement: React.FC<{ metadata: SidebarElement }> = ({
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
