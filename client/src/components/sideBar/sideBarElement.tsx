import React from 'react';
import { SidebarElementPropType } from '../../types/sideBar.type';
import { LinkElement } from '../Link';

// SidebarElement component
export const SidebarElement: React.FC<{ metadata: SidebarElementPropType }> = ({
  metadata,
}) => {
  const { title, icon, redirectTo, active, onClick } = metadata;

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
      className={`flex text-[20px] duration-150 ${active?"dark:bg-dark-100 bg-light-200":""} hover:text-violet-500 relative items-center p-2 rounded-[13px] justify-center dark:text-dark-600 transition-colors h-full`}
    />
  );
};
