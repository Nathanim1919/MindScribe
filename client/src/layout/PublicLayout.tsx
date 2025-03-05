import { Outlet } from '@tanstack/react-router';

export function PublicLayout() {
  return (
    <div>
      <header>Public Header</header>
      <main>
        <Outlet /> {/* Renders the matched route */}
      </main>
      <footer>Public Footer</footer>
    </div>
  );
}
