import { useMemo } from 'react';
import { PiTextHBold } from 'react-icons/pi';
import { RiText } from 'react-icons/ri';
import { BlockType } from '../../types/block.interface';

interface CommandMenuProps {
  filter: string;
  // onFilterChange: (filter: string) => void;
  onSelect: (type: BlockType['type']) => void; // More specific type
  position: { top: number; left: number };
  menuRef: React.RefObject<HTMLDivElement | null>;
}

// Define available block types
const blockTypes = [
  {
    type: 'header',
    label: 'Heading',
    icon: <PiTextHBold className="text-light-400" />,
  },
  {
    type: 'paragraph',
    label: 'Text',
    icon: <RiText className="text-light-400" />,
  },

  {
    type: 'quote',
    label: 'Quote',
    icon: <RiText className="text-light-400" />,
  },
];

export function CommandMenu({
  filter,
  onSelect,
  position,
  menuRef,
}: CommandMenuProps) {
  const filteredBlocks = useMemo(
    () =>
      blockTypes.filter((block) =>
        block.label.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter],
  );


  return (
    <div
      ref={menuRef}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      className={`
        
        bg-light-base/20 transition-all z-999 duration-100 ease-in-out dark:bg-dark-100/20 backdrop-blur-2xl border  border-light-200 border-b-0 overflow-hidden dark:border-dark-200 fixed  shadow-lg shadow-dark-800 dark:shadow-dark-50 rounded-lg grid place-items-center`}
    >
      <div className="command-list grid">
        <span className="text-sm font-semibold w-full border-b dark:border-dark-200/50 border-light-200/50 p-2 text-light-700 dark:text-dark-900">
          Basic Blocks
        </span>
        {filteredBlocks.map((block) => (
          <div
            key={block.type}
            className="command-item flex text-[17px] items-center gap-1 p-1 hover:bg-light-100 hover:dark:bg-dark-100 dark:text-dark-400 text-light-400 hover:text-light-600 hover:dark:text-dark-700 cursor-pointer border-b dark:border-dark-200/50 border-light-200/50"
            onClick={(e) => {
              e.stopPropagation()
              onSelect(block.type as BlockType['type'])
            }}
          >
            {block.icon}
            {block.label}
          </div>
        ))}
      </div>
    </div>
  );
}
