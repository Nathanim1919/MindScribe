import { BiPlus } from 'react-icons/bi';
import { Entriecard } from './Entriecard';
import { FaBook } from 'react-icons/fa6';

export const RecentEntries: React.FC = () => {
  const diaries = [
    {
      id: 1,
      title: 'A Fresh Start',
      content:
        'Woke up feeling motivated today! Started a new morning routine and I already feel the difference.',
      date: '2025-03-07',
      mood: 'positive',
    },
    {
      id: 2,
      title: 'Rainy Days',
      content:
        'The rain has been pouring all day. It’s cozy, but I also feel a bit melancholic.',
      date: '2025-03-06',
      mood: 'neutral',
    },
    {
      id: 3,
      title: 'Unexpected Challenges',
      content:
        "Things didn't go as planned at work today. Had to remind myself that setbacks are just part of the journey.",
      date: '2025-03-05',
      mood: 'negative',
    },
    {
      id: 4,
      title: 'Coffee & Creativity',
      content:
        'Tried a new coffee shop today and got lost in my thoughts. Ended up brainstorming some amazing ideas!',
      date: '2025-03-04',
      mood: 'positive',
    },
    {
      id: 5,
      title: 'Silent Reflection',
      content:
        'Some days, silence is the best company. Just sitting and thinking about life, no distractions.',
      date: '2025-03-03',
      mood: 'neutral',
    },
    {
      id: 6,
      title: 'Anxiety & Overthinking',
      content:
        'Overthinking again… I wish my brain had an off switch sometimes.',
      date: '2025-03-02',
      mood: 'negative',
    },
    {
      id: 7,
      title: 'Sunset Magic',
      content:
        "Watched the sunset today, and it was breathtaking. A reminder that nature's beauty is unmatched.",
      date: '2025-03-01',
      mood: 'positive',
    },
    {
      id: 8,
      title: 'A Difficult Conversation',
      content:
        'Had a tough talk with a friend today. It was uncomfortable but necessary.',
      date: '2025-02-29',
      mood: 'negative',
    },
    {
      id: 9,
      title: 'The Little Wins',
      content:
        'Managed to complete my to-do list today! It feels great to be productive.',
      date: '2025-02-28',
      mood: 'positive',
    },
    {
      id: 10,
      title: 'Dreams & Reality',
      content: 'Had a dream that felt so real… Woke up wishing it was.',
      date: '2025-02-27',
      mood: 'neutral',
    },
    {
      id: 11,
      title: 'Lazy But Happy',
      content: 'Did nothing productive today and I have no regrets.',
      date: '2025-02-26',
      mood: 'positive',
    },
    {
      id: 12,
      title: 'Social Burnout',
      content:
        'Too many social interactions today. I need some alone time to recharge.',
      date: '2025-02-25',
      mood: 'negative',
    },
    {
      id: 13,
      title: 'Music Therapy',
      content:
        'Put on my favorite playlist and suddenly, everything felt a little better.',
      date: '2025-02-24',
      mood: 'positive',
    },
    {
      id: 14,
      title: 'Random Nostalgia',
      content:
        'A song came on, and suddenly I was back in 2015. Funny how memories work.',
      date: '2025-02-23',
      mood: 'neutral',
    },
    {
      id: 15,
      title: 'Imposter Syndrome',
      content:
        'That nagging feeling that I’m not good enough hit hard today. Trying to push through.',
      date: '2025-02-22',
      mood: 'negative',
    },
    {
      id: 16,
      title: 'A Small Act of Kindness',
      content:
        'Helped a stranger today, and their smile made my whole day better.',
      date: '2025-02-21',
      mood: 'positive',
    },
    {
      id: 17,
      title: 'Overwhelmed But Grateful',
      content:
        'Life is busy and exhausting, but I’m grateful for everything I have.',
      date: '2025-02-20',
      mood: 'neutral',
    },
    {
      id: 18,
      title: 'Tired But Determined',
      content:
        'Exhausted, but I know I need to keep going. One step at a time.',
      date: '2025-02-19',
      mood: 'negative',
    },
    {
      id: 19,
      title: 'Spontaneous Adventures',
      content: 'Took an unplanned trip today. Best decision ever.',
      date: '2025-02-18',
      mood: 'positive',
    },
    {
      id: 20,
      title: 'Lessons from Failure',
      content:
        'Messed up something big today. But at least I learned something valuable from it.',
      date: '2025-02-17',
      mood: 'negative',
    },
  ];

  return (
    <div>
      <div className="flex px-8 justify-between items-center">
        <h2 className="flex items-center gap-1">
          <FaBook />
          Entiries
        </h2>
        <button className="new_entry_button">
          <BiPlus />
          New Entry
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 rounded-sm p-4 max-h-[75vh] overflow-y-auto">
        {diaries.map((entry) => (
          <Entriecard key={entry.id} entries={entry} />
        ))}
      </div>
    </div>
  );
};
