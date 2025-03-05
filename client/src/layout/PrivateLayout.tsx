import { Outlet } from '@tanstack/react-router';
import { Header } from '../components/dashboard/Header';
import { Sidebar } from '../components/Sidebar';

export function AuthenticatedLayout() {
  return (
    <div className='flex flex-col'>
        <Header />
      <div className='flex'>
      <Sidebar />
        <main className='flex-1 bg-amber-200'>
          <Outlet /> {/* Renders the matched route */}
        </main>
      </div>
    </div>
  );
}
