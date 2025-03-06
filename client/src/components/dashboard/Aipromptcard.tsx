import { RiGeminiLine } from 'react-icons/ri';

export const Aipromptcard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 border border-gray-200 shadow-lg p-8 rounded-lg grid grid-cols-1 gap-6">
      <div className="grid gap-4">
        <h2 className="font-bold text-3xl text-white flex items-center gap-3">
          <RiGeminiLine className="w-12 h-12 grid place-items-center rounded-full bg-white/10 p-2 text-white" />
          Daily Writing Prompt
        </h2>
        <p className="text-lg text-gray-100">
          Write about a challenge you overcame and how it shaped you.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-50 transition-all">
          Start Entry
        </button>
        <button className="bg-transparent border border-white text-white font-semibold px-6 py-2 rounded-full flex items-center gap-2 hover:bg-white/10 transition-all">
          <RiGeminiLine className="w-6 h-6" />
          Regenerate
        </button>
      </div>
    </div>
  );
};