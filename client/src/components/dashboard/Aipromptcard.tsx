import { RiGeminiLine } from 'react-icons/ri';

export const Aipromptcard: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-sm grid grid-cols-1 gap-4">
      <div className='grid gap-4'>
        <h2 className='font-bold text-3xl flex items-center gap-2'><RiGeminiLine className='w-10 h-10 grid place-items-center rounded-full bg-gray-300 p-1'/>Daily Writing Prompt</h2>
        <p>Write about a challenge you overcame.</p>
      </div>
      <div className='flex items-center gap-2'>
        <button className='border border-gray-400 px-2 py-1 rounded-2xl'>Start Entry</button>
        <button className='border flex items-center gap-1 border-gray-400 px-2 py-1 rounded-2xl'><RiGeminiLine className='w-6 h-6 grid place-items-center rounded-full bg-gray-300 p-1'/>Regenerate</button>
      </div>
    </div>
  );
};
