import React, { useMemo, useEffect, useRef, useState } from "react";

interface CommandMenuProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  onSelect: (type: string) => void;
  position: number; // Index of the block where the command menu should appear
}

const blockTypes = [
  { type: "header", label: "Header" },
  { type: "paragraph", label: "Paragraph" },
  { type: "quote", label: "Quote" },
  { type: "list", label: "List" },
  { type: "image", label: "Image" },
  { type: "divider", label: "Divider" },
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

  // Calculate the position of the block
  useEffect(() => {
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

    console.log(menuPosition);
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
      className="command-menu bg-dark-100 border border-dark-200 rounded-sm text-light-600 max-w-[100px] absolute z-50"
      style={{
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
      }}
    >
      <div className="command-list">
        {filteredBlocks.map((block) => (
          <div
            key={block.type}
            className="command-item p-1 hover:bg-dark-50 cursor-pointer"
            onClick={() => onSelect(block.type)}
          >
            {block.label}
          </div>
        ))}
      </div>
    </div>
  );
}