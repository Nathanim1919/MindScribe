import { IoMdCopy, IoMdCut, IoMdTrash } from 'react-icons/io';
import { MdContentPaste } from 'react-icons/md';
import { IoDuplicateOutline } from 'react-icons/io5';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useCommandOption } from '../../hooks/useCommandOpion';
import { BlockType } from '../../types/block.interface';
import { motion } from 'framer-motion';
import { FaQuoteRight, FaHeading, FaListUl } from 'react-icons/fa'; // example icons

interface CommandOptionPropType {
  id: string | null;
  blocks: BlockType[];
  setIsCommandOptionVisible: (value: boolean) => void;
}

export const CommandOption: React.FC<CommandOptionPropType> = ({
  id,
  blocks,
  setIsCommandOptionVisible
}) => {
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [showSubmenu, setShowSubmenu] = useState(false);
  const commandMenuRef = useRef<HTMLDivElement>(null);

  // Destructuring handlers from the custom hook
  const {
    handleCopy,
    handlePaste,
    handleCut,
    handleDelete,
    handleDuplicate,
    handleBlockTypeChange
  } = useCommandOption(id, blocks, setIsCommandOptionVisible);

  // Calculate the position of the menu on the page
  const calculateMenuPosition = useCallback(() => {
    if (!commandMenuRef.current) return;

    const blockElement = document.querySelector(
      `[data-block-id="${id}"]`
    ) as HTMLDivElement;

    if (!blockElement) return;

    const blockRect = blockElement.getBoundingClientRect();

    setMenuPosition({
      top: blockRect.top + window.scrollY,  // Adjust for the viewport scroll
      left: blockRect.left + window.scrollX,
    });
  }, [id]);

  // Trigger menu positioning calculation on component mount or `id` change
  useEffect(() => {
    calculateMenuPosition();
  }, [id, calculateMenuPosition]);

  // Options for the "Turn into" submenu
  const turnIntoOptions: {
    type: BlockType['type'];
    label: string;
    icon: React.ElementType;
  }[] = [
    { type: 'header', label: 'Heading', icon: FaHeading },
    { type: 'paragraph', label: 'Text', icon: FaListUl },
    { type: 'quote', label: 'Quote', icon: FaQuoteRight },
  ];


  // Event handler to toggle submenu visibility
  const toggleSubmenu = (state: boolean) => {
    setShowSubmenu(state);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      ref={commandMenuRef}
      style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left + 2}px` }}
      className="bg-light-base transition-all z-50 duration-300 ease-in-out dark:bg-dark-100/20 backdrop-blur-2xl border max-w-[180px] border-light-200 border-b-0 overflow-visible dark:border-dark-200 fixed shadow-lg dark:shadow-dark-50 rounded-lg"
    >
      <h2 className="font-bold text-[14px] p-2 border-b w-full border-light-200 dark:border-dark-200/50 text-light-700 dark:text-dark-700">
        Basic Options
      </h2>
      <div className="grid w-full relative">
        {[
          { action: handleCopy, icon: IoMdCopy, label: 'Copy' },
          { action: handlePaste, icon: MdContentPaste, label: 'Paste' },
          { action: handleCut, icon: IoMdCut, label: 'Cut' },
          { action: handleDelete, icon: IoMdTrash, label: 'Delete' },
          { action: handleDuplicate, icon: IoDuplicateOutline, label: 'Duplicate' },
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

        {/* Turn Into with Submenu */}
        <div
          onClick={() => toggleSubmenu(!showSubmenu)}  // Toggle on click for better UX
          className="flex text-[13px] px-2 py-[6px] items-center gap-2 text-light-600 dark:text-dark-500 w-full hover:bg-light-100 hover:text-light-900 hover:dark:text-dark-800 hover:dark:bg-dark-100 cursor-pointer relative"
          aria-haspopup="true"
          aria-expanded={showSubmenu ? 'true' : 'false'}
        >
          <IoDuplicateOutline className="text-[20px]" />
          <p>Turn into</p>

          {/* Submenu */}
          {showSubmenu && (
            <motion.div
            initial={{x:"-30px"}}
            animate={{x:"0px"}}
            exit={{x:"-30px"}}
            transition={{duration:.4}}
             className="absolute left-[100%] overflow-hidden border-b-0 ml-2 bg-white dark:bg-dark-100 border border-light-300 dark:border-dark-200 rounded-md shadow-md z-50">
              {turnIntoOptions.map(({ type, label, icon: TypeIcon }) => (
                <div
                  key={type}
                  onClick={() => {
                    handleBlockTypeChange(type);  // Change block type on click
                    toggleSubmenu(false);  // Hide submenu after selection
                  }}
                  className="flex items-center border-b hover:bg-light-100 hover:text-dark-400 dark:hover:text-dark-600 border-light-300 dark:border-dark-200 gap-2 px-2 py-1 text-sm dark:hover:bg-dark-100 cursor-pointer"
                  role="menuitem"
                  tabIndex={0}
                >
                  <TypeIcon className="text-[16px]" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};