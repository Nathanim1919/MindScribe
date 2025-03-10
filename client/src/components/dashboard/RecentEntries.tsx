import { BiPlus } from 'react-icons/bi';
import { Entriecard } from './Entriecard';
import { FaBook } from 'react-icons/fa6';
import { EmptyCollectionBoard } from './EmptyCollection';

export const RecentEntries: React.FC = () => {
  const diaries: any[] = [];
  return (
    <div>
      {diaries.length === 0 ? (
        <EmptyCollectionBoard />
      ) : (
        <div>
          <div className="flex px-4 justify-between items-center">
            <h2 className="flex items-center gap-1 dark:text-white">
              <FaBook />
              Entiries
            </h2>
            <button className="new_entry_button dark:bg-dark-200 hover:dark:bg-dark-100 dark:text-dark-700 rounded-lg p-2 flex items-center gap-1">
              <BiPlus className="dark:bg-dark-300" />
              New Entry
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-sm p-4 max-h-[80vh] overflow-y-auto scrollb">
            {diaries?.map((entry) => (
              <Entriecard key={entry.id} entries={entry} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
