import { useContext } from 'react';
import { CiLight } from 'react-icons/ci';
import ThemeContext from '../../contexts/ThemeContext';
import { MdNightlight } from "react-icons/md";
import { useRouterState } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';


export const Header: React.FC = () => {
 
  const { setTheme, theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark'; // Check if the current theme is dark mode
  const icon = isDarkMode ? <MdNightlight className="text-gray-800 dark:text-white" /> : <CiLight className="text-gray-800 dark:text-white" />; // Use the appropriate icon based on the theme
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
      className="border-b relative z-100 border-light-100 dark:border-dark-50 flex justify-between items-center px-4 py-2 bg-white dark:bg-dark-50 backdrop-blur-2xl"
    >
      <div>
        <h2 className="font-bold text-2xl text-gray-800 dark:text-dark-950">
          mind<span className="text-blue-600">Scribe</span>
        </h2>
      </div>
      <div className="flex items-center gap-2">
         <Link
          to={'/in'}
          className="bg-light-900 text-light-100 dark:text-dark-100 cursor-pointer dark:bg-dark-900 hover:dark:bg-dark-700 hover:bg-light-700 p-2 px-4 rounded-full font-bold"
        >
          Explore Premium
        </Link> 
        <button
          onClick={toggleTheme}
          className={`flex cursor-pointer group relative items-center w-10 h-10 p-1 justify-center bg-light-200 hover:bg-light-100 dark:bg-dark-100 rounded-full hover:dark:bg-dark-200 dark:text-white transition-colors`}
          aria-label={'Theme'}
        >
         {icon}
        </button>
       
      </div>
    </div>
  );
};
