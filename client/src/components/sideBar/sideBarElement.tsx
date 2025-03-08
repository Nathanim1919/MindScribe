import React, { useContext } from 'react';
import { SidebarElementPropType } from '../../types/sideBar.type';
import { Link } from '@tanstack/react-router';
import ThemeContext from '../../contexts/ThemeContext';

// SidebarElement component
export const SidebarElement: React.FC<{ metadata: SidebarElementPropType }> = ({
  metadata,
}) => {
  const { title, icon, redirectTo, onClick } = metadata;
  const { setTheme, theme } = useContext(ThemeContext);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (redirectTo) {
    return (
      <li className="mb-4">
        <Link
          to={redirectTo}
          onClick={handleClick}
          className="flex group relative items-center p-2 justify-center hover:text-gray-400 dark:text-white transition-colors"
          aria-label={title}
        >
          <span className="">{icon}</span>
          <span className="absolute left-0 bg-white dark:bg-dark-50 dark:text-dark-900 py-[4px] px-2 border border-gray-400 dark:border-dark-200 shadow-2xl rounded-[4px] hidden  group-hover:block group-hover:left-10 transform transition-left duration-200 ease-in-out">
            {title}
          </span>
        </Link>
      </li>
    );
  } else {
    return (
      <li className="mb-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex cursor-pointer group relative items-center p-2 justify-center hover:text-gray-400 dark:text-white transition-colors"
          aria-label={title}
        >
          <span className="">{icon}</span>
          <span className="absolute left-0 bg-white dark:bg-dark-50 dark:text-dark-900 py-[4px] px-2 border border-gray-400 dark:border-dark-200 shadow-2xl rounded-[4px] hidden  group-hover:block group-hover:left-10 transform transition-left duration-200 ease-in-out">
            {title}
          </span>
        </button>
      </li>
    );
  }
};
