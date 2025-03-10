import { Aipromptcard } from './Aipromptcard';
import { Greeting } from './Greeting';
import { RecentEntries } from './RecentEntries';
import { Userstats } from './Userstats';

export const DashboardPage: React.FC = () => {
  return (
    <div className="grid grid-cols-[.7fr_.3fr]">
      <div>
        <Greeting />
        <RecentEntries />
      </div>
      <div className="h-full p-2">
        <Aipromptcard />
        <Userstats />
      </div>
    </div>
  );
};
