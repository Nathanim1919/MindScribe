import { BiPlus } from "react-icons/bi";
import { Entriecard } from "./Entriecard";

export const RecentEntries: React.FC = () => {
    return (
        <div className="mt-4 ">
            <div className="flex px-4 justify-between items-center">
                <h2>Entiries</h2>
                <button
                    className="flex items-center gap-1 px-2 py-1 border border-gray-600 rounded-sm"
                >
                    <BiPlus/>
                    New Entry
                </button>
            </div>
          <div className="grid grid-cols-3 gap-2 rounded-sm p-4 max-h-[75vh] overflow-y-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
              (entry) => (
                <Entriecard key={entry}/>
              )
            )}
          </div>
        </div>
    )
};