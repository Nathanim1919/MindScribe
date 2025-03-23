import { Outlet } from '@tanstack/react-router';
import { Editor } from '../components/EditorSpace/Editor';
import { PublicPage } from '../pages/PublicPage';

export function PublicLayout() {
  return (
    <div className='h-screen flex flex-col overflow-hidden'>
      <header
      className='flex items-center justify-between px-4 py-2'
      >
        <div>
          <h2>mindScrab</h2>
        </div>
        <nav>
          <button>Start Now</button>
        </nav>
      </header>
      <main className='flex-1'>
        <PublicPage /> 
      </main>
      <footer>Public Footer</footer>
    </div>
  );
}
