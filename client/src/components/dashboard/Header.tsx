export const Header: React.FC = () => {
  return (
    <div className="border-b border-light-100 dark:border-dark-50  flex justify-between items-center px-4 py-2 bg-white dark:bg-black shadow-sm">
      <div>
        <h2 className="font-bold text-2xl text-gray-800 dark:text-dark-950">
          mind<span className="text-blue-600">Scribe</span>
        </h2>
      </div>
      <button className="cursor-pointer w-10 h-10 p-1 bg-gray-200 dark:bg-dark-100 border hover:border-dark-300 rounded-full flex items-center justify-center">
        <span className="text-md font-semibold dark:bg-dark-50 w-full h-full grid place-items-center rounded-full text-gray-700 dark:text-dark-500">
          N
        </span>
      </button>
    </div>
  );
};
