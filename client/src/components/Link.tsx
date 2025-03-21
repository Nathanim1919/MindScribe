import { Link } from '@tanstack/react-router';

interface LinkProps {
  to?: string;
  title: string;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  icon?: React.ReactNode;
  isLink?: boolean;
  isUserMenu?: boolean;
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
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return isLink && to ? (
    <li className={`${!isUserMenu && 'mb-4'} list-none`}>
      <Link
        to={to}
        onClick={handleClick}
        className={`group relative ${className}`}
        aria-label={ariaLabel}
        activeProps={{ className: 'text-black bg-light-200 dark:bg-light-700' }}
        activeOptions={{ exact: true }}
      >
        <span>{icon}</span>
        {isUserMenu ? (
          <span>{title}</span>
        ) : (
          <span className="absolute z-50 left-0 bg-white dark:bg-dark-50 dark:text-dark-900 py-[4px] px-2 border border-gray-400 dark:border-dark-200 shadow-2xl rounded-[4px] hidden group-hover:block group-hover:left-10 transition duration-200 ease-in-out">
        {title}
          </span>
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
