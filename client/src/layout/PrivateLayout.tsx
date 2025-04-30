import { Outlet } from '@tanstack/react-router';
import { Header } from '../components/dashboard/Header';
import { Sidebar } from '../components/Sidebar';
import { UserMenu } from '../components/UserMenu';
import { useEffect, useState } from 'react';

export function AuthenticatedLayout() {
  const [displayUserMenu, setDisplayUserMenu] = useState(false);
  
  const [position, setPosition] = useState({
    top: 0,
    left: '0px',
  });
  const handleUserMenuClick = (event: React.MouseEvent) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    setPosition({
      top: rect.top,
      left: `${rect.left}px`,
    });
    console.log("New position:", {
      top: rect.top + window.scrollY,
      left: `${rect.left}px`,
    });
    setDisplayUserMenu((prev) => !prev);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const userMenu = document.querySelector('.user-menu') as HTMLElement;
    if (userMenu && !userMenu.contains(target)) {
      setDisplayUserMenu(false);
    }
  };


  // Add event listener for outside clicks
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <Header/>

      <div className="flex overflow-hidden">
      <UserMenu 
        setDisplayUserMenu={setDisplayUserMenu}
        display={displayUserMenu}
        position={position}
      />
        <Sidebar 
         handleUserMenuClick={handleUserMenuClick}
        />
        <main className="flex-1 bg-light-100 dark:bg-dark-base pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
