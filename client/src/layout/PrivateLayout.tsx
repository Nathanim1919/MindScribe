import { Outlet } from '@tanstack/react-router';
import { Header } from '../components/dashboard/Header';
import { Sidebar } from '../components/Sidebar';

export function AuthenticatedLayout() {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>
        <Outlet /> {/* Renders the matched route */}
      </main>
    </div>
  );
}
