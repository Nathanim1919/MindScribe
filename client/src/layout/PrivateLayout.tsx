import { Outlet } from '@tanstack/react-router';

export function AuthenticatedLayout() {
  return (
    <div>
      <header>Dashboard Header</header>
      <aside>Sidebar</aside>
      <main>
        <Outlet /> {/* Renders the matched route */}
      </main>
    </div>
  );
}