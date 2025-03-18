
export const ProfileSkeleton = () => {
  return (
    <div className="dark:text-light-100 w-[80%] mx-auto mt-2">
      <div className="grid">
        <div className="group cover w-full h-[150px] rounded-md bg-light-300 animate-pulse dark:bg-dark-50">
        </div>
        <div className="profile relative w-full -top-[5rem] py-4 flex justify-between">
          <div className="pro-details flex flex-col items-center">
            <div className="pro-pic group relative overflow-hidden w-[150px] h-[150px] border-10 border-light-100 bg-light-300 dark:border-dark-base rounded-full dark:bg-dark-50">
            </div>
            <div className="pro-info flex flex-col items-center gap-1">
              <h3 className="h-4 w-32 rounded-full animate-pulse bg-light-300 dark:bg-dark-200"></h3>
              <p className="h-3 w-48 rounded-full animate-pulse bg-light-300 dark:bg-dark-200"></p>
            </div>
          </div>
          <div className="bio gap-2 self-end  flex flex-col bg-light-50 dark:bg-dark-50 w-[70%] justify-self-end rounded-md p-2">
          <p className="h-3 w-full rounded-full animate-pulse bg-light-300 dark:bg-dark-200"></p>
          <p className="h-3 w-full rounded-full animate-pulse bg-light-300 dark:bg-dark-200"></p>
          <p className="h-3 w-[40%] rounded-full animate-pulse bg-light-300 dark:bg-dark-200"></p>
          </div>
        </div>
      </div>
    </div>
  );
};
