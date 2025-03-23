import { IoMdCopy, IoMdCut, IoMdTrash } from 'react-icons/io';
import { IoDuplicateOutline } from 'react-icons/io5';
import { handlePaste } from '../utils/selectionUtils';
import { useEffect, useRef, useState } from 'react';

interface CommandOptionPropType {
  position: number | null;
  handleCopy: () => void;
  handlePaste: () => void;
  handleCut: () => void;
  handleDelete: () => void;
  handleUndo: () => void;
  handleRedo: () => void;
  handleDuplicate: () => void;
}

export const CommandOption: React.FC<CommandOptionPropType> = ({
  position,
  handleCopy,
  handlePaste,
  handleCut,
  handleDelete,
  handleDuplicate,
}) => {
  const [menuPosition, setmenuPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });

  const commandMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commandMenuRef.current) return;

    // Located the selected block using its data attribute
    const blockElement = document.querySelector(
      `[data-block-index="${position}"]`,
    ) as HTMLDivElement;

    if (!blockElement) return;

    // Get the block's position relative to the viewport
    const blockRect = blockElement.getBoundingClientRect();

    // Adjust menu positioning relative t the document, considering scrolling
    setmenuPosition({
      top: blockRect.bottom + window.scrollY,
      left: blockRect.left + window.scrollX,
    });
  }, [position]);

  return (
    <div
      style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
      className="bg-light-base dark:bg-dark-100/50 border w-[150px] border-light-200 border-b-0 overflow-hidden dark:border-dark-200/50 absolute shadow-lg shadow-dark-800 dark:shadow-dark-50 rounded-lg grid place-items-center"
    >
      <h2 className="font-bold text-[14px] p-2 border-b w-full border-light-200 dark:border-dark-200/50 text-light-700 dark:text-dark-700">
        Basic Options
      </h2>
      <div className="grid w-full">
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
        ].map(({ action, icon: Icon, label }) => (
          <div
            key={label}
            onClick={action}
            className="flex text-[13px] px-2 py-[7px] border-b border-light-100 dark:border-dark-100 items-center gap-2 text-light-600 dark:text-dark-500 w-full hover:bg-light-100 hover:text-light-900 hover:dark:text-dark-800 hover:dark:bg-dark-100 cursor-pointer"
          >
            <Icon className="text-[20px]" />
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
