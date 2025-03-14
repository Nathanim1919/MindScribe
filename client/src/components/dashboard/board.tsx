import { Greeting } from './Greeting';
import { RecentEntries } from './RecentEntries';

export const Board: React.FC = () => {
  return (
    <div>
      <div>
        <Greeting />
        <RecentEntries />
      </div>
    </div>
  );
};
