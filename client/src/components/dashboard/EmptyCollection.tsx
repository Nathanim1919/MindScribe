import { BiPlus } from 'react-icons/bi';

export const EmptyCollectionBoard: React.FC = () => {
  return (
    <div className="w-[50%] m-auto h-[50vh] grid place-items-center rounded-lg p-4
    before:absolute before:w-[50%] before:h-[50%] before:bg-gradient-to-b from-transparent to-violet-500 before:rounded-full relative
    ">
      <div className="flex flex-col gap-6 items-center relative z-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-heading-main dark:text-dark-500">
            Welcome to{' '}
            <span className="bg-light-200 dark:bg-dark-100 px-3 rounded-[6px]">
              mind<span className="text-blue-600">Scribe</span>
            </span>
          </h1>
          <p className="text-md text-center dark:text-dark-300 text-gray-500">
            Your journey of <span className='text-violet-700'>self-discovery</span> and <span className='text-violet-700'>creativity</span> starts here. Create
            your first entry and unlock the power of reflection and growth.
          </p>
        </div>
        <button className="new_entry_button bg-light-800 hover:bg-light-700 dark:bg-dark-100 hover:dark:bg-dark-100 dark:text-dark-700 rounded-lg p-2 flex items-center gap-1">
          <BiPlus className="dark:bg-dark-200" />
          Create Your First Entry
        </button>
      </div>
    </div>
  );
};
