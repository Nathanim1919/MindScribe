import { RiGeminiLine } from 'react-icons/ri';

export const Aipromptcard: React.FC = () => {
  function enterNewEntrie() {
    console.log('Start Entry button clicked');
  }

  function regenratePrompt() {
    console.log('Regenerate button clicked');
  }

  return (
    <div className="bg-black dark:bg-dark-50 border border-gray-300 dark:border-dark-100 shadow-lg p-5 rounded-xl grid grid-cols-1 gap-6">
      <div className="grid gap-4">
        <h2 className="font-bold text-3xl text-white dark:text-dark-600 flex items-center gap-3">
          <RiGeminiLine className="w-12 h-12 grid place-items-center rounded-full bg-white/10 dark:bg-dark-200 p-2 text-white dark:text-dark-700 shadow-lg" />
          Daily Writing Prompt
        </h2>
        <p className="text-lg text-gray-300 dark:text-gray-600">
          Write about a challenge you overcame and how it shaped you.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={enterNewEntrie}
          className="cursor-pointer bg-white dark:bg-dark-200 text-gray-800 dark:text-gray-200 font-semibold px-6 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          Start Entry
        </button>
        <button
          onClick={regenratePrompt}
          className="cursor-pointer bg-gray-200 dark:bg-dark-50 text-gray-800 dark:text-gray-200 font-semibold px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
        >
          <RiGeminiLine className="w-6 h-6 text-gray-700 dark:text-gray-400" />
          Regenerate
        </button>
      </div>
    </div>
  );
};
