import { MdNightlight } from 'react-icons/md';
import { LinkElement } from './Link';
import { UserMenuElements } from './sideBar/sideBarElements';
import { CiLight } from 'react-icons/ci';
import ThemeContext from '../contexts/ThemeContext';
import { useContext } from 'react';
import { motion } from 'motion/react';

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
  if (!display) return null;

  const { top, left } = position;

  const { setTheme, theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark'; // Check if the current theme is dark mode

  const icon = isDarkMode ? (
    <MdNightlight className="text-gray-800 dark:text-white" />
  ) : (
    <CiLight className="text-gray-800 dark:text-white" />
  ); // Use the appropriate icon based on the theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); // Correctly toggle the theme
    setDisplayUserMenu(false);
  };

  return (
    <motion.div
      initial={{ translateX: '-40px' }}
      animate={{ translateX: '0px' }}
      transition={{ duration: 0.1 }}
      style={{ top: `${top + 20}px`, left: left }}
      role="menu"
      className="absolute z-1999 transition-all duration-200
       border bg-light-100/60 border-light-300 dark:border-dark-100 rounded-md border-b-0 overflow-hidden backdrop-blur-lg dark:bg-dark-50/40
      "
    >
      {UserMenuElements.map(({ title, icon, to, onClick }) => (
        <LinkElement
          setDisplayUserMenu={setDisplayUserMenu}
          key={title} // Use title as a stable key
          isLink={!!to} // Ensure it's a link only if `to` exists
          ariaLabel={title}
          title={title}
          icon={icon}
          to={to || '#'} // Default to '#' if no link provided
          onClick={onClick}
          isUserMenu={true}
          className="flex cursor-pointer px-3 py-2 border-b border-light-300 hover:bg-light-200 dark:border-dark-100 items-center gap-2 hover:dark:bg-dark-50 hover:dark:text-dark-800 dark:text-light-500"
        />
      ))}
      <button
        onClick={toggleTheme}
        className="flex cursor-pointer w-full px-3 py-2 border-b border-light-300 hover:bg-light-200 dark:border-dark-100 items-center gap-2 hover:dark:bg-dark-50 hover:dark:text-dark-800 dark:text-light-500"
        aria-label={'Theme'}
      >
        {icon}
        Theme
      </button>
    </motion.div>
  );
};
