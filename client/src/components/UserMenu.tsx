import { LinkElement } from './Link';
import { UserMenuElements } from './sideBar/sideBarElements';

interface UserMenuProps {
  display: boolean;
}

export const UserMenu: React.FC<UserMenuProps> = ({ display }) => {
  if (!display) return null;

  return (
    <div
      role="menu"
      className="fixed z-999 transition-all duration-1000
       right-4 top-14 border bg-light-100/60 dark:border-dark-100 rounded-md border-b-0 overflow-hidden backdrop-blur-lg dark:bg-dark-50/40
      "
    >
      {UserMenuElements.map(({ title, icon, to, onClick }) => (
        <LinkElement
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
    </div>
  );
};
