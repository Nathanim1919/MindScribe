import { MdNightlight } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';
import { motion } from 'framer-motion';
import { useCallback, useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import { LinkElement } from './Link';
import { useIsMobile } from '../hooks/useIsMobile';
import { useUserMenuElements } from './sideBar/sideBarElements';
import { useNavigate } from '@tanstack/react-router';


interface UserMenuProps {
  setDisplayUserMenu: (value: boolean) => void;
  display: boolean;
  position: {
    top: number;
    left: string;
  };
}

export const UserMenu: React.FC<UserMenuProps> = ({
  setDisplayUserMenu,
  display,
  position,
}) => {
  const { setTheme, theme } = useContext(ThemeContext); 
  const isDarkMode = theme === 'dark';
  const navigate = useNavigate();
  const isMobile = useIsMobile(); 
  const userMenuItems = useUserMenuElements(navigate); 

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    setDisplayUserMenu(false);
  }, [theme, setTheme, setDisplayUserMenu]);

  
  if (!display) return null;
  
  const { top, left } = position;
  const icon = isDarkMode ? (
    <MdNightlight className="text-gray-800 dark:text-white" />
  ) : (
    <CiLight className="text-gray-800 dark:text-white" />
  );

  const menuStyles = {
    top: isMobile ? '70%' : `${top + 20}px`,
    left: isMobile ? left : '0px',
    right: isMobile ? '0px' : 'auto',
  };

  return (
    <motion.div
      initial={{ translateX: '-40px' }}
      animate={{ translateX: '0px' }}
      transition={{ duration: 0.1 }}
      style={menuStyles}
      role="menu"
      className="absolute z-1999 transition-all duration-200
        border bg-light-100/60 border-light-300 dark:border-dark-100 rounded-md border-b-0 overflow-hidden backdrop-blur-lg dark:bg-dark-50/40"
    >
      {userMenuItems.map(({ title, icon, to, onClick }) => (
        <LinkElement
          setDisplayUserMenu={setDisplayUserMenu}
          key={title}
          isLink={!!to}
          ariaLabel={title}
          title={title}
          icon={icon}
          to={to || '#'}
          onClick={onClick}
          isUserMenu={true}
          className="flex cursor-pointer px-3 py-2 border-b border-light-300 hover:bg-light-200 dark:border-dark-100 items-center gap-2 hover:dark:bg-dark-50 hover:dark:text-dark-800 dark:text-light-500"
        />
      ))}
      <button
        onClick={toggleTheme}
        className="flex cursor-pointer w-full px-3 py-2 border-b border-light-300 hover:bg-light-200 dark:border-dark-100 items-center gap-2 hover:dark:bg-dark-50 hover:dark:text-dark-800 dark:text-light-500"
        aria-label="Theme"
      >
        {icon}
        Theme
      </button>
    </motion.div>
  );
};
