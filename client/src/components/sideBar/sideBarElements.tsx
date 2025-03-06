import { GoHome } from 'react-icons/go';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { SidebarElementPropType } from '../../types/sideBar.type';
import { RiGeminiLine } from 'react-icons/ri';
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';

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
    title: 'Chat',
    icon: <RiGeminiLine />,
    redirectTo: '/chat',
  },
  {
    title: 'Media',
    icon: <TfiLayoutMediaCenterAlt />,
    redirectTo: '/media-center',
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
