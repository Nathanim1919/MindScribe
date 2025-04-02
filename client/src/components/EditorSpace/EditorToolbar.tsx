import React from 'react';
import { HiOutlineCalendarDateRange } from 'react-icons/hi2';
import { getCurrentDate } from '../utils/dateUtils';
import { BiRedo, BiUndo } from 'react-icons/bi';

export const EditorToolbar = React.memo(() => {
  return (
    <div className="sticky top-0 flex items-center justify-between text-light-500 dark:text-dark-500">
      <div className="flex items-center gap-1 px-4">
        <BiUndo className="w-6 h-6 p-[2px] rounded-full dark:bg-dark-100 cursor-pointer hover:dark:bg-dark-200 bg-light-100 hover:bg-light-200 border dark:border-dark-200 border-light-200" />
        <BiRedo className="w-6 h-6 p-[2px] rounded-full dark:bg-dark-100 cursor-pointer hover:dark:bg-dark-200 bg-light-100 hover:bg-light-200 border dark:border-dark-200 border-light-200" />
      </div>
      <span className="flex items-center font-extralight gap-1 p-3 py-2 border border-light-200 dark:border-dark-100 border-t-0 border-r-0 rounded-bl-2xl bg-light-100 dark:bg-dark-base text-[13px]">
        <HiOutlineCalendarDateRange /> {getCurrentDate()}
      </span>
    </div>
  );
});

EditorToolbar.displayName = 'EditorToolbar';