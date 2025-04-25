import { CiCalendarDate } from 'react-icons/ci';
import { getCurrentDate } from '../utils/dateUtils';
import { useAuth } from '../../contexts/authContext';
import { motion } from 'framer-motion';


export const Greeting: React.FC = () => {
  const {user} = useAuth()
  return (
    <div className="relative
    before:w-[70px] before:h-[10px] before:rounded-full before:top-12 before:left-[70%] before:bg-light-50 before:absolute
    ">
      <div className='flex md:flex-row flex-col gap-1  items-center justify-between p-2 md:p-4 dark:bg-dark-base/30 backdrop-blur-[20px] relative z-10'>

      <div className="flex flex-col justify-center m-0">
        <h1 className="m-0  dark:text-dark-950 text-2xl md:text-4xl font-bold">
          Good Morning, <motion.span
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration:.4}}
           className="m-0 text-purple-500 capitalize">{user?.name}</motion.span>
        </h1>
        <p className="m-0 text-sm md:text-md dark:text-dark-400 text-gray-500">
          Reflect, grow, and express yourself. What’s on your mind today?
        </p>
      </div>
      <span className="text-[12px] self-end flex items-center gap-1  font-medium bg-gray-200 dark:bg-dark-100 dark:text-dark-500 border border-gray-300 dark:border-dark-200 py-1 px-2 rounded-full">
        <CiCalendarDate className="text-[18px]" />
        {getCurrentDate()}
      </span>
      </div>
    </div>
  );
};
