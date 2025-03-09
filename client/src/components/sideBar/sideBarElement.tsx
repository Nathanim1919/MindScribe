import React, { useContext } from 'react';
import { SidebarElementPropType } from '../../types/sideBar.type';
import ThemeContext from '../../contexts/ThemeContext';
import { LinkElement } from '../Link';

// SidebarElement component
export const SidebarElement: React.FC<{ metadata: SidebarElementPropType }> = ({ metadata }) => {
  const { title, icon, redirectTo, onClick } = metadata;
  const { setTheme, theme } = useContext(ThemeContext);

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
      onClick={redirectTo ? handleClick : () => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex group relative items-center p-2 justify-center dark:text-white transition-colors"
    />
  );
};
