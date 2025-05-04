import { GoHome } from 'react-icons/go';
import { FiArrowUpRight, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import { SidebarElementPropType } from '../../types/sideBar.type';
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';
import { FaBook } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineSelfImprovement } from 'react-icons/md';
import { authClient } from '../../lib/authClient';
import { useEntryContext } from '../../contexts/EntryContext';
import { useNavigate } from '@tanstack/react-router';

// Sidebar elements with context-safe hook
export const useTopSidebarElements = (): SidebarElementPropType[] => {
  const { addEntry } = useEntryContext();

  return [
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
      title: 'Entry',
      icon: <IoMdAdd />,
      redirectTo: '/in/new',
      onClick: addEntry,
    },
    {
      title: 'Activity',
      icon: <MdOutlineSelfImprovement />,
      redirectTo: '/in/progress',
    },
    {
      title: 'Media',
      icon: <TfiLayoutMediaCenterAlt />,
      redirectTo: '/in/gallary',
    },
  ];
};

export const useUserMenuElements = (navigate: ReturnType<typeof useNavigate>) => {
  const handleLogout = async () => {
    try {
      const res = await authClient.signOut();
      if (res?.error) {
        console.error('Logout error:', res.error);
        return;
      }

      console.log('Logout successful');
      navigate('/login');
    } catch (error) {
      console.error('Unexpected logout error:', error);
    }
  };

  return [
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
      to: '/login',
      onClick: handleLogout,
    },
  ];
};
