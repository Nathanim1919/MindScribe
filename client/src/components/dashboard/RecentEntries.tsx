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

export const RecentEntries: React.FC = () => {
  // const diaries = []
  const diaries = [
    {
      id: 1,
      title: 'A New Beginning',
      content:
        'Today, I finally decided to take a leap of faith. I resigned from my job to start my own business. It’s scary, but I know this is what I want. Here’s to new beginnings!',
      date: 'March 10, 2025',
      mood: 'Excited',
    },
    {
      id: 2,
      title: 'A Rainy Afternoon',
      content:
        'It rained all day. I sat by the window with a cup of coffee, watching the raindrops race down the glass. It was peaceful. I needed this kind of stillness.',
      date: 'March 12, 2025',
      mood: 'Calm',
    },
    {
      id: 3,
      title: 'A Tough Day at Work',
      content:
        'Work was exhausting today. Deadlines are piling up, and I feel like I’m drowning. I need to find a better work-life balance. Maybe a short trip this weekend?',
      date: 'March 14, 2025',
      mood: 'Stressed',
    },
    {
      id: 4,
      title: 'A Small Victory',
      content:
        'I finally completed the project I had been struggling with for weeks. It feels amazing to see everything come together. Hard work does pay off!',
      date: 'March 16, 2025',
      mood: 'Proud',
    },
    {
      id: 5,
      title: 'A Walk Down Memory Lane',
      content:
        'I visited my childhood home today. It’s strange how everything feels smaller now. Nostalgia hit me hard, but it was a beautiful trip down memory lane.',
      date: 'March 18, 2025',
      mood: 'Nostalgic',
    },
    {
      id: 6,
      title: 'A Heartfelt Conversation',
      content:
        'Had a deep conversation with an old friend. We talked about life, struggles, and dreams. It reminded me how important genuine connections are.',
      date: 'March 20, 2025',
      mood: 'Grateful',
    },
    {
      id: 7,
      title: 'A Lazy Sunday',
      content:
        'Did absolutely nothing today, and it felt great. Sometimes, you just need a break to recharge.',
      date: 'March 23, 2025',
      mood: 'Relaxed',
    },
    {
      id: 8,
      title: 'A Lesson in Patience',
      content:
        'Life has been testing my patience lately. I’m learning that some things take time, and rushing won’t help. Trying to embrace the process.',
      date: 'March 25, 2025',
      mood: 'Reflective',
    },
    {
      id: 9,
      title: 'A Day of Unexpected Kindness',
      content:
        'A stranger helped me carry my groceries today. Such a small act, but it made my day. A reminder that kindness still exists in the world.',
      date: 'March 28, 2025',
      mood: 'Touched',
    },
    {
      id: 10,
      title: 'A Beautiful Sunset',
      content:
        'Watched the sunset from my balcony. The sky was painted with shades of orange and pink. It made me realize how beautiful life is when you pause to appreciate it.',
      date: 'March 30, 2025',
      mood: 'Peaceful',
    },
    {
      id: 11,
      title: 'The Day I Faced My Fear',
      content:
        'I finally did it—I spoke in front of an audience today. My hands were shaking, but once I started, it felt empowering. Growth happens outside of comfort zones.',
      date: 'April 2, 2025',
      mood: 'Brave',
    },
    {
      id: 12,
      title: 'The Power of Saying No',
      content:
        "I said 'no' to something I didn’t want to do today. It felt uncomfortable at first, but it also felt like self-respect. Setting boundaries is important.",
      date: 'April 4, 2025',
      mood: 'Empowered',
    },
    {
      id: 13,
      title: 'A New Hobby',
      content:
        'Started learning how to play the piano today. It’s challenging, but also incredibly rewarding. Excited to see where this journey takes me!',
      date: 'April 6, 2025',
      mood: 'Inspired',
    },
    {
      id: 14,
      title: 'A Day of Self-Care',
      content:
        'Took the day off to just focus on myself—long bath, favorite book, and a good movie. I need to do this more often.',
      date: 'April 9, 2025',
      mood: 'Refreshed',
    },
    {
      id: 15,
      title: 'The Day I Let Go',
      content:
        'I finally let go of something I had been holding onto for too long—grudges, regrets, and the past. It’s time to move forward.',
      date: 'April 12, 2025',
      mood: 'Liberated',
    },
    {
      id: 16,
      title: 'A Surprise Letter',
      content:
        'Got a handwritten letter from an old friend today. In a world of texts and emails, this felt truly special.',
      date: 'April 14, 2025',
      mood: 'Sentimental',
    },
    {
      id: 17,
      title: 'The Beauty of Silence',
      content:
        'Spent the whole evening without my phone, just sitting with my thoughts. It was uncomfortable at first, but then it became peaceful. I think I’ll do this more often.',
      date: 'April 17, 2025',
      mood: 'Contemplative',
    },
    {
      id: 18,
      title: 'Chasing Dreams',
      content:
        'I applied for a job I thought was out of my league. Even if I don’t get it, I’m proud of myself for trying. You miss 100% of the shots you don’t take.',
      date: 'April 20, 2025',
      mood: 'Hopeful',
    },
    {
      id: 19,
      title: 'A Moment of Gratitude',
      content:
        'Sometimes I forget how lucky I am to have a roof over my head, food on my plate, and people who love me. Today, I just want to be grateful for the little things.',
      date: 'April 23, 2025',
      mood: 'Thankful',
    },
    {
      id: 20,
      title: 'A Midnight Walk',
      content:
        'Couldn’t sleep, so I went for a walk under the stars. The cool air, the quiet streets—it was exactly what I needed.',
      date: 'April 26, 2025',
      mood: 'Tranquil',
    },
  ];
  const { setListStyle, listStyle } = useContext(ThemeContext);
  const toggleListStyle = () => {
    setListStyle(listStyle === 'grid' ? 'list' : 'grid');
  };
  return (
    <div>
      {diaries.length === 0 ? (
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
                <button className="text-light-500 text-[22px] cursor-pointer hover:text-light-700 dark:text-dark-400 dark:hover:text-dark-700 hover:bg-light-200 hover:dark:bg-dark-100 px-2 py-1 rounded-md">
                  <IoIosHeartEmpty />
                </button>
                <button
                  onClick={toggleListStyle}
                  className="text-light-500 text-[22px] cursor-pointer hover:text-light-700 dark:text-dark-400 dark:hover:text-dark-700 hover:bg-light-200 hover:dark:bg-dark-100 px-2 py-1 rounded-md"
                >
                  {listStyle !== 'grid' ? <MdGridView /> : <IoIosList />}
                </button>
              </div>
              <Link
                to="/in/new"
                className="bg-transparent border-0 hover:bg-light-200 hover:dark:bg-dark-100 text-light-950 dark:text-dark-700 rounded-lg px-2 py-1 flex items-center gap-1"
              >
                <BiPlus className='text-2xl'/>
                
              </Link>
            </div>
          </div>

          <div
            className={`grid ${listStyle === 'grid' ? 'grid-cols-3 gap-2' : 'grid-cols-1 gap-1'} rounded-sm p-4 py-2 max-h-[85vh] overflow-y-auto scrollb`}
          >
            {diaries?.map((entry) =>
              <EntriecardSkeleton key={entry.id}/>
              // <Entriecard key={entry.id} entries={entry} />
              // <DiaryRow  key={entry.id} entrie={entry}/>
              // <DiaryRowSekeleton key={entry.id} />

              // listStyle === 'grid' ? (
              //   <Entriecard key={entry.id} entries={entry} />
              // ) : (
              //   <DiaryRow key={entry.id} entrie={entry} />
              // ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};
