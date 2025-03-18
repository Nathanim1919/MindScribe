import { Outlet } from '@tanstack/react-router';
import { Aipromptcard } from './Aipromptcard';
import { Userstats } from './Userstats';
import { AipromptcardSkeleton } from '../LoadingSkeletons/AiPromptCardSkeleton';
import { AiSummerySkeleton } from '../LoadingSkeletons/AiSummerySkeleton';

export const DashboardPage: React.FC = () => {
  return (
    <div className="grid grid-cols-[.7fr_.3fr]">
      <div>
        <Outlet/>
      </div>
      <div className="h-full p-2">
        <AipromptcardSkeleton/>
        <AiSummerySkeleton/>
        {/* <Aipromptcard /> */}
        {/* <Userstats /> */}
      </div>
    </div>
  );
};
