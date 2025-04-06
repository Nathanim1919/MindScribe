import { Outlet, useRouterState } from '@tanstack/react-router';
import { Header } from '../components/dashboard/Header';
import { Sidebar } from '../components/Sidebar';
import { UserMenu } from '../components/UserMenu';
import { useState } from 'react';

export function AuthenticatedLayout() {
   const [displayUserMenu, setDisplayUserMenu] = useState(false);

   const currentMatch = useRouterState({ select: (s:any) => s.matches.at(-1) });

   console.log(currentMatch.staticData); // ✅ Now you'll see the object
  
   const {hideHeader, hideSidebar} = currentMatch.staticData.routeMeta || {};


  return (
    <div className="flex flex-col overflow-hidden h-screen">
      {hideHeader && (
        <Header setDisplayUserMenu={setDisplayUserMenu} displayUserMenu={displayUserMenu}/>
      )}
      <UserMenu display={displayUserMenu} />
      <div className="flex overflow-hidden">
      <Sidebar hideSidebar={hideSidebar}/>
        <main className="flex-1 bg-light-100 dark:bg-dark-base">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
