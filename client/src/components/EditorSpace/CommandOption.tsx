import { IoMdCopy, IoMdCut, IoMdTrash } from "react-icons/io";
import { IoMdUndo, IoMdRedo } from "react-icons/io";
import { IoDuplicateOutline } from "react-icons/io5";

interface CommandOptionPropType {
  handleCopy: () => void;
  handleCut: () => void;
  handleDelete: () => void;
  handleUndo: () => void;
  handleRedo: () => void;
  handleDuplicate: () => void;
}

export const CommandOption: React.FC<CommandOptionPropType> = ({
  handleCopy,
  handleCut,
  handleDelete,
  handleUndo,
  handleRedo,
  handleDuplicate,
}) => {

  return (
    <div className="bg-dark-100 border w-[150px] border-dark-200 absolute shadow-sm rounded-lg grid place-items-center">
      <h2 className="font-bold text-[18px] p-2 border-b dark:border-dark-300 dark:text-dark-700">
        Basic Options
      </h2>
      <div className="grid w-full gap-1">
        {[
          { action: handleCopy, icon: IoMdCopy, label: "Copy" },
          { action: handleCut, icon: IoMdCut, label: "Cut" },
          { action: handleDelete, icon: IoMdTrash, label: "Delete" },
          { action: handleDuplicate, icon: IoDuplicateOutline, label: "Duplicate" },
          { action: handleUndo, icon: IoMdUndo, label: "Undo" },
          { action: handleRedo, icon: IoMdRedo, label: "Redo" },
        ].map(({ action, icon: Icon, label }) => (
          <div
            key={label}
            onClick={action}
            className="flex px-2 py-1 items-center gap-2 dark:text-dark-500 w-full hover:dark:text-dark-800 hover:dark:bg-dark-200 cursor-pointer rounded-sm"
          >
            <Icon className="text-[20px]" />
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
