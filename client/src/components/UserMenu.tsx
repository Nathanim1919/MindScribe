import { FiUser, FiSettings, FiLogOut, FiArrowUpRight } from 'react-icons/fi';
import { LinkElement } from './Link';

interface UserMenuProps {
  display: boolean;
}

export const UserMenu: React.FC<UserMenuProps> = ({ display }) => {
  const handleLogout = () => {
    console.log('User logged out');
    // Add actual logout logic here
  };

  const linkElements = [
    {
      title: 'Profile',
      icon: <FiUser />,
      to: '/profile',
    },
    {
      title: 'Settings',
      icon: <FiSettings />,
      to: '/settings',
    },
    {
      title: 'Upgrade',
      icon: <FiArrowUpRight />,
      to: '/upgrade',
    },
    {
      title: 'Logout',
      icon: <FiLogOut />,
      to: '/logout',
      onClick: handleLogout,
    },
  ];

  if (!display) return null;

  return (
    <div className="absolute top-16 right-4 shadow-lg rounded-md flex flex-col bg-light-50 dark:bg-dark-base border dark:border-dark-100 border-light-200">
      {linkElements.map(({ title, icon, to, onClick }) => (
        <LinkElement
          key={title} // Use title as a stable key
          isLink={!!to} // Ensure it's a link only if `to` exists
          ariaLabel={title}
          title={title}
          icon={icon}
          to={to || '#'} // Default to '#' if no link provided
          onClick={onClick}
          isUserMenu={true}
          className="flex cursor-pointer p-2 border-b border-light-300 hover:bg-light-200 dark:border-dark-100 items-center gap-4 hover:dark:bg-dark-50 hover:dark:text-dark-800 dark:text-light-500"
        />
      ))}
    </div>
  );
};
