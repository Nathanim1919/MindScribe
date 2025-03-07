import { BiPlus } from 'react-icons/bi';
import { Entriecard } from './Entriecard';
import { FaBook } from 'react-icons/fa6';

export const RecentEntries: React.FC = () => {
  const diaries = [
    {
      id: 1,
      title: 'The Great Sock Mystery',
      content:
        'Lost a sock in the laundry today. Not a pair, just one. Where do they even go? Is there a secret sock dimension?',
      date: '2025-03-07',
      mood: 'neutral',
    },
    {
      id: 2,
      title: 'When Coffee Betrayed Me',
      content:
        'Spilled coffee on my white shirt this morning. Now I look like a modern art masterpiece. Abstract coffee stains are in, right?',
      date: '2025-03-06',
      mood: 'negative',
    },
    {
      id: 3,
      title: 'The Day I Became a Plant Parent',
      content:
        'Bought a plant today. Named it Steve. Steve is already judging me for forgetting to water him. Steve, I’m doing my best!',
      date: '2025-03-05',
      mood: 'positive',
    },
    {
      id: 4,
      title: 'Why Do I Always Forget My Password?',
      content:
        'Forgot my password again. Why does every website need a unique password? I’m not a secret agent!',
      date: '2025-03-04',
      mood: 'neutral',
    },
    {
      id: 5,
      title: 'The Battle of the Couch Cushions',
      content:
        'Spent 20 minutes rearranging the couch cushions. They still don’t look right. Is there a degree for this?',
      date: '2025-03-03',
      mood: 'negative',
    },
    {
      id: 6,
      title: 'The Time I Tried to Adult',
      content:
        'Tried to adult today. Paid bills, cleaned the kitchen, and even meal prepped. I’m exhausted. Being a grown-up is overrated.',
      date: '2025-03-02',
      mood: 'neutral',
    },
    {
      id: 7,
      title: 'The Curious Case of the Missing Remote',
      content:
        'Lost the TV remote. Searched everywhere. Found it in the fridge. No, I don’t have an explanation.',
      date: '2025-03-01',
      mood: 'neutral',
    },
    {
      id: 8,
      title: 'The Day I Realized I’m a Cat Person',
      content:
        'Realized today that my cat owns me, not the other way around. She just sits there, judging my life choices.',
      date: '2025-02-28',
      mood: 'positive',
    },
    {
      id: 9,
      title: 'The Great Toaster Incident',
      content:
        'Tried to make toast. The toaster burned it. I think it’s personal at this point.',
      date: '2025-02-27',
      mood: 'negative',
    },
    {
      id: 10,
      title: 'The Night I Became a Chef (Sort Of)',
      content:
        'Attempted to cook dinner. Ended up ordering pizza. At least I tried, right?',
      date: '2025-02-26',
      mood: 'neutral',
    },
    {
      id: 11,
      title: 'The Day I Argued with Google Maps',
      content:
        'Google Maps took me on a ‘shortcut’ today. Ended up in a field. Thanks, Google.',
      date: '2025-02-25',
      mood: 'negative',
    },
    {
      id: 12,
      title: 'The Time I Tried Yoga',
      content:
        'Tried yoga for the first time. Fell over. Twice. Namaste in bed instead.',
      date: '2025-02-24',
      mood: 'neutral',
    },
    {
      id: 13,
      title: 'The Mystery of the Disappearing Pens',
      content:
        'Why do pens disappear the moment I need them? Do they have a secret meeting place?',
      date: '2025-02-23',
      mood: 'neutral',
    },
    {
      id: 14,
      title: 'The Day I Discovered I’m Allergic to Productivity',
      content:
        'Tried to be productive today. Ended up scrolling through memes for three hours. Oops.',
      date: '2025-02-22',
      mood: 'negative',
    },
    {
      id: 15,
      title: 'The Great Laundry Escape',
      content:
        'Did laundry today. One sock escaped. It’s out there living its best life without me.',
      date: '2025-02-21',
      mood: 'neutral',
    },
    {
      id: 16,
      title: 'The Time I Tried to Fix My Wi-Fi',
      content:
        'Tried to fix my Wi-Fi. Unplugged it, plugged it back in. It worked. I’m basically a tech genius now.',
      date: '2025-02-20',
      mood: 'positive',
    },
    {
      id: 17,
      title: 'The Day I Realized I’m a Snack Hoarder',
      content:
        'Realized today that I have a snack drawer. It’s like a treasure chest, but for chips and chocolate.',
      date: '2025-02-19',
      mood: 'positive',
    },
    {
      id: 18,
      title: 'The Night I Became a Karaoke Star',
      content:
        'Tried karaoke last night. My neighbors are now questioning their life choices.',
      date: '2025-02-18',
      mood: 'neutral',
    },
    {
      id: 19,
      title: 'The Time I Tried to Be a Morning Person',
      content:
        'Attempted to be a morning person. Woke up at noon. Close enough.',
      date: '2025-02-17',
      mood: 'negative',
    },
    {
      id: 20,
      title: 'The Day I Realized I’m a Blanket Burrito',
      content:
        'Wrapped myself in a blanket like a burrito. It’s my new favorite hobby.',
      date: '2025-02-16',
      mood: 'positive',
    },
    {
      id: 21,
      title: 'The Great Nap Rebellion',
      content:
        'Took a nap today. Woke up feeling like a new person. Naps are the real heroes.',
      date: '2025-02-15',
      mood: 'positive',
    },
    {
      id: 22,
      title: 'The Time I Tried to Organize My Life',
      content:
        'Tried to organize my life. Made a to-do list. Lost the list. Life remains chaotic.',
      date: '2025-02-14',
      mood: 'neutral',
    },
    {
      id: 23,
      title: 'The Day I Realized I’m a Professional Procrastinator',
      content:
        'Realized today that I’m a professional procrastinator. I’ll start working on that tomorrow.',
      date: '2025-02-13',
      mood: 'neutral',
    },
    {
      id: 24,
      title: 'The Night I Became a Meme Connoisseur',
      content:
        'Spent the night scrolling through memes. Laughed so hard I cried. Memes are my therapy.',
      date: '2025-02-12',
      mood: 'positive',
    },
    {
      id: 25,
      title: 'The Time I Tried to Be Fancy',
      content:
        'Tried to be fancy today. Wore a suit. Spilled spaghetti on it. Fancy fail.',
      date: '2025-02-11',
      mood: 'neutral',
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
