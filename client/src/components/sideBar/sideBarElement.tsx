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
      className="flex group relative items-center p-2 justify-center dark:text-white transition-colors"
    />
  );
};
