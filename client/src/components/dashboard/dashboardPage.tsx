import { Aipromptcard } from './Aipromptcard';
import { Greeting } from './Greeting';
import { RecentEntries } from './RecentEntries';
import { Userstats } from './Userstats';

export const DashboardPage: React.FC = () => {
  return (
    <div className="grid grid-cols-[.7fr_.3fr] gap-4">
      <div>
        <Greeting />
        <RecentEntries />
      </div>
      <div className="h-full p-4">
        <Aipromptcard />
        <Userstats />
      </div>
    </div>
  );
};
