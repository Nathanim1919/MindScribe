import { useContext } from 'react';
import { CiLight } from 'react-icons/ci';
import ThemeContext from '../../contexts/ThemeContext';
import { Link } from '@tanstack/react-router';
import { useRouterState } from '@tanstack/react-router';


interface HeaderProps {
  setDisplayUserMenu: (value: boolean) => void;
  displayUserMenu: boolean;

}

export const Header: React.FC<HeaderProps> = ({
  setDisplayUserMenu,
  displayUserMenu
}) => {
 
  const { setTheme, theme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); // Correctly toggle the theme
  };

  const currentMatch = useRouterState({ select: (s:any) => s.matches.at(-1) });

  const {hideHeader} = currentMatch.staticData || {};

  if (hideHeader === true) {
    return null;
  }

  return (
   
    <div
      role="banner"
      className="border-b relative z-100 border-light-100 dark:border-dark-50 flex justify-between items-center px-4 py-2 bg-white dark:bg-gradient-to-b from-dark-50 to-dark-base backdrop-blur-2xl"
    >
      <div>
        <h2 className="font-bold text-2xl text-gray-800 dark:text-dark-950">
          mind<span className="text-blue-600">Scribe</span>
        </h2>
      </div>
      <div className="flex items-center gap-2">
        {/* <Link
          to={'/in'}
          className="bg-light-900 text-light-100 dark:text-dark-100 cursor-pointer dark:bg-dark-900 hover:dark:bg-dark-700 hover:bg-light-700 p-2 px-4 rounded-full font-bold"
        >
          Explore Premium
        </Link> */}
        <button
          onClick={toggleTheme}
          className={`flex cursor-pointer group relative items-center w-10 h-10 p-1 justify-center bg-light-200 hover:bg-light-100 dark:bg-dark-100 rounded-full hover:dark:bg-dark-200 dark:text-white transition-colors`}
          aria-label={'Theme'}
        >
          <CiLight />
        </button>
        <button
          onClick={() => setDisplayUserMenu(!displayUserMenu)}
          className="cursor-pointer w-10 h-10 p-1 bg-gray-200 dark:bg-dark-100 border border-light-300 dark:border-dark-200 hover:border-light-400 hover:dark:border-dark-300 rounded-full flex items-center justify-center"
        >
          <span className="text-md font-semibold dark:bg-dark-50 w-full h-full grid place-items-center rounded-full text-gray-700 dark:text-dark-500">
            N
          </span>
        </button>
      </div>
    </div>
  );
};
