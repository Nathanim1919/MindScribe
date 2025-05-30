import { useContext } from 'react';
import { PublicPage } from '../pages/PublicPage';
import { CiLight } from 'react-icons/ci';
import ThemeContext from '../contexts/ThemeContext';
import { WhyMindScribeExists } from '../pages/Mission';
import { FeatureShowcase, MindCore, NeuroFeatureGrid } from '../pages/Features';
import { RealVoices } from '../pages/TestimoniaPage';
import { EmotionalJourney } from '../pages/EmotionalJourney';
import { Plans } from '../pages/PlanSimplicity';
import { FinalCTA } from '../pages/FinalCTA';
import { MdNightlight } from 'react-icons/md';
import { FooterPage } from '../pages/FooterPage';

export function PublicLayout() {
  const { setTheme, theme } = useContext(ThemeContext);

    const isDarkMode = theme === 'dark'; // Check if the current theme is dark mode
    const icon = isDarkMode ? <MdNightlight className="text-gray-800 dark:text-white" /> : <CiLight className="text-gray-800 dark:text-white" />; // Use the appropriate icon based on the theme

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); // Correctly toggle the theme
  };

  return (
    <div
      className="h-screen flex flex-col overflow-x-hidden dark:bg-dark-base text-dark-950
      before:absolute before:top-[10%] before:right-[20%] before:rounded-full before:w-[30%] before:h-[30%] before:bg-violet-600 before:z-100
    "
    >
      <header className="flex  items-center fixed z-1000 w-full justify-between p-4">
        <div>
          <h2 className="text-3xl font-bold text-light-950 dark:text-dark-950">
            Feelink.
          </h2>
        </div>
        <nav className="flex items-center gap-2">
          <button className="px-6 py-2 rounded-full font-bold cursor-pointer hover:bg-violet-500 bg-violet-600">
            Start Now
          </button>
          <button
            onClick={toggleTheme}
            className="w-8 h-8 text-2xl cursor-pointer rounded-full grid place-items-center dark:bg-dark-200 bg-light-200 dark:text-dark-500 text-light-800"
          >
          {icon}
          </button>
        </nav>
      </header>
      <main className="flex-1">
        <PublicPage />
        <MindCore/>
        <WhyMindScribeExists />
        <RealVoices />
        <EmotionalJourney/>
        <FinalCTA/>
        <Plans/>
        <FooterPage/>
      </main>
    </div>
  );
}
