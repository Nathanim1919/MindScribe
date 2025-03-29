import React from 'react';
import { SidebarElementPropType } from '../../types/sideBar.type';
import { LinkElement } from '../Link';

// SidebarElement component
export const SidebarElement: React.FC<{ metadata: SidebarElementPropType }> = ({
  metadata,
}) => {
  const { title, icon, redirectTo, onClick } = metadata;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <LinkElement
      isLink={!!redirectTo}
      ariaLabel={title}
      key={redirectTo || title}
      title={title}
      icon={icon}
      to={redirectTo}
      onClick={handleClick}
      className="flex group text-[20px] duration-150 hover:bg-light-200 dark:hover:bg-dark-100 relative items-center p-2 rounded-[13px] justify-center dark:text-dark-600 transition-colors"
    />
  );
};
