import { Outlet } from '@tanstack/react-router';
import { Editor } from '../components/EditorSpace/Editor';

export function PublicLayout() {
  return (
    <div>
      <header>Public Header</header>
      <main>
        {/* <Outlet />  */}
        <Editor/>
      </main>
      <footer>Public Footer</footer>
    </div>
  );
}
