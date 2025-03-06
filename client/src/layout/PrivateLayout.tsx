import { Outlet } from '@tanstack/react-router';
import { Header } from '../components/dashboard/Header';
import { Sidebar } from '../components/Sidebar';

export function AuthenticatedLayout() {
  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <Header />
      <div className="flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-[#f2f3f5]">
          <Outlet /> {/* Renders the matched route */}
        </main>
      </div>
    </div>
  );
}
