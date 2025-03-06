import { Entriecard } from "./Entriecard";

export const RecentEntries: React.FC = () => {
    return (
        <div className="mt-4">
          <h2>Recent Entiries</h2>
          <div className="grid grid-cols-4 gap-2 bg-white/35 rounded-sm p-4 max-h-[70vh] overflow-y-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
              (entry) => (
                <Entriecard key={entry}/>
              )
            )}
          </div>
        </div>
    )
};