import { useMemo, useRef, useState, useLayoutEffect } from 'react';
import { PiTextHBold } from 'react-icons/pi';
import { RiText } from 'react-icons/ri';

interface CommandMenuProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  onSelect: (type: string) => void;
  position: number; // Index of the block where the command menu should appear
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
];

export function CommandMenu({ filter, onSelect, position }: CommandMenuProps) {
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });

  const commandMenuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!commandMenuRef.current) return;

    // Locate the selected block using its data attribute
    const blockElement = document.querySelector(
      `[data-block-index="${position}"]`,
    ) as HTMLElement;
    if (!blockElement) return;

    // Get the block's position relative to the viewport
    const blockRect = blockElement.getBoundingClientRect();

    // Adjust menu positioning relative to the document, considering scrolling
    setMenuPosition({
      top: blockRect.top + window.scrollY, // Small margin below the block
      left: blockRect.left + window.scrollX, // Align with block's left edge
    });
  }, [position]);

  // Filter block types based on user input
  const filteredBlocks = useMemo(
    () =>
      blockTypes.filter((block) =>
        block.label.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter],
  );
  return (
    <div
      ref={commandMenuRef}
      style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
      className={`
        
        bg-light-base/20 transition-all duration-100 ease-in-out dark:bg-dark-100/20 backdrop-blur-2xl border  border-light-200 border-b-0 overflow-hidden dark:border-dark-200 fixed  shadow-lg shadow-dark-800 dark:shadow-dark-50 rounded-lg grid place-items-center`}
    >
      <div className="command-list grid">
        <span className="text-sm font-semibold w-full border-b dark:border-dark-200/50 border-light-200/50 p-2 text-light-700 dark:text-dark-900">
          Basic Blocks
        </span>
        {filteredBlocks.map((block) => (
          <div
            key={block.type}
            className="command-item flex text-[17px] items-center gap-1 p-1 hover:bg-light-100 hover:dark:bg-dark-100 dark:text-dark-400 text-light-400 hover:text-light-600 hover:dark:text-dark-700 cursor-pointer border-b dark:border-dark-200/50 border-light-200/50"
            onClick={() => onSelect(block.type)}
          >
            {block.icon}
            {block.label}
          </div>
        ))}
      </div>
    </div>
  );
}
