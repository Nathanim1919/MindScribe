export const DiaryRowSekeleton: React.FC = () => {
  return (
      <div className="w-full h-12 px-6 relative flex gap-3 items-center rounded-sm bg-light-200 dark:bg-dark-50 animate-pulse duration-100">
        <div className="h-[40%]  w-24 rounded-full bg-light-100 dark:bg-dark-100 relative"></div>
        <div className="h-[40%]  w-24 rounded-full bg-light-100 dark:bg-dark-100 relative"></div>
        <div className="h-[40%]  w-24 rounded-full bg-light-100 dark:bg-dark-100 relative"></div>
        <div className="h-[40%]  w-24 rounded-full bg-light-100 dark:bg-dark-100 relative"></div>
        <div className="h-[40%]  w-24 rounded-full bg-light-100 dark:bg-dark-100 relative"></div>
        <div className="h-[40%]  w-24 rounded-full bg-light-100 dark:bg-dark-100 relative"></div>
        <div className="h-[40%]  w-24 rounded-full bg-light-100 dark:bg-dark-100 relative"></div>
        <div className="flex items-center gap-1 flex-1 justify-end">
          <div className="h-6  w-6 rounded-full bg-light-100 dark:bg-dark-100 relative"></div>
          <div className="h-6  w-6 rounded-full bg-light-100 dark:bg-dark-100 relative"></div>
          <div className="h-6  w-6 rounded-full bg-light-100 dark:bg-dark-100 relative"></div>
          <div className="h-6  w-6 rounded-full bg-light-100 dark:bg-dark-100 relative"></div>
        </div>
      </div>
  );
};
