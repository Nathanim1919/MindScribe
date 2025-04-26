import { GoHome } from 'react-icons/go';
import { FiArrowUpRight, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import { SidebarElementPropType } from '../../types/sideBar.type';
import { RiGeminiLine } from 'react-icons/ri';
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';
import { FaBook } from 'react-icons/fa';
import { IoMdAdd } from "react-icons/io";
import { authClient } from '../../lib/authClient';
import { MdOutlineSelfImprovement } from 'react-icons/md';



export const TopsidebarElements: SidebarElementPropType[] = [
  {
    title: 'Dashboard',
    icon: <GoHome />,
    redirectTo: '/in/home',
  },
  {
    title: 'Entries',
    icon: <FaBook />,
    redirectTo: '/in/home/entries',
  },
  {
    title:"Entry",
    icon:<IoMdAdd />,
    redirectTo: '/in/new',
  },
  {
    title:"Activity",
    icon:<MdOutlineSelfImprovement />,
    redirectTo:'/in/progress'
  },
  // {
  //   title: 'Chat',
  //   icon: <RiGeminiLine />,
  //   redirectTo: '/chat',
  // },
  {
    title: 'Media',
    icon: <TfiLayoutMediaCenterAlt />,
    redirectTo: '/in/gallary',
  },
];

const handleLogout = async () => {
  const res = await authClient.signOut();
  if (res?.error) {
    console.error('Logout error:', res.error);
    return;
  }

  
  console.log('Logout successful:', res);
  // Optionally, you can redirect the user to the login page or show a success messagez

};

export const UserMenuElements = [
  {
    title: 'Profile',
    icon: <FiUser />,
    to: '/in/home/profile',
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
    onClick: handleLogout,
  },
];
