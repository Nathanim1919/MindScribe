export const EmptyCardSkeleton: React.FC<{ middle?: boolean }> = ({
  middle,
}) => {
  return (
    <div className="dark:bg-dark-50 shadow-2xl border border-light-400 dark:border-dark-300 bg-light-50 h-48 w-48 rounded-md overflow-hidden flex flex-col">
      <div className="w-full h-8 dark:bg-dark-100 bg-light-300 flex items-center justify-between px-2">
        <span className="h-4 w-18 rounded-full bg-dark-300"></span>
        <span className="h-4 w-4 rounded-full bg-dark-300"></span>
      </div>
      <main className="flex-1">
        {middle && (
          <div className="grid gap-2 py-4 px-2">
            <h2 className="w-[50%] bg-dark-300 h-4 rounded-full"></h2>
            <div className="grid gap-1">
              <p className="w-full bg-dark-300 h-3 rounded-full"></p>
              <p className="w-full bg-dark-300 h-3 rounded-full"></p>
              <p className="w-full bg-dark-300 h-3 rounded-full"></p>
              <p className="w-[60%] bg-dark-300 h-3 rounded-full"></p>
            </div>
          </div>
        )}
      </main>
      <div className="dark:bg-dark-100 bg-light-300 h-8"></div>
    </div>
  );
};
