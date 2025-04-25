interface MoodSummaryProps {
    dominantMood: {
      emoji: string;
      label: string;
      count: number;
      total: number;
    };
  }
  
  export const MoodSummary = ({ dominantMood }: MoodSummaryProps) => {
  
    return (
      <div className="bg-white overflow-hidden relative w-full dark:bg-dark-50 rounded-xl p-4 dark:shadow-sm border border-light-300 dark:border-dark-100">
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Your Recent <span className="font-bold text-violet-500">Vibes</span></h3>
        
        <div className="flex items-center gap-2">
          <span className="text-2xl w-10 h-10 dark:bg-dark-100 rounded-full border-3 border-light-200 dark:border-dark-200 grid place-items-center">{dominantMood.emoji}</span>
          <div>
            <p className="capitalize text-gray-900 dark:text-white font-medium">
              {dominantMood.label} 
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              <span className="text-violet-500 font-bold">{dominantMood.count}</span> of last <span className="text-violet-500 font-bold">{dominantMood.total}</span> entries
            </p>
          </div>
          <div className="absolute text-[6rem] opacity-25 transform right-0 top-0 text-gray-500 dark:text-gray-400">
          {dominantMood.emoji} 
          </div>
        </div>
      </div>
    );
  };