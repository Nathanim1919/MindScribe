export const Greeting: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div>
        <h1 className="text-heading-main dark:text-white">Good Morning, Nathan</h1>
        <p className="text-md dark:text-gray-300 text-gray-500">
          Reflect, grow, and express yourself. What’s on your mind today?
        </p>
      </div>
      <span className="text-sm font-medium bg-gray-200 border border-gray-300 p-2 rounded-full">
        Monday, 12 January 2025
      </span>
    </div>
  );
};
