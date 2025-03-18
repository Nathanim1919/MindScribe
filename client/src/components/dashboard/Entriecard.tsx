import { BsEmojiSmileFill } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { CiCalendarDate } from 'react-icons/ci';
import { IoIosHeartEmpty } from 'react-icons/io';

type EntryType = {
  id: number;
  title: string;
  content: string;
  date: string;
  mood: string;
};

type EntriecardPropType = {
  entries: EntryType;
};

export const Entriecard: React.FC<EntriecardPropType> = ({ entries }) => {
  const { title, content, date, mood } = entries;

  function deleteEntry() {
    console.log('Delete button clicked');
  }

  function editEntry() {
    console.log('Edit button clicked');
  }

  function likeEntry() {
    console.log('Like button clicked');
  }

  return (
    <div className="entrie_card hover:dark:border-dark-300 dark:border-dark-100 dark:bg-dark-50">
      <div className="flex px-4 py-2 border-b border-light-200 dark:border-dark-100 items-center justify-between">
        <span className="bg-gray-200 dark:bg-dark-100 dark:text-dark-700 rounded-3xl p-[1px] border border-gray-300 dark:border-dark-200 px-1 pr-2 flex items-center gap-1">
          <BsEmojiSmileFill className='text-orange-400 dark:text-amber-300'/>
          {mood}
        </span>
        <button onClick={likeEntry} aria-label="Like">
          <IoIosHeartEmpty className="icon dark:bg-transparent hover:dark:bg-dark-100" />
        </button>
      </div>
      <div className="px-4 grid gap-1">
        <h3 className="text-1xl font-bold dark:text-dark-700">{title}</h3>
        <p className="text-[14px] text-light-600 dark:text-dark-500 w-full">
          {content}
        </p>
      </div>
      <div className="flex px-4 bg-gray-100 dark:bg-dark-100 py-2 justify-between items-center border-t border-gray-200 dark:border-dark-100">
        <span className="relative text-[13px] w-full text-light-600 flex items-center gap-1">
          <CiCalendarDate className='relative h-4 w-4 grid place-items-center'/>
          {date}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={editEntry}
            aria-label="Edit"
            className="rounded-full border-dark-50"
          >
            <CiEdit className="icon dark:bg-dark-100 hover:dark:bg-dark-200 dark:text-dark-400" />
          </button>
          <button
            onClick={deleteEntry}
            aria-label="Delete"
            className="rounded-full border-dark-50"
          >
            <MdDeleteOutline className="icon dark:bg-dark-100 hover:dark:bg-dark-200 dark:text-dark-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
