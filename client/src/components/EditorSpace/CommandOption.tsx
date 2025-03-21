import { IoMdCopy, IoMdCut, IoMdTrash } from 'react-icons/io';
import { IoMdUndo, IoMdRedo } from 'react-icons/io';
import { IoDuplicateOutline } from 'react-icons/io5';
import { handlePaste } from '../utils/selectionUtils';

interface CommandOptionPropType {
  handleCopy: () => void;
  handlePaste: () => void;
  handleCut: () => void;
  handleDelete: () => void;
  handleUndo: () => void;
  handleRedo: () => void;
  handleDuplicate: () => void;
}

export const CommandOption: React.FC<CommandOptionPropType> = ({
  handleCopy,
  handlePaste,
  handleCut,
  handleDelete,
  handleUndo,
  handleRedo,
  handleDuplicate,
}) => {
  return (
    <div className="bg-light-base dark:bg-dark-100 border w-[150px] border-light-200 dark:border-dark-200 absolute shadow-lg shadow-dark-800 dark:shadow-dark-50 rounded-lg grid place-items-center">
      <h2 className="font-bold text-[15px] p-2 border-b w-full border-light-200 dark:border-dark-200 text-light-700 dark:text-dark-700">
        Basic Options
      </h2>
      <div className="grid w-full gap-1">
        {[
          { action: handleCopy, icon: IoMdCopy, label: 'Copy' },
          { action: handlePaste, icon: IoMdCopy, label: 'Paste' },
          { action: handleCut, icon: IoMdCut, label: 'Cut' },
          { action: handleDelete, icon: IoMdTrash, label: 'Delete' },
          {
            action: handleDuplicate,
            icon: IoDuplicateOutline,
            label: 'Duplicate',
          },
          { action: handleUndo, icon: IoMdUndo, label: 'Undo' },
          { action: handleRedo, icon: IoMdRedo, label: 'Redo' },
        ].map(({ action, icon: Icon, label }) => (
          <div
            key={label}
            onClick={action}
            className="flex text-[14px] px-2 py-1 items-center gap-2 text-light-600 dark:text-dark-500 w-full hover:bg-light-200 hover:text-light-900 hover:dark:text-dark-800 hover:dark:bg-dark-200 cursor-pointer"
          >
            <Icon className="text-[20px]" />
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
