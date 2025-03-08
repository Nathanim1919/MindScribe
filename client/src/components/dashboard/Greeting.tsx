export const Greeting: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div>
        <h1 className="text-heading-main dark:text-dark-950">
          Good Morning, <span className="text-purple-500">Nathan</span>
        </h1>
        <p className="text-md dark:text-dark-400 text-gray-500">
          Reflect, grow, and express yourself. What’s on your mind today?
        </p>
      </div>
      <span className="text-sm font-medium bg-gray-200 dark:bg-dark-100 dark:text-dark-500 border border-gray-300 dark:border-dark-200 p-2 rounded-full">
        Monday, 12 January 2025
      </span>
    </div>
  );
};
