import { BiPlus } from 'react-icons/bi';
import { Entriecard } from './Entriecard';
import { FaBook } from "react-icons/fa6";


export const RecentEntries: React.FC = () => {
  return (
    <div>
      <div className="flex px-8 justify-between items-center">
        <h2 className='flex items-center gap-1'><FaBook/>Entiries</h2>
        <button className="new_entry_button">
          <BiPlus />
          New Entry
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 rounded-sm p-4 max-h-[75vh] overflow-y-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
          (entry) => (
            <Entriecard key={entry} />
          ),
        )}
      </div>
    </div>
  );
};
