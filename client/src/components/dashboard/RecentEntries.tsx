import { BiPlus } from 'react-icons/bi';
import { Entriecard } from './Entriecard';
import { FaBook } from 'react-icons/fa6';
import { EmptyCollectionBoard } from './EmptyCollection';
import { Link } from '@tanstack/react-router';

export const RecentEntries: React.FC = () => {
  const diaries = [
    {
      id: 1,
      title: "A New Beginning",
      content:
        "Today, I finally decided to take a leap of faith. I resigned from my job to start my own business. It’s scary, but I know this is what I want. Here’s to new beginnings!",
      date: "March 10, 2025",
      mood: "Excited",
    },
    {
      id: 2,
      title: "A Rainy Afternoon",
      content:
        "It rained all day. I sat by the window with a cup of coffee, watching the raindrops race down the glass. It was peaceful. I needed this kind of stillness.",
      date: "March 12, 2025",
      mood: "Calm",
    },
    {
      id: 3,
      title: "A Tough Day at Work",
      content:
        "Work was exhausting today. Deadlines are piling up, and I feel like I’m drowning. I need to find a better work-life balance. Maybe a short trip this weekend?",
      date: "March 14, 2025",
      mood: "Stressed",
    },
    {
      id: 4,
      title: "A Small Victory",
      content:
        "I finally completed the project I had been struggling with for weeks. It feels amazing to see everything come together. Hard work does pay off!",
      date: "March 16, 2025",
      mood: "Proud",
    },
    {
      id: 5,
      title: "A Walk Down Memory Lane",
      content:
        "I visited my childhood home today. It’s strange how everything feels smaller now. Nostalgia hit me hard, but it was a beautiful trip down memory lane.",
      date: "March 18, 2025",
      mood: "Nostalgic",
    },
    {
      id: 6,
      title: "A Heartfelt Conversation",
      content:
        "Had a deep conversation with an old friend. We talked about life, struggles, and dreams. It reminded me how important genuine connections are.",
      date: "March 20, 2025",
      mood: "Grateful",
    },
    {
      id: 7,
      title: "A Lazy Sunday",
      content:
        "Did absolutely nothing today, and it felt great. Sometimes, you just need a break to recharge.",
      date: "March 23, 2025",
      mood: "Relaxed",
    },
    {
      id: 8,
      title: "A Lesson in Patience",
      content:
        "Life has been testing my patience lately. I’m learning that some things take time, and rushing won’t help. Trying to embrace the process.",
      date: "March 25, 2025",
      mood: "Reflective",
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
