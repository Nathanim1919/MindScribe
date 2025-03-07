export const Userstats: React.FC = () => {
  return (
    <div className="py-6 grid gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl">AI Summary</h2>
        <p className="text-sm text-gray-600">
          Your recent entries indicate increased motivation and optimism. You
          often mention ‘excited,’ ‘progress,’ and ‘opportunity.’ However, on
          tougher days, words like ‘overwhelmed’ and ‘tired’ appear more
          frequently.
        </p>
        <button className="border border-gray-300 py-1 px-2 rounded-md cursor-pointer text-sm text-gray-500 self-end">
          Read more
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl">AI Suggestion</h2>
        <p className="text-sm text-gray-600">
          Try reflecting on your daily wins to maintain your positive momentum!
        </p>
        <button className="border border-gray-300 py-1 px-2 rounded-md cursor-pointer text-sm text-gray-500 self-end">
          Read more
        </button>
      </div>
    </div>
  );
};
