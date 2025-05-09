import { GoHome } from 'react-icons/go';
import { FiArrowUpRight, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import { SidebarElementPropType } from '../../types/sideBar.type';
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi';
import { FaBook } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineSelfImprovement } from 'react-icons/md';
import { authClient } from '../../lib/authClient';
import { useNavigate } from '@tanstack/react-router';
import { createNewDraft } from '../../storage/entryStorage';
import { useBlockContext } from '../../contexts/BlockContext';
import { Entry } from '../../types/entrie.interface';
import { createEntry } from '../../services/entry.service';
import { useEntryContext } from '../../contexts/EntryContext';

// Sidebar elements with context-safe hook
export const useTopSidebarElements = (): SidebarElementPropType[] => {
  const { setBlocks } = useBlockContext();
    const { setSelectedEntryDetail } = useEntryContext();
  
  const navigate = useNavigate();

  const handleCreateNewDraft = async () => {
    const newEntry = await createEntry();
    console.log('New entry created:------------', newEntry);

    if (newEntry && newEntry._id) {
      createNewDraft(newEntry._id);
      navigate({ to: `/in/entries/${newEntry._id}` });
    } else {
      alert('Failed to create a new entry');
    }
  };

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
      onClick: handleCreateNewDraft,
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

export const useUserMenuElements = (
  navigate: ReturnType<typeof useNavigate>,
) => {
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
