import React from 'react';

export const EntrieSkeleton: React.FC = () => {
  return (
    <div className="w-[45%] mx-auto flex items-center justify-center flex-col gap-4">
      <h1 className="h-8 w-[50%] bg-light-300 dark:bg-dark-200 rounded-full"></h1>
      <div className="w-full grid gap-1">
        <p className="w-full h-6 bg-light-300 dark:bg-dark-100 rounded-full animate-pulse duration-75"></p>
        <p className="w-full h-6 bg-light-300 dark:bg-dark-100 rounded-full animate-pulse duration-200"></p>
        <p className="w-full h-6 bg-light-300 dark:bg-dark-100 rounded-full animate-pulse duration-500"></p>
        <p className="w-full h-6 bg-light-300 dark:bg-dark-100 rounded-full animate-pulse duration-900"></p>
      </div>
      <div className="w-[100%] h-56 border-0 outline-0 bg-light-300 dark:bg-dark-100">
      </div>
      <div className="w-full grid gap-1">
        <p className="w-full h-6 bg-light-300 dark:bg-dark-100 rounded-full animate-pulse duration-75"></p>
        <p className="w-full h-6 bg-light-300 dark:bg-dark-100 rounded-full animate-pulse duration-200"></p>
        <p className="w-full h-6 bg-light-300 dark:bg-dark-100 rounded-full animate-pulse duration-500"></p>
        <p className="w-full h-6 bg-light-300 dark:bg-dark-100 rounded-full animate-pulse duration-900"></p>
        <p className="w-full h-6 bg-light-300 dark:bg-dark-100 rounded-full animate-pulse duration-75"></p>
        <p className="w-full h-6 bg-light-300 dark:bg-dark-100 rounded-full animate-pulse duration-200"></p>
        <p className="w-full h-6 bg-light-300 dark:bg-dark-100 rounded-full animate-pulse duration-500"></p>
        <p className="w-full h-6 bg-light-300 dark:bg-dark-100 rounded-full animate-pulse duration-900"></p>
      </div>
      <p></p>
    </div>
  );
};
