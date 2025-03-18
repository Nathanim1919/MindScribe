export const AipromptcardSkeleton: React.FC = () => {
  return (
    <div className="h-48 bg-light-base dark:bg-dark-50 dark:border-dark-100 p-3 rounded-xl grid grid-cols-1 gap-6">
      <div className="">
        <h2 className="animate-pulse rounded-full font-bold h-6 w-[80%] bg-light-300 dark:bg-dark-200 mb-4 text-3xl text-violet-500 flex items-center gap-3"></h2>
        <div className="grid gap-2 relative z-0">
        <p className="h-4 w-full bg-light-300 dark:bg-dark-200 rounded-full animate-pulse"></p>
        <p className="h-4 w-full bg-light-300 dark:bg-dark-200 rounded-full animate-pulse">
        </p>
        <p className="h-4 w-[60%] bg-light-300 dark:bg-dark-200 rounded-full animate-pulse">
        </p>
        </div>
      </div>
      <div className="flex items-center gap-4 animate-pulse duration-200">
        <button className="cursor-pointer h-8 w-32 bg-light-200 dark:bg-dark-200 rounded-full"></button>
        <button className="cursor-pointer h-8 w-32 bg-light-300 dark:bg-dark-200 rounded-full"></button>
      </div>
    </div>
  );
};
