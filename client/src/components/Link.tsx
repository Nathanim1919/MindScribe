import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';

interface LinkProps {
  to?: string;
  title: string;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  icon?: React.ReactNode;
  isLink?: boolean;
  isUserMenu?: boolean;
  setDisplayUserMenu?: (value: boolean) => void;
}

export const LinkElement: React.FC<LinkProps> = ({
  to,
  title,
  className = '',
  onClick,
  ariaLabel = title,
  icon,
  isLink = true,
  isUserMenu = false,
  setDisplayUserMenu,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    if (isUserMenu && setDisplayUserMenu) {
      setDisplayUserMenu(false);
    }
  };

  return (isLink && to) ? (
    <li className={`${!isUserMenu && 'md:mb-4'} list-none`}>
      <Link
        to={to}
        onClick={handleClick}
        className={`group relative ${className}`}
        aria-label={ariaLabel}
        activeProps={{
          className: `${!isUserMenu ? 'text-[23px]' : ''} font-bold text-violet-600 dark:text-violet-600`,
        }}
        activeOptions={{ exact: true }}
      >
        <span className="group-hover:rotate-12 transition-all duration-200">
          {icon}
        </span>
        {isUserMenu ? (
          <span>{title}</span>
        ) : (
          <motion.span
            initial={{ translateX: '20px' }}
            animate={{ translateX: '0px' }}
            transition={{ duration: '.5' }}
            className="absolute font-light text-[16px] z-1002 -left-30 bg-white dark:bg-dark-50 dark:text-dark-900 py-[4px] px-2 border border-gray-400 dark:border-dark-200 shadow-2xl rounded-[4px] hidden group-hover:block group-hover:left-10"
          >
            {title}
          </motion.span>
        )}
      </Link>
    </li>
  ) : (
    <button
      onClick={handleClick}
      className={`flex cursor-pointer group relative items-center p-2 justify-center dark:text-white transition-colors ${className}`}
      aria-label={ariaLabel}
    >
      <span>{icon}</span>
      {
        <span className="absolute left-0 bg-white dark:bg-dark-50 dark:text-dark-900 py-[4px] px-2 border border-gray-400 dark:border-dark-200 shadow-2xl rounded-[4px] hidden group-hover:block group-hover:left-10 transition duration-200 ease-in-out">
          {title}
        </span>
      }
    </button>
  );
};
