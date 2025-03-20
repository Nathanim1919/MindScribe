import { IoMdCopy } from 'react-icons/io';
import { IoMdCut } from 'react-icons/io';
import { IoMdTrash } from 'react-icons/io';
import { IoMdUndo } from 'react-icons/io';
import { IoMdRedo } from 'react-icons/io';
import { IoDuplicateOutline } from 'react-icons/io5';

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
    <div className='bg-dark-100 overflow-hidden border w-[150px] border-dark-200 absolute shadow-sm rounded-lg grid place-items-center'>
      <h2 className='font-bold text-[18px] p-2 border-b dark:border-dark-300 dark:text-dark-700'> Basic Options</h2>
      <div className="grid w-full gap-1">
        <div className="flex px-2 py-1 items-center gap-2 dark:text-dark-500 w-full hover:dark:text-dark-800 hover:dark:bg-dark-200 cursor-pointer rouneded-sm">
          <IoMdCopy className="text-[20px]" />
          <p>Copy</p>
        </div>
        <div className="flex px-2 py-1 items-center gap-2 dark:text-dark-500 w-full hover:dark:text-dark-800 hover:dark:bg-dark-200 cursor-pointer rouneded-sm">
          <IoMdCut className="text-[20px]" />
          <p>Cut</p>
        </div>
        <div className="flex px-2 py-1 items-center gap-2 dark:text-dark-500 w-full hover:dark:text-dark-800 hover:dark:bg-dark-200 cursor-pointer rouneded-sm">
          <IoMdTrash className="text-[20px]" />
          <p>Delete</p>
        </div>
        {/* <div className="flex px-2 py-1 items-center gap-2 dark:text-dark-500 w-full hover:dark:text-dark-800 hover:dark:bg-dark-200 cursor-pointer rouneded-sm">
          <IoMdUndo className="text-[20px]" />
          <p>Undo</p>
        </div>
        <div className="flex px-2 py-1 items-center gap-2 dark:text-dark-500 w-full hover:dark:text-dark-800 hover:dark:bg-dark-200 cursor-pointer rouneded-sm">
          <IoMdRedo className="text-[20px]" />
          <p>Redo</p>
        </div> */}
        <div className="flex px-2 py-1 items-center gap-2 dark:text-dark-500 w-full hover:dark:text-dark-800 hover:dark:bg-dark-200 cursor-pointer rouneded-sm">
          <IoDuplicateOutline className="text-[20px]" />
          <p>Duplicate</p>
        </div>
      </div>
    </div>
  );
};
