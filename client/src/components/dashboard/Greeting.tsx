import { CiCalendarDate } from 'react-icons/ci';

export const Greeting: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col justify-center m-0">
        <h1 className="m-0 text-heading-main dark:text-dark-950">
          Good Morning, <span className="m-0 text-purple-500">Nathanim</span>
        </h1>
        <p className="m-0 text-md dark:text-dark-400 text-gray-500">
          Reflect, grow, and express yourself. What’s on your mind today?
        </p>
      </div>
      <span className="text-[12px] flex items-center gap-1  font-medium bg-gray-200 dark:bg-dark-100 dark:text-dark-500 border border-gray-300 dark:border-dark-200 py-1 px-2 rounded-full">
        <CiCalendarDate className='text-[18px]'/>Monday, 12 January 2025
      </span>
    </div>
  );
};
