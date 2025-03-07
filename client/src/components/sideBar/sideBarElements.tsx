import { GoHome } from 'react-icons/go';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { SidebarElementPropType } from '../../types/sideBar.type';
import { RiGeminiLine } from 'react-icons/ri';
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';
import { CiLight } from "react-icons/ci";
import { AiOutlineSetting } from "react-icons/ai";
import { FaBook } from "react-icons/fa";


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
    redirectTo:
      '/entries',
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

export const BottomSidebarElements = [
  {
    title: 'Theme',
    icon: <CiLight />,
    redirectTo: '/theme',
  },
  {
    title: 'Settings',
    icon: <AiOutlineSetting />,
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
