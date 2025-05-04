import { BiPlus } from 'react-icons/bi';
import { Entriecard } from './Entriecard';
import { FaBook } from 'react-icons/fa6';
import { EmptyCollectionBoard } from './EmptyCollection';
import { Link } from '@tanstack/react-router';
import { EntriecardSkeleton } from '../LoadingSkeletons/DiaryCardSkeleton';
import { DiaryRow } from './DiaryRow';
import { DiaryRowSekeleton } from '../LoadingSkeletons/DiaryRowSkeleton';
import { IoIosList } from 'react-icons/io';
import { MdGridView } from 'react-icons/md';
import ThemeContext from '../../contexts/ThemeContext';
import { useContext } from 'react';
import { entrieListStyle } from '../../contexts/ThemeContext';
import { IoIosHeartEmpty } from 'react-icons/io';
import { useEntryContext } from '../../contexts/EntryContext';

export const RecentEntries: React.FC = () => {
  // const diaries = []
  const {entries} = useEntryContext();
  const {setSelectEntry} = useEntryContext();


  
  const { setListStyle, listStyle } = useContext(ThemeContext);
  const toggleListStyle = () => {
    setListStyle(listStyle === 'grid' ? 'list' : 'grid');
  };
  return (
    <div className=''>
      {entries.length === 0 ? (
        <EmptyCollectionBoard />
      ) : (
        <div>
          <div className="flex p-4 py-1 justify-between items-center">
            <h2 className="flex items-center gap-1 dark:text-white">
              <FaBook />
              Entiries
            </h2>
            <div className="flex items-center gap-1">
              <div className='dark:border-dark-200 flex items-center gap-1 rounded-md'>
                <button className="text-light-500 text-[20px] cursor-pointer hover:text-light-700 dark:text-dark-400 dark:hover:text-dark-700 hover:bg-transparent border-0 bg-light-200 dark:bg-dark-100 px-1 py-1 rounded-md">
                  <IoIosHeartEmpty />
                </button>
                <button
                  onClick={toggleListStyle}
                  className="text-light-500 text-[20px] cursor-pointer hover:text-light-700 dark:text-dark-400 dark:hover:text-dark-700 hover:bg-transparent border-0 bg-light-200 dark:bg-dark-100 px-1 py-1 rounded-md"
                >
                  {listStyle !== 'grid' ? <MdGridView /> : <IoIosList />}
                </button>
              </div>
              <Link
                to="/in/new"
                className="hover:bg-transparent border-0 bg-light-200 dark:bg-dark-100 text-light-950 dark:text-dark-700 rounded-lg px-1 py-1 flex items-center gap-1"
              >
                <BiPlus className='text-[20px]'/>
                
              </Link>
            </div>
          </div>

          <div
            className={`grid ${listStyle === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 gap-2' : 'grid-cols-1 gap-1'} rounded-sm p-4 pb-24 md:py-2 max-h-[85vh] overflow-y-auto scrollb `}
          >
            {entries?.map((entry) =>
              // <EntriecardSkeleton key={entry.id}/>
              // <Entriecard key={entry.id} entries={entry} />
              // <DiaryRow  key={entry.id} entrie={entry}/>
              // <DiaryRowSekeleton key={entry.id} />

              listStyle === 'grid' ? (
                <Entriecard key={entry.id} entries={entry} setSelectEntry={setSelectEntry}/>
              ) : (
                <DiaryRow key={entry.id} entrie={entry} />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};
