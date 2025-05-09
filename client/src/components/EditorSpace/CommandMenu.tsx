import { useMemo, useRef } from 'react';
import { PiTextHBold } from 'react-icons/pi';
import { RiText } from 'react-icons/ri';
import { BlockType } from '../../types/block.interface';
import { motion } from 'framer-motion';
import { BlockMeta } from '../../types/meta.type';

interface CommandMenuProps {
  filter: string;
  // onFilterChange: (filter: string) => void;
  onSelect: (type: BlockType['type'], meta?: BlockMeta) => void; // More specific type
  position: { top: number; left: number };
  menuRef: React.RefObject<HTMLDivElement | null>;
}

// Define available block types
const blockTypes = [
  {
    type: 'header',
    meta: {
      level: 1,
      spacing: 'large',
    },
    label: 'Heading 1',
    icon: <PiTextHBold className="text-light-500 dark:text-dark-800" />,
  },
  {
    type: 'header',
    meta: {
      level: 2,
      spacing: 'medium',
    },
    label: 'Heading 2',
    icon: <PiTextHBold className="text-light-500 dark:text-dark-800" />,
  },
  {
    type: 'header',
    meta: {
      level: 3,
      spacing: 'small',
    },
    label: 'Heading 3',
    icon: <PiTextHBold className="text-light-500 dark:text-dark-800" />,
  },
  {
    type: 'paragraph',
    label: 'Text',
    icon: <RiText className="text-light-500 dark:text-dark-800" />,
  },

  {
    type: 'quote',
    label: 'Quote',
    icon: <RiText className="text-light-500 dark:text-dark-800" />,
  },
  {
    type: 'image',
    label: 'Image',
    icon: <RiText className="text-light-500 dark:text-dark-800" />,
  },
];

export function CommandMenu({
  filter,
  onSelect,
  position,
  menuRef,
}: CommandMenuProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleImageClick = () => {
    fileInputRef.current?.click();
  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const meta = {
        src: URL.createObjectURL(file),
        name: file.name,
      };
      onSelect('image', meta); // Assuming your image block expects a `src` and maybe `name`
    }
  };

  const filteredBlocks = useMemo(
    () =>
      blockTypes.filter((block) =>
        block.label.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter],
  );

  return (
    <>
     <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
   
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      ref={menuRef}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      className={`
        
        bg-light-base/20 transition-all z-50 duration-100 ease-in-out dark:bg-dark-100/20 backdrop-blur-2xl border  border-light-200 overflow-hidden dark:border-dark-100 fixed  shadow-lg shadow-dark-800 dark:shadow-dark-50 rounded-lg grid place-items-center`}
    >
      <div className="command-list grid overflow-hidden">
        <span className="text-sm font-semibold w-full border-b dark:border-dark-200/50 border-light-200/50 p-2 text-light-700 dark:text-dark-900">
          Basic Blocks
        </span>
        {filteredBlocks.map((block) => (
          <div
            key={block.label}
            className="command-item flex text-[17px] items-center gap-1 py-1 rounded-none px-2 hover:bg-light-100 hover:dark:bg-dark-100 dark:text-dark-500 text-light-500 hover:text-light-600 hover:dark:text-dark-700 cursor-pointer border-t dark:border-dark-200/50 border-light-200/50"
            onClick={(e) => {
              e.stopPropagation();
              if (block.type === 'image') {
                handleImageClick();
              } else {
                onSelect(
                  block.type as BlockType['type'],
                  block.meta as BlockMeta,
                );
              }
            }}
          >
            {block.icon}
            {block.label}
          </div>
        ))}
      </div>
    </motion.div>
    </>
  );
}
