import { BsEmojiSmileFill } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { CiCalendarDate } from 'react-icons/ci';
import { IoIosHeartEmpty } from 'react-icons/io';

export const Entriecard: React.FC = () => {
  return (
    <div className="entrie_card">
      <div className="flex px-4 py-2 items-center justify-between">
        <span className="bg-gray-200 rounded-3xl p-[2px] border border-gray-300 px-3 flex items-center gap-1">
          <BsEmojiSmileFill />
          Excited
        </span>
        <span>
          <IoIosHeartEmpty className="icon" />
        </span>
      </div>
      <div className="px-4">
        <h3 className="text-1xl font-bold">The Day I Got the Job Offer!</h3>
        <p className="text-[14px] text-gray-600 w-full">
          Today was one of the best days of my life. After weeks of waiting, I
          finally received the job offer I’ve been dreaming of! The interview
          process was tough, but all the hard work paid off.
        </p>
      </div>
      <div className="flex px-4 bg-gray-100 py-2 justify-between items-center border-t border-gray-200">
        <span className="w-full text-[14px] text-gray-500 flex items-center gap-1">
          <CiCalendarDate />
          12-Jan-2025
        </span>
        <div className="w-full flex justify-end gap-4 rounded-full py-[5px] px-2">
          <button className="rounded-full  border-gray-300">
            <CiEdit className="icon" />
          </button>
          <button className="rounded-full border-gray-300">
            <MdDeleteOutline className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};
