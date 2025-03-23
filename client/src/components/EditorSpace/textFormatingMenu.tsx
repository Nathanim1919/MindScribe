import React from "react";

export const TextFormatingMenu:React.FC  = () => {
    return (
        <div className="text-white grid place-content-center">
            <ul className="flex bg-dark-100/50 gap-3 items-center p-1 border border-dark-100 rounded-sm">
                <li className="px-4 border-l-0 border-dark-200 text-dark-500 hover:text-dark-800 cursor-pointer hover:dark:bg-dark-100">Bold</li>
                <li className="px-4 border-l border-dark-200 text-dark-500 hover:text-dark-800 cursor-pointer hover:dark:bg-dark-100">Italic</li>
                <li className="px-4 border-l border-dark-200 text-dark-500 hover:text-dark-800 cursor-pointer hover:dark:bg-dark-100">quote</li>
            </ul>
        </div>
    )
}