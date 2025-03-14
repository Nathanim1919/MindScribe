import React, { useMemo } from "react";

interface CommandMenuProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  onSelect: (type: string) => void;
}

const blockTypes = [
  { type: "header", label: "Header" },
  { type: "paragraph", label: "Paragraph" },
  { type: "quote", label: "Quote" },
  { type: "list", label: "List" },
  { type: "image", label: "Image" },
  { type: "divider", label: "Divider" },
];

export function CommandMenu({ filter, onFilterChange, onSelect }: CommandMenuProps) {
  
  const filteredBlocks = useMemo(() => 
    blockTypes.filter((block) =>
      block.label.toLowerCase().includes(filter.toLowerCase())
    ), [filter]);
  



  return (
    <div className="command-menu bg-dark-700 text-dark-100">
      <div className="command-list">
        {filteredBlocks.map((block) => (
          <div
            key={block.type}
            className="command-item"
            onClick={() => onSelect(block.type)}
          >
            {block.label}
          </div>
        ))}
      </div>
    </div>
  );
}