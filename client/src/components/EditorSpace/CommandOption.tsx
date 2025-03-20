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
    <div>
      <h1> Basic Options</h1>
      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-center">
          <IoMdCopy className="text-2xl" />
          <p>Copy</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <IoMdCut className="text-2xl" />
          <p>Cut</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <IoMdTrash className="text-2xl" />
          <p>Delete</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <IoMdUndo className="text-2xl" />
          <p>Undo</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <IoMdRedo className="text-2xl" />
          <p>Redo</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <IoDuplicateOutline className="text-2xl" />
          <p>Duplicate</p>
        </div>
      </div>
    </div>
  );
};
