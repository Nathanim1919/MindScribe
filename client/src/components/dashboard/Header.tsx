export const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm">
      <div>
        <h2 className="font-bold text-2xl text-gray-800">
          mind<span className="text-blue-600">Scribe</span>
        </h2>
      </div>
      <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-all cursor-pointer">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700">N</span>
        </div>
        <div className="flex flex-col text-sm">
          <h2 className="font-medium text-gray-800">Nathan</h2>
          <p className="text-xs text-gray-500">nathanim@gmail.com</p>
        </div>
      </div>
    </div>
  );
};