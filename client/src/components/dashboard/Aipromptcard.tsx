import { RiGeminiLine } from 'react-icons/ri';

export const Aipromptcard: React.FC = () => {
  function enterNewEntrie() {
    console.log('Start Entry button clicked');
  }

  function regenratePrompt() {
    console.log('Regenerate button clicked');
  }

  return (
    <div
      className="overflow-hidden relative before:w-[100%] before:rotate-[20deg] before:h-[20%] dark:before:h-[10%] before:absolute before:bg-light-950 dark:before:bg-white before:bottom-0
"
    >
      <div className="relative z-10 bg-light-base/60 overflow-hidden dark:bg-dark-base/60 backdrop-blur-3xl border-gray-300 dark:border-dark-50 shadow-lg p-6 rounded-xl grid grid-cols-1 gap-4">
        <div className="grid gap-4">
          <h2 className="font-bold text-3xl text-violet-500 flex items-center justify-center gap-3">
            <RiGeminiLine className="w-12 h-12 grid place-items-center rounded-full bg-light-200/55 dark:bg-dark-50 p-2  text-purple-600 dark:shadow-lg" />
            Daily Writing Prompt
          </h2>
          <p className="text-md  w-[70%] text-center mx-auto text-light-700 dark:text-gray-600">
            Write about a challenge you overcame and how it shaped you.
          </p>
        </div>
        <div className="flex items-center gap-4 justify-center">
          <button
            onClick={enterNewEntrie}
            className="cursor-pointer bg-light-800 dark:bg-dark-100 text-gray-300 dark:text-gray-200 font-semibold px-6 py-2 rounded-full hover:bg-dark-300 transition-all"
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
    </div>
  );
};
