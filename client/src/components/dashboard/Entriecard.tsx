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
    <div className="entrie_card">
      <div className="flex px-4 py-2 items-center justify-between">
        <span className="bg-gray-200 rounded-3xl p-[2px] border border-gray-300 px-3 flex items-center gap-1">
          <BsEmojiSmileFill />
          {mood}
        </span>
        <button onClick={likeEntry} aria-label="Like">
          <IoIosHeartEmpty className="icon" />
        </button>
      </div>
      <div className="px-4">
        <h3 className="text-1xl font-bold">{title}</h3>
        <p className="text-[14px] text-gray-600 w-full">{content}</p>
      </div>
      <div className="flex px-4 bg-gray-100 py-2 justify-between items-center border-t border-gray-200">
        <span className="w-full text-[14px] text-gray-500 flex items-center gap-1">
          <CiCalendarDate />
          {date}
        </span>
        <button onClick={editEntry} aria-label="Edit" className="rounded-full border-gray-300">
          <CiEdit className="icon" />
        </button>
        <button onClick={deleteEntry} aria-label="Delete" className="rounded-full border-gray-300">
          <MdDeleteOutline className="icon" />
        </button>
      </div>
    </div>
  );
};