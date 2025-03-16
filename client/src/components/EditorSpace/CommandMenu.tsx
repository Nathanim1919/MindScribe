import { useMemo, useRef, useState, useLayoutEffect } from "react";
import { PiTextHBold } from "react-icons/pi";
import { RiText } from "react-icons/ri";


interface CommandMenuProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  onSelect: (type: string) => void;
  position: number; // Index of the block where the command menu should appear
}

const blockTypes = [
  { type: "header", label: "Heading" },
  { type: "paragraph", label: "Text" },
];

export function CommandMenu({
  filter,
  onFilterChange,
  onSelect,
  position,
}: CommandMenuProps) {
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const commandMenuRef = useRef<HTMLDivElement>(null);
  console.log("The current passed Focused Block Index is: ", position);

  // Replace useEffect with useLayoutEffect
  useLayoutEffect(() => {
    if (commandMenuRef.current) {
      const blockElement = document.querySelector(
        `[data-block-index="${position}"]`
      ) as HTMLElement;
  
      if (blockElement) {
        const blockRect = blockElement.getBoundingClientRect();
        const menuHeight = commandMenuRef.current.offsetHeight;
  
        // Position the menu below the block
        setMenuPosition({
          top: blockRect.bottom + window.scrollY, // Add a small offset
          left: blockRect.left + window.scrollX,
        });
      }
    }
  }, [position]);

  // Filter block types based on the filter input
  const filteredBlocks = useMemo(
    () =>
      blockTypes.filter((block) =>
        block.label.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter]
  );

  return (
    <div
      ref={commandMenuRef}
      className="command-menu bg-dark-100 border border-dark-200 rounded-sm text-light-600 max-w-full p-2 absolute z-50"
      style={{
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
      }}
    >
      <div className="command-list grid gap-3">
        <span className="">Basic Blocks</span>
        {filteredBlocks.map((block) => (
          <div
            key={block.type}
            className="command-item  flex text-[20px] items-center gap-2 rounded-md hover:bg-dark-200 text-light-100 cursor-pointer"
            onClick={() => onSelect(block.type)}
          >
            {block.type === "header" ? <PiTextHBold className="text-light-400" /> : <RiText className="text-light-400" />}
            {block.label}
          </div>
        ))}
      </div>
    </div>
  );
}