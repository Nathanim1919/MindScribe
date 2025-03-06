import { BsEmojiSmileFill } from 'react-icons/bs';
import { CiEdit, CiShare2 } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { CiCalendarDate } from "react-icons/ci";

export const Entriecard: React.FC = () => {
  return (
    <div className="border bg-white border-gray-300 p-4 grid gap-4 rounded-2xl cursor-pointer">
      <div className="flex items-center justify-between">
        <span className="bg-gray-200 rounded-3xl p-[2px] border border-gray-300 px-3">Excited</span>
        <span className="text-yellow-300 bg-gray-300 grid place-items-center rounded-full">
          <BsEmojiSmileFill className="bg-gray-800 rounded-full w-6 h-6 p-1" />
        </span>
      </div>
      <div>
        <h3 className="text-2xl font-bold">The Day I Got the Job Offer!</h3>
        <p className="text-[14px] text-gray-600 w-full">
          Today was one of the best days of my life. After weeks of waiting, I finally received the job offer I’ve been dreaming of! The interview process was tough, but all the hard work paid off. I couldn’t stop smiling when I read the email...
        </p>
      </div>
      <div className="flex justify-between items-center">
        <span className='text-[14px] text-gray-500 flex items-center gap-1'><CiCalendarDate/>12-Jan-2025</span>
        <div className="flex gap-1 bg-gray-200 border border-gray-300 rounded-full p-1 px-4">
          <button className="rounded-full">
            <CiEdit className="w-6 h-6 p-[4px]" />
          </button>
          <button className="rounded-full">
            <MdDeleteOutline className="w-6 h-6 p-[4px]" />
          </button>
          <button className="rounded-full">
            <CiShare2 className="w-6 h-6 p-[4px]" />
          </button>
        </div>
      </div>
    </div>
  );
};