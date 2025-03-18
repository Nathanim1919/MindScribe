export const GreetingSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 ">
      <div className="flex flex-col justify-center m-0 w-96 gap-2">
        <h1 className="w-[80%] dark:bg-dark-100 bg-light-300 h-8 rounded-2xl animate-pulse duration-100"></h1>
        <p className="w-full dark:bg-dark-100 bg-light-300 h-4 rounded-2xl animate-pulse duration-300"></p>
      </div>
      <span className="text-[12px] w-32 h-6 dark:bg-dark-100 bg-light-300 animate-pulse duration-100 rounded-full"></span>
    </div>
  );
};
