import React from 'react';
import { HiOutlineCalendarDateRange } from 'react-icons/hi2';
import { getCurrentDate } from '../utils/dateUtils';
import { SentimentPicker } from '../modals/sentimentPickerModal';

export const EditorToolbar = React.memo(() => {
  return (
    <div className="sticky z-100 top-0 flex items-center justify-between text-light-500 dark:text-dark-500">
      <span className="flex items-center justify-self-start font-extralight gap-1 p-3 py-2 border border-light-200 dark:border-dark-100 border-t-0 border-l-0 rounded-br-2xl bg-light-100 dark:bg-dark-base text-[13px]">
        <HiOutlineCalendarDateRange /> {getCurrentDate()}
      </span> 
      <div>
      <SentimentPicker
      />
      </div>
    </div>
  );
});

EditorToolbar.displayName = 'EditorToolbar';