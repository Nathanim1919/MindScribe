import { motion } from 'motion/react';
import { FaFireFlameCurved } from 'react-icons/fa6';
import { FaBook } from 'react-icons/fa6';

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
}

const tooltipVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export const StreakTracker = ({
  currentStreak,
  longestStreak,
}: StreakTrackerProps) => {
  return (
    <div className="bg-white dark:bg-dark-50 rounded-xl p-4 dark:shadow-sm border border-light-300 dark:border-dark-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaFireFlameCurved className="w-6 h-6 rounded-full bg-light-100 dark:bg-dark-100  p-[3px] border border-light-200 dark:border-dark-200 text-orange-500 text-xl" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Your Writing{' '}
            <span className="font-bold text-violet-500">Streak</span>
          </h3>
        </div>
        {longestStreak > currentStreak && (
          <p className="text-sm text-violet-500">
            Longest streak:{' '}
            <span className="text-[1.1rem] font-bold">{longestStreak}</span>{' '}
            days
          </p>
        )}
      </div>

      <div className="rounded-lg mt-4 flex flex-col gap-4 items-start">
        <div className="flex justify-between items-center gap-2">
          <div className="flex justify-between items-center gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-full relative">
                {/* Icon Circle */}
                <motion.div
                  
                  className="w-7 h-7 peer relative cursor-pointer hover:dark:text-dark-900 hover:transform hover:scale-90 transition-all duration-300 hover:text-light-900 rounded-lg grid place-items-center border border-light-300 dark:border-dark-200 text-light-500 dark:text-dark-400">
                  <FaBook />
                </motion.div>

                {/* Tooltip (after peer) */}
                <motion.span
                  variants={tooltipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="absolute z-10 hidden peer-hover:flex -top-6 left-1/2 -translate-x-1/2 px-2 py-[2px] min-w-[90px] border dark:border-dark-200 justify-center rounded bg-dark-50 text-white text-[11px] shadow-sm"
                >
                  12, Jan 2025
                </motion.span>
              </div>
            ))}
          </div>
          <div className="flex items-center cursor-pointer hover:opacity-50">
            <div className="w-7 h-7 rounded-lg bg-light-300 dark:bg-dark-100 border-3 dark:border-dark-50 border-light-50"></div>
            <div className="w-7 absolute ml-2 h-7 rounded-lg bg-light-300 dark:bg-dark-100 border-3 dark:border-dark-50 border-light-50"></div>
            <div className="w-7 absolute h-7 ml-4 rounded-lg bg-light-300 dark:bg-dark-100 border-3 dark:border-dark-50 border-light-50"></div>
          </div>
        </div>
        <div className="flex items-end gap-2 justify-self-start px-6 border border-violet-600/30 bg-violet-600/10 rounded-lg">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {currentStreak}
          </span>
          <span className="text-gray-600 dark:text-gray-300 mb-1">
            days in a row
          </span>
        </div>
      </div>
    </div>
  );
};
