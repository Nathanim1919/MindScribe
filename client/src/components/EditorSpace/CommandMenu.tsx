import { useMemo, useRef, useState, useLayoutEffect } from "react";
import { PiTextHBold } from "react-icons/pi";
import { RiText } from "react-icons/ri";

interface CommandMenuProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  onSelect: (type: string) => void;
  position: number; // Index of the block where the command menu should appear
}

// Define available block types
const blockTypes = [
  { type: "header", label: "Heading", icon: <PiTextHBold className="text-light-400" /> },
  { type: "paragraph", label: "Text", icon: <RiText className="text-light-400" /> },
];

export function CommandMenu({ filter, onSelect, position }: CommandMenuProps) {
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const commandMenuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!commandMenuRef.current) return;

    // Locate the selected block using its data attribute
    const blockElement = document.querySelector(`[data-block-index="${position}"]`) as HTMLElement;
    if (!blockElement) return;

    // Get the block's position relative to the viewport
    const blockRect = blockElement.getBoundingClientRect();
    
    // Adjust menu positioning relative to the document, considering scrolling
    setMenuPosition({
      top: blockRect.bottom + window.scrollY + 4, // Small margin below the block
      left: blockRect.left + window.scrollX, // Align with block's left edge
    });
  }, [position]);

  // Filter block types based on user input
  const filteredBlocks = useMemo(
    () => blockTypes.filter((block) => block.label.toLowerCase().includes(filter.toLowerCase())),
    [filter]
  );
  isCommandMenuVisible
  IsCommandMenuVisible
  IsCommandMenuVisible
  return (
    <div
      ref={commandMenuRef}
      className="command-menu dark:bg-dark-100 border shadow-sm border-light-200 dark:border-dark-200 rounded-sm text-light-600 max-w-full p-2 absolute z-50"
      style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
    >
      <div className="command-list grid gap-3">
        <span className="text-sm font-semibold text-light-500">Basic Blocks</span>
        {filteredBlocks.map((block) => (
          <div
            key={block.type}
            className="command-item flex text-[20px] items-center gap-2 rounded-md hover:bg-light-200 px-1 hover:dark:bg-dark-200 dark:text-light-100 cursor-pointer"
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
