export const AiSummerySkeleton: React.FC = () => {
    return (
      <div className="p-6 grid gap-6 mt-2 ">
        <div className="flex flex-col gap-2">
        <h2 className="w-[60%] h-6 dark:bg-dark-300 bg-light-300 rounded-full animate-pulse"></h2>
          <p className="h-4 w-[100%] bg-light-300 dark:bg-dark-200 rounded-full animate-pulse">
          </p>
          <p className="h-4 w-[100%] bg-light-300 dark:bg-dark-200 rounded-full animate-pulse">
          </p>
          <p className="h-4 w-[100%] bg-light-300 dark:bg-dark-200 rounded-full animate-pulse">
          </p>
          <p className="h-4 w-[60%] bg-light-300 dark:bg-dark-200 rounded-full animate-pulse">
          </p>
          <button className="dark:bg-dark-200 bg-light-300 w-24 h-6 animate-pulse self-end rounded-full">
          
          </button>
        </div>
  
        <div className="flex flex-col gap-2">
          <h2 className="w-[60%] h-6 dark:bg-dark-300 bg-light-300 rounded-full animate-pulse"></h2>
          <p className="h-4 w-[100%] bg-light-300 dark:bg-dark-200 rounded-full animate-pulse">
          </p>
          <p className="h-4 w-[100%] bg-light-300 dark:bg-dark-200 rounded-full animate-pulse">
          </p>
          <p className="h-4 w-[60%] bg-light-300 dark:bg-dark-200 rounded-full animate-pulse">
          </p>
          <button className="dark:bg-dark-200 bg-light-300 w-24 h-6 animate-pulse self-end rounded-full">
          
          </button>
        </div>
      </div>
    );
  };
  