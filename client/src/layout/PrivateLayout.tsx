import { Outlet } from '@tanstack/react-router';
import { Header } from '../components/dashboard/Header';
import { Sidebar } from '../components/Sidebar';
import { UserMenu } from '../components/UserMenu';
import { useState } from 'react';

export function AuthenticatedLayout() {
   const [displayUserMenu, setDisplayUserMenu] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden h-screen">
  
      <Header setDisplayUserMenu={setDisplayUserMenu} displayUserMenu={displayUserMenu}/>
 
      <UserMenu display={displayUserMenu} />
      <div className="flex overflow-hidden">
      <Sidebar/>
        <main className="flex-1 bg-light-100 dark:bg-dark-base">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
