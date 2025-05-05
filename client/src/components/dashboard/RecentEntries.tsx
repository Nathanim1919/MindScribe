import { BiPlus } from 'react-icons/bi';
import { FaBook } from 'react-icons/fa6';
import { Link } from '@tanstack/react-router';
import { DiaryRow } from './DiaryRow';
import { IoIosList, IoIosHeartEmpty } from 'react-icons/io';
import { MdGridView } from 'react-icons/md';
import ThemeContext from '../../contexts/ThemeContext';
import { useContext, useEffect } from 'react';
import { useEntryContext } from '../../contexts/EntryContext';
import { useEntries } from '../../hooks/queries/useEntries';
import { IoReload } from 'react-icons/io5';
import { useQueryClient } from '@tanstack/react-query';
import { EntriecardSkeleton } from '../LoadingSkeletons/DiaryCardSkeleton';
import { DiaryRowSekeleton } from '../LoadingSkeletons/DiaryRowSkeleton';
import { EmptyCollectionBoard } from './EmptyCollection';
import { Entriecard } from './Entriecard';

export const RecentEntries: React.FC = () => {
  const { setListStyle, listStyle } = useContext(ThemeContext);
  const { entries, setEntries } = useEntryContext();
  const { data, isLoading, error } = useEntries();
  const queryClient = useQueryClient();

  // Set entries from fetched data
  useEffect(() => {
    if (data) {
      setEntries(data);
    }
  }, [data, setEntries]);

  // Scroll to top when component mounts
  useEffect(() => {
    const container = document.querySelector('.scrollb');
    container?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleListStyle = () => {
    setListStyle(listStyle === 'grid' ? 'list' : 'grid');
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['entries'] });
  };

  if (isLoading) {
    return (
      <div className={`grid p-4 ${listStyle === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 gap-2' : 'grid-cols-1 gap-1'}`}>
        {[...Array(6)].map((_, i) =>
          listStyle === 'grid' ? (
            <EntriecardSkeleton key={i} />
          ) : (
            <DiaryRowSekeleton key={i} />
          )
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 dark:text-red-400">
        Failed to load entries. Please try again later.
      </div>
    );
  }

  if (!isLoading && entries.length === 0) {
    return <EmptyCollectionBoard />;
  }

  return (
    <div className="">
      <div className="flex p-4 py-1 justify-between items-center">
        <h2 className="flex items-center gap-1 dark:text-white">
          <FaBook />
          Entries
        </h2>
        <div className="flex items-center gap-1">
          <div className="dark:border-dark-200 flex items-center gap-1 rounded-md">
            <button className="text-light-500 text-[20px] cursor-pointer hover:text-light-700 dark:text-dark-400 dark:hover:text-dark-700 hover:bg-transparent border-0 bg-light-200 dark:bg-dark-100 px-1 py-1 rounded-md">
              <IoIosHeartEmpty />
            </button>
            <button
              onClick={toggleListStyle}
              className="text-light-500 text-[20px] cursor-pointer hover:text-light-700 dark:text-dark-400 dark:hover:text-dark-700 hover:bg-transparent border-0 bg-light-200 dark:bg-dark-100 px-1 py-1 rounded-md"
            >
              {listStyle !== 'grid' ? <MdGridView /> : <IoIosList />}
            </button>
            <button
              onClick={handleRefresh}
              className="text-light-500 text-[20px] cursor-pointer hover:text-light-700 dark:text-dark-400 dark:hover:text-dark-700 hover:bg-transparent border-0 bg-light-200 dark:bg-dark-100 px-1 py-1 rounded-md"
              title="Refresh"
            >
              <IoReload />
            </button>
          </div>
          <Link
            to="/in/new"
            className="hover:bg-transparent border-0 bg-light-200 dark:bg-dark-100 text-light-950 dark:text-dark-700 rounded-lg px-1 py-1 flex items-center gap-1"
          >
            <BiPlus className="text-[20px]" />
          </Link>
        </div>
      </div>

      <div
        className={`grid ${listStyle === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 gap-2' : 'grid-cols-1 gap-1'} rounded-sm p-4 pb-24 md:py-2 max-h-[85vh] overflow-y-auto scrollb`}
      >
         {entries?.map((entry) =>
          listStyle === 'grid' ? (
            <Entriecard key={entry.id} entry={entry} />
          ) : (
            <DiaryRow key={entry.id} entry={entry} />
          )
        )}
      </div>
    </div>
  );
};
