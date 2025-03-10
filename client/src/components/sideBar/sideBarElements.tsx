import { GoHome } from 'react-icons/go';
import { FiUser } from 'react-icons/fi';
import { SidebarElementPropType } from '../../types/sideBar.type';
import { RiGeminiLine } from 'react-icons/ri';
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';
import { FaBook } from 'react-icons/fa';

export const TopsidebarElements: SidebarElementPropType[] = [
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
    title: 'Entries',
    icon: <FaBook />,
    redirectTo: '/entries',
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
];
