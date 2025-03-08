export const Userstats: React.FC = () => {
  return (
    <div className="py-6 grid gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl dark:text-dark-600">AI Summary</h2>
        <p className="text-md text-gray-600 dark:text-dark-400">
          Your recent entries indicate increased motivation and optimism. You
          often mention ‘excited,’ ‘progress,’ and ‘opportunity.’ However, on
          tougher days, words like ‘overwhelmed’ and ‘tired’ appear more
          frequently.
        </p>
        <button className="border border-gray-300 dark:border-dark-200 dark:bg-dark-100 py-1 px-2 rounded-md cursor-pointer text-sm text-gray-500 self-end">
          Read more
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl dark:text-dark-600">AI Suggestion</h2>
        <p className="text-md text-gray-600 dark:text-dark-400">
          Try reflecting on your daily wins to maintain your positive momentum!
        </p>
        <button className="border border-gray-300 dark:border-dark-200 dark:bg-dark-100 py-1 px-2 rounded-md cursor-pointer text-sm text-gray-500 self-end">
          Read more
        </button>
      </div>
    </div>
  );
};
