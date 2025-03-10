import { BiPlus } from "react-icons/bi";

export const EmptyCollectionBoard: React.FC = () => {
    return (
        <div className="w-[50%] m-auto h-[50vh] grid place-items-center rounded-lg p-4">
            <div className="flex flex-col gap-4 items-center">
                <div className="flex flex-col items-center">
                    <h1 className="text-heading-main dark:text-dark-500">
                        Welcome to <span className="bg-light-200 dark:bg-dark-100 px-3 rounded-[6px]">mind<span className="text-blue-600">Scribe</span></span>
                    </h1>
                    <p className="text-md text-center dark:text-dark-300 text-gray-500">
                       Your journey of self-discovery and creativity starts here. Create your first entry and unlock the power of reflection and growth.
                    </p>
                </div>
            <button className="new_entry_button bg-light-800 hover:bg-light-700 dark:bg-dark-100 hover:dark:bg-dark-100 dark:text-dark-700 rounded-lg p-2 flex items-center gap-1">
                <BiPlus className="dark:bg-dark-200" />
                Create Your First Entry
            </button>
            </div>
        </div>
    )
};