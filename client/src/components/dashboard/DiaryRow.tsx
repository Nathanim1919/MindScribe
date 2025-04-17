import { EntryType } from '../../types/entrie.interface';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { CiCalendarDate } from 'react-icons/ci';
import { IoIosHeartEmpty } from 'react-icons/io';
import { GoShareAndroid } from 'react-icons/go';
import { FaBook } from 'react-icons/fa6';
import { motion } from 'motion/react';
import { Link } from '@tanstack/react-router';

interface DiaryRowPropType {
  entrie: EntryType;
}

export const DiaryRow: React.FC<DiaryRowPropType> = ({ entrie }) => {
  return (
    <Link to={'/in/new'}>
    <motion.div
     initial={{opacity:0, x:10}}
     animate={{opacity:1, x:0}}
     transition={{duration:.5}}
     className="group grid grid-cols-6 w-full bg-light-50 dark:bg-transparent items-center justify-between border border-light-200 rounded-sm dark:border-dark-50 hover:dark:bg-dark-50 hover:bg-light-100 cursor-pointer p-1">
      <div className="flex items-center gap-4 col-span-2">
        <button aria-label="book-icon">
          <FaBook className="dark:text-dark-400 group-hover:dark:text-dark-950 text-[16px] cursor-pointer dark:hover:text-dark-300 text-light-400 group-hover:text-light-600" />
        </button>
        <h3 className="text-light-500 group-hover:text-light-950 group-hover:dark:text-dark-950">
          {entrie.title.slice(0, 30)} ...
        </h3>
      </div>
      <span className="dark:text-dark-700 rounded-3xl w-[100%] p-[1px] border-gray-300 dark:border-dark-200 px-1 pr-2 flex items-center gap-1">
        <BsEmojiSmileFill className="text-orange-400 dark:text-amber-300 text-2xl dark:bg-dark-100 bg-light-100 border dark:border-dark-200 border-light-200 rounded-full p-1" />
        {entrie.mood}
      </span>
      <span className="relative text-[13px] w-full text-light-600 flex items-center gap-1">
        <CiCalendarDate className="relative h-4 w-4 grid place-items-center" />
        {entrie.date}
      </span>
      <div className="flex items-center gap-4">
        <button
          aria-label="Edit"
          className="rounded-full dark:bg-dark-50 text-2xl p-1 border dark:border-dark-100 hover:dark:border-transparent hover:dark:bg-transparent border-light-200 bg-light-100"
        >
          <CiEdit className="dark:text-dark-400 text-[16px] cursor-pointer dark:hover:text-dark-300 text-light-600 hover:text-light-600" />
        </button>
        <button
          aria-label="Delete"
          className="rounded-full dark:bg-dark-50 text-2xl p-1 border dark:border-dark-100 hover:dark:border-transparent hover:dark:bg-transparent border-light-200 bg-light-100"
        >
          <MdDeleteOutline className="dark:text-dark-400 text-[16px] cursor-pointer dark:hover:text-dark-300 text-light-600 hover:text-light-600" />
        </button>
        <button
          aria-label="Delete"
          className="rounded-full dark:bg-dark-50 text-2xl p-1 border dark:border-dark-100 hover:dark:border-transparent hover:dark:bg-transparent border-light-200 bg-light-100"
        >
          <GoShareAndroid className="dark:text-dark-400 text-[16px] cursor-pointer dark:hover:text-dark-300 text-light-600 hover:text-light-600" />
        </button>
      </div>
      <button>
        <IoIosHeartEmpty className="dark:text-dark-400 text-[16px] cursor-pointer dark:hover:text-dark-300 text-light-50 hover:text-light-600" />
      </button>
    </motion.div>
    </Link>
  );
};
