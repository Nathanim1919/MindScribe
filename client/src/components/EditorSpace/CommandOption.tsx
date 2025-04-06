import { IoMdCopy, IoMdCut, IoMdTrash, 
 } from 'react-icons/io';
import { MdContentPaste } from "react-icons/md";
import { IoDuplicateOutline } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import { useCommandOption } from '../../hooks/useCommandOpion';
import { BlockType } from '../../types/block.interface';
import { motion } from 'framer-motion';

interface CommandOptionPropType {
  position: number | null;
  blocks: BlockType[];
  setIsCommandOptionVisible: (value: boolean) => void;
}

export const CommandOption: React.FC<CommandOptionPropType> = ({
  position,
  blocks,
  setIsCommandOptionVisible
}) => {
  const [menuPosition, setmenuPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });

  const {
    handleCopy,
    handlePaste,
    handleCut,
    handleDelete,
    handleDuplicate,
  } = useCommandOption(position, blocks, setIsCommandOptionVisible);

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
      top: blockRect.top + window.scrollY - 90,
      left: blockRect.left + window.scrollX,
    });
  }, [position]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.05 }}
      transition={{ duration: 0.2 }}
      ref={commandMenuRef}
      style={{ top: `${menuPosition.top }px`, left: `${menuPosition.left + 40}` }}
      className={`
        
        bg-light-base/20 transition-all z-999 duration-100 ease-in-out dark:bg-dark-100/20 backdrop-blur-2xl border max-w-[150px] border-light-200 border-b-0 overflow-hidden dark:border-dark-200 fixed  shadow-lg shadow-dark-800 dark:shadow-dark-50 rounded-lg grid place-items-center`}
    >
      <h2 className="font-bold text-[14px] p-2 border-b w-full border-light-200 dark:border-dark-200/50 text-light-700 dark:text-dark-700">
        Basic Options
      </h2>
      <div className="grid w-full">
        {[
          { action: handleCopy, icon: IoMdCopy, label: 'Copy' },
          { action: handlePaste, icon: MdContentPaste, label: 'Paste' },
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
            className="flex text-[13px] px-2 py-[6px] border-b border-light-100 dark:border-dark-200/50 items-center gap-2 text-light-600 dark:text-dark-500 w-full hover:bg-light-100 hover:text-light-900 hover:dark:text-dark-800 hover:dark:bg-dark-100 cursor-pointer"
          >
            <Icon className="text-[20px]" />
            <p>{label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
