import { BsEmojiSmileFill } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { CiCalendarDate } from 'react-icons/ci';
import { IoIosHeartEmpty } from 'react-icons/io';
import { motion } from 'motion/react';
import { Link } from '@tanstack/react-router';
import { Entry } from '../../types/entrie.interface';

type EntriecardPropType = {
  entry: Entry;
};

export const Entriecard: React.FC<EntriecardPropType> = ({ entry }) => {
  const { title, description, mood, content } = entry;

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
    <Link 
      to="/in/entries/$entryId" 
      params={{ entryId: entry.id }}
    >
    <motion.div
      initial={{opacity:0, translateY:"10px"}}
      animate={{opacity:1, translateY:"0px"}}
      transition={{duration:.3}}
      className="relative w-full h-full
    "
    >
      <div className="entrie_card h-full hover:border-light-400 hover:dark:border-dark-300 dark:border-dark-100 dark:bg-dark-50/90 backdrop-blur-3xl">
        <div className="flex px-4 py-2 border-b border-light-200/50 dark:border-dark-100 items-center justify-between">
          <span className="bg-gray-100 dark:bg-dark-100 dark:text-dark-700 rounded-3xl p-[1px] border border-gray-200 dark:border-dark-200 px-1 pr-2 flex items-center gap-1">
            <BsEmojiSmileFill className="text-orange-400 dark:text-amber-300" />
            {mood}
          </span>
          <button onClick={likeEntry} aria-label="Like">
            <IoIosHeartEmpty className="icon bg-transparent hover:dark:text-dark-700 text-light-500 hover:text-light-800" />
          </button>
        </div>
        <motion.div
         initial={{opacity:0, translateY:"1px"}}
         animate={{opacity:1, translateY:"0px"}}
         transition={{duration:.8}}
         className="px-4 grid gap-1">
          <h3 className="text-1xl font-bold dark:text-dark-700">{title}</h3>
          <p className="text-[14px] text-light-600 dark:text-dark-500 w-full">
            {description}
          </p>
        </motion.div>
        <div className="flex px-4 bg-gray-100 dark:bg-dark-100 py-2 justify-between items-center border-t border-gray-200 dark:border-dark-100">
          <span className="relative text-[13px] w-full text-light-600 flex items-center gap-1">
            <CiCalendarDate className="relative h-4 w-4 grid place-items-center" />
            12, March 2025
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
    </motion.div>
    </Link>
  );
};
