import { GoHome } from 'react-icons/go';
import { FiArrowUpRight, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import { SidebarElementPropType } from '../../types/sideBar.type';
import { RiGeminiLine } from 'react-icons/ri';
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';
import { FaBook } from 'react-icons/fa';
import { IoMdAdd } from "react-icons/io";


export const TopsidebarElements: SidebarElementPropType[] = [
  {
    title: 'Dashboard',
    icon: <GoHome />,
    redirectTo: '/in/home',
  },
  {
    title:"Entry",
    icon:<IoMdAdd />,
    redirectTo: '/in/new',
  },
  {
    title: 'Entries',
    icon: <FaBook />,
    redirectTo: '/in/home/entries',
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

const handleLogout = () => {
  console.log('User logged out');
  // Add actual logout logic here
};

export const UserMenuElements = [
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
