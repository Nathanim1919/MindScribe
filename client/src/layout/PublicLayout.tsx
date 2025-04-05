import { PublicPage } from '../pages/PublicPage';

export function PublicLayout() {
  return (
    <div className='h-screen flex flex-col overflow-hidden bg-dark-base text-dark-950'>
      <header
      className='flex backdrop-blur-3xl items-center relative justify-between px-4 py-2 z-2300'
      >
        <div>
          <h2 className='text-3xl font-bold'>mind<span className='text-violet-500'>Scrab</span></h2>
        </div>
        <nav>
          <button className='px-3 py-1 rounded-full font-bold cursor-pointer hover:bg-violet-500 bg-violet-600'>Start Now</button>
        </nav>
      </header>
      <main className='flex-1 overflow-hidden'>
        <PublicPage /> 
      </main>
      {/* <footer>Public Footer</footer> */}
    </div>
  );
}
