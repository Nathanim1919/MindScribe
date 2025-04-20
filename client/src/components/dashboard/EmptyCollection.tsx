import { Link } from '@tanstack/react-router';
import { BiPlus } from 'react-icons/bi';
import { EmptyCardSkeleton } from '../LoadingSkeletons/EmptyCardSkeleten';
import { motion } from 'motion/react';

export const EmptyCollectionBoard: React.FC = () => {
  return (
    <div
      className="w-[50%] m-auto h-[50vh] grid gap-24 place-items-center rounded-lg p-4
    before:absolute before:w-[50%] before:h-[50%] before:bg-gradient-to-b from-transparent to-violet-500 before:rounded-full relative
    "
    >
      <div className="flex w-full p-4 mt-10 opacity-45">
        <motion.div
         initial={{opacity:0, rotate:'0deg'}}
         animate={{opacity:1, rotate:'-30deg'}}
         transition={{duration:.4}}
         className="absolute left-20">
          <EmptyCardSkeleton />
        </motion.div>
        <motion.div
         initial={{opacity:0, translateY:'30px'}}
         animate={{opacity:1, translateY:'0px'}}
         transition={{duration:.2}}
         className="absolute  right-[30%] top-8 z-100">
          <EmptyCardSkeleton middle={true} />
        </motion.div>
        <motion.div
          initial={{opacity:0, rotate:'0deg'}}
          animate={{opacity:1, rotate:'30deg'}}
          transition={{duration:.4}}
         className="absolute right-20">
          <EmptyCardSkeleton />
        </motion.div>
      </div>
      <div className="flex bg-gradient-to-t dark:from-dark-base from-light-100 to-transparent flex-col gap-6 items-center relative z-1000">
        <motion.div 
         initial={{opacity:0, translateY:'30px'}}
         animate={{opacity:1, translateY:'0px'}}
         transition={{duration:.5}}
        className="flex flex-col items-center gap">
          <h1 className="text-heading-main dark:text-dark-500">
            Welcome to{' '}
            <span className="bg-light-200 dark:bg-dark-100 px-3 rounded-[6px]">
              mind<span className="text-blue-600">Scribe</span>
            </span>
          </h1>
          <p className="text-md text-center dark:text-dark-300 text-gray-500">
            Your journey of{' '}
            <span className="text-violet-700">self-discovery</span> and{' '}
            <span className="text-violet-700">creativity</span> starts here.
            Create your first entry and unlock the power of reflection and
            growth.
          </p>
        </motion.div>
        <Link
          to="/in/new"
          className="new_entry_button bg-light-800 hover:bg-light-700 dark:bg-dark-100 hover:dark:bg-dark-100 dark:text-dark-700 rounded-lg p-2 flex items-center gap-1"
        >
          <BiPlus className="dark:bg-dark-200" />
          Create Your First Entry
        </Link>
      </div>
    </div>
  );
};
