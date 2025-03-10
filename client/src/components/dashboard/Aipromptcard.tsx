import { RiGeminiLine } from 'react-icons/ri';

export const Aipromptcard: React.FC = () => {
  function enterNewEntrie() {
    console.log('Start Entry button clicked');
  }

  function regenratePrompt() {
    console.log('Regenerate button clicked');
  }

  return (
    <div className="bg-light-950 dark:bg-dark-50 border border-gray-300 dark:border-dark-100 shadow-lg p-3 rounded-xl grid grid-cols-1 gap-6">
      <div className="grid gap-4">
        <h2 className="font-bold text-3xl text-violet-500 flex items-center gap-3">
          <RiGeminiLine className="w-12 h-12 grid place-items-center rounded-full bg-white/10 dark:bg-dark-200 p-2  text-purple-600 shadow-lg" />
          Daily Writing Prompt
        </h2>
        <p className="text-lg text-gray-300 dark:text-gray-600">
          Write about a challenge you overcame and how it shaped you.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={enterNewEntrie}
          className="cursor-pointer bg-light-800 dark:bg-dark-200 text-gray-300 dark:text-gray-200 font-semibold px-6 py-2 rounded-full hover:bg-dark-300 transition-all"
        >
          Start Entry
        </button>
        <button
          onClick={regenratePrompt}
          className="cursor-pointer border border-violet-500/45 bg-transparent text-violet-500 dark:bg-dark-50 font-semibold px-6 py-2 rounded-full flex items-center gap-2 hover:bg-violet-500/15 transition-all"
        >
          <RiGeminiLine className="w-6 h-6 text-violet-500 dark:text-gray-400" />
          Regenerate
        </button>
      </div>
    </div>
  );
};
