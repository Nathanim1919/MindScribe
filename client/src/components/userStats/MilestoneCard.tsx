interface MilestoneCardProps {
    title: string;
    progress?: number;
    isCompleted: boolean;
    dateAchieved?: string;
  }
  
  export const MilestoneCard = ({ 
    title, 
    progress, 
    isCompleted, 
    dateAchieved 
  }: MilestoneCardProps) => {
    return (
      <div className="bg-white dark:bg-dark-50 rounded-xl p-2 shadow-sm border border-gray-100 dark:border-dark-100">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            isCompleted 
              ? 'bg-green-100 dark:bg-green-900/30' 
              : 'bg-blue-100 dark:bg-blue-900/30'
          }`}>
            {isCompleted ? (
              <span className="text-green-600 dark:text-green-400">✓</span>
            ) : (
              <span className="text-blue-600 dark:text-blue-400">⌛</span>
            )}
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
            {isCompleted ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Achieved on {dateAchieved}
              </p>
            ) : progress ? (
              <div className="mt-1">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">
                  {Math.round(progress)}% complete
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  };