import { FaFireFlameCurved } from "react-icons/fa6";


interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
}

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

      <div className='p-4 rounded-lg mt-4'>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {currentStreak}
          </span>
          <span className="text-gray-600 dark:text-gray-300 mb-1">
            days in a row
          </span>
        </div>

        <div className="mt-4 flex gap-1">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i < currentStreak
                  ? 'bg-orange-500'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
