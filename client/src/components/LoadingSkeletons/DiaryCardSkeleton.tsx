export const EntriecardSkeleton: React.FC = () => {
  return (
    <div className="entrie_card h-52 border-0 dark:bg-dark-50 ">
      <div className="flex px-4 py-2  items-center justify-between animate-pulse duration-1000">
        <span className="h-6 w-24 bg-light-300 dark:bg-dark-100 rounded-full"></span>
        <button aria-label="Like" className="w-6 h-6 rounded-full bg-light-300 dark:bg-dark-100">
        </button>
      </div>
      <div className="px-4 grid gap-1">
        <h3 className="animate-pulse h-6 bg-light-300 dark:bg-dark-100 w-[80%] rounded-2xl font-bold dark:text-dark-700 mb-2"></h3>
        <p className="animate-pulse duration-700 w-full h-4 text-light-600 dark:text-dark-500 bg-light-300 dark:bg-dark-100 rounded-2xl"></p>
        <p className="animate-pulse duration-700 w-full h-4 text-light-600 dark:text-dark-500 bg-light-300 dark:bg-dark-100 rounded-2xl"></p>
        {/* <p className="animate-pulse duration-700 w-full h-4 text-light-600 dark:text-dark-500 bg-light-400 dark:bg-dark-100 rounded-2xl"></p> */}
        <p className="animate-pulse duration-700 w-[50%] h-4 text-light-600 dark:text-dark-500 bg-light-300 dark:bg-dark-100 rounded-2xl"></p>
      </div>
      <div className="flex px-4 justify-between items-center border-t border-gray-200 dark:border-dark-100 p-2">
        <span className="relative text-[13px] w-24 rounded-full h-6 animate-pulse duration-200 bg-light-400 dark:bg-dark-100 text-light-600 flex items-center gap-1">
        </span>
        <div className="flex items-center gap-2 animate-pulse">
          <button  aria-label="Edit" className=" w-6 h-6 rounded-full bg-light-300 dark:bg-dark-100 border-dark-50">
          </button>
          <button  aria-label="Delete" className=" w-6 h-6 rounded-full bg-light-300 dark:bg-dark-100 border-dark-50">
          </button>
        </div>
      </div>
    </div>
  );
};
