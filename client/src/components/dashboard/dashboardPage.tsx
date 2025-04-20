import { Outlet } from '@tanstack/react-router';
import { Aipromptcard } from './Aipromptcard';
import { Userstats } from './Userstats';
import { AipromptcardSkeleton } from '../LoadingSkeletons/AiPromptCardSkeleton';
import { AiSummerySkeleton } from '../LoadingSkeletons/AiSummerySkeleton';
import { StreakTracker } from '../userStats/StreakTracker';
import { MoodSummary } from '../userStats/MoodSummary';
import { MilestoneCard } from '../userStats/MilestoneCard';

export const DashboardPage: React.FC = () => {
  const userData = {
    streak: {
      current: 7,
      longest: 12
    },
    mood: {
      dominant: {
        emoji: '🤩',
        label: 'excited',
        count: 3,
        total: 5
      },
      trend: 'up' as const
    },
    milestones: [
      {
        title: '50 Entries Club',
        progress: 84, // 42/50
        isCompleted: false
      },
      {
        title: '7-Day Streak',
        isCompleted: true,
        dateAchieved: 'May 15, 2023'
      }
    ]
  };

  return (
    <div className="grid grid-cols-[.7fr_.3fr]">
      <div>
        <Outlet/>
      </div>
      <div className="h-full p-2 flex flex-col gap-2">
        {/* <AipromptcardSkeleton/>
        <AiSummerySkeleton/> */}
        {/* <Aipromptcard />
        <Userstats /> */}
         {/* <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 max-w-6xl mx-auto"> */}
      <StreakTracker 
        currentStreak={userData.streak.current} 
        longestStreak={userData.streak.longest} 
      />
      
      <MoodSummary 
        dominantMood={userData.mood.dominant}
      />
      
      <div className="space-y-3 md:col-span-2 lg:col-span-1 mt-6">
        <h3 className="font-medium text-gray-900 dark:text-white">Your Journey</h3>
        {userData.milestones.map((milestone) => (
          <MilestoneCard key={milestone.title} {...milestone} />
        ))}
      {/* </div> */}
    </div>
      </div>
    </div>
  );
};
