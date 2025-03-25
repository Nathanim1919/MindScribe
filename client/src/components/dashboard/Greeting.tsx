import { CiCalendarDate } from 'react-icons/ci';
import { getCurrentDate } from '../utils/dateUtils';

export const Greeting: React.FC = () => {
  return (
    <div className="relative
    before:w-[70px] before:h-[10px] before:rounded-full before:top-12 before:left-[70%] before:bg-light-50 before:absolute
    ">
      <div className='flex items-center justify-between p-4 dark:bg-dark-base/30 backdrop-blur-[20px] relative z-10'>

      <div className="flex flex-col justify-center m-0">
        <h1 className="m-0 text-heading-main dark:text-dark-950">
          Good Morning, <span className="m-0 text-purple-500">Nathanim</span>
        </h1>
        <p className="m-0 text-md dark:text-dark-400 text-gray-500">
          Reflect, grow, and express yourself. What’s on your mind today?
        </p>
      </div>
      <span className="text-[12px] flex items-center gap-1  font-medium bg-gray-200 dark:bg-dark-100 dark:text-dark-500 border border-gray-300 dark:border-dark-200 py-1 px-2 rounded-full">
        <CiCalendarDate className="text-[18px]" />
        {getCurrentDate()}
      </span>
      </div>
    </div>
  );
};
