import { GreetingSkeleton } from '../LoadingSkeletons/GreetingSkeleton';
import { Greeting } from './Greeting';
import { RecentEntries } from './RecentEntries';

export const Board: React.FC = () => {
  return (
    <div>
      <div>
        <Greeting />
        {/* <GreetingSkeleton/> */}
        <RecentEntries />
      </div>
    </div>
  );
};
