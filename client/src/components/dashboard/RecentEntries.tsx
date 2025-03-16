import { BiPlus } from 'react-icons/bi';
import { Entriecard } from './Entriecard';
import { FaBook } from 'react-icons/fa6';
import { EmptyCollectionBoard } from './EmptyCollection';
import { Link } from '@tanstack/react-router';

export const RecentEntries: React.FC = () => {
  const diaries: any[] = [
    {
      id: 1,
      title: 'The day i started to be mature',
      content:
      'This was the fucking day i was lived for a while, This was the fucking day i was lived for a while, This was the fucking day i was lived for a while, This was the fucking day i was lived for a while',

      date: 'jan 25, 2025',
      mood: 'Happy',
    },
    {
      id: 1,
      title: 'The day i started to be mature',
      content:
        'This was the fucking day i was lived for a while, This was the fucking day i was lived for a while',
      date: 'jan 25, 2025',
      mood: 'Happy',
    },
    {
      id: 1,
      title: 'The day i started to be mature',
      content:
        'This was the fucking day i was lived for a while, This was the fucking day i was lived for a while',
      date: 'jan 25, 2025',
      mood: 'Happy',
    },
    {
      id: 1,
      title: 'The day i started to be mature',
      content:
        'This was the fucking day i was lived for a while, This was the fucking day i was lived for a while',
      date: 'jan 25, 2025',
      mood: 'Happy',
    },
    {
      id: 1,
      title: 'The day i started to be mature',
      content:
        'This was the fucking day i was lived for a while, This was the fucking day i was lived for a while',
      date: 'jan 25, 2025',
      mood: 'Happy',
    },
    {
      id: 1,
      title: 'The day i started to be mature',
      content:
        'This was the fucking day i was lived for a while, This was the fucking day i was lived for a while',
      date: 'jan 25, 2025',
      mood: 'Happy',
    },
    {
      id: 1,
      title: 'The day i started to be mature',
      content:
        'This was the fucking day i was lived for a while, This was the fucking day i was lived for a while, This was the fucking day i was lived for a while, This was the fucking day i was lived for a while',
      date: 'jan 25, 2025',
      mood: 'Happy',
    },
    {
      id: 1,
      title: 'The day i started to be mature',
      content:
        'This was the fucking day i was lived for a while, This was the fucking day i was lived for a while',
      date: 'jan 25, 2025',
      mood: 'Happy',
    },
  ];
  return (
    <div>
      {diaries.length === 0 ? (
        <EmptyCollectionBoard />
      ) : (
        <div>
          <div className="flex p-4 py-2 justify-between items-center">
            <h2 className="flex items-center gap-1 dark:text-white">
              <FaBook />
              Entiries
            </h2>
            <Link to='/in/home/new' className="new_entry_button dark:bg-dark-100 hover:dark:bg-dark-100 dark:text-dark-700 rounded-lg p-2 flex items-center gap-1">
              <BiPlus className="dark:bg-dark-300" />
              New Entry
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-sm p-4 py-2 max-h-[80vh] overflow-y-auto scrollb">
            {diaries?.map((entry) => (
              <Entriecard key={entry.id} entries={entry} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
