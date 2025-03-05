import { GoHome } from 'react-icons/go';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { SidebarElementPropType } from '../../types/sideBar.type';

export const sidebarElements: SidebarElementPropType[] = [
  {
    title: 'Dashboard',
    icon: <GoHome />,
    redirectTo: '/dashboard',
  },
  {
    title: 'Profile',
    icon: <FiUser />,
    redirectTo: '/profile',
  },
  {
    title: 'Settings',
    icon: <FiSettings />,
    redirectTo: '/settings',
  },
  {
    title: 'Logout',
    icon: <FiLogOut />,
    redirectTo: '/logout',
    onClick: () => {
      // Handle logout logic here
      console.log('User logged out');
    },
  },
];
