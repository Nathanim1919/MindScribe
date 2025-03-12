import { useState } from "react";
import { BlockType } from "../types/block.interface";

export function useCommand(addBlock: (block:BlockType) => void) {
  const [isCommandMenuVisible, setIsCommandMenuVisible] = useState(false);
  const [commandFilter, setCommandFilter] = useState("");

  const handleCommandSelect = (type: "header" | "paragraph" | "quote" | "list" | "image" | "divider") => {
    addBlock({ type } as BlockType); // Add the selected block type
    setIsCommandMenuVisible(false); // Hide the command menu
    setCommandFilter(""); // Reset the filter
  };

  return {
    isCommandMenuVisible,
    commandFilter,
    setCommandFilter,
    handleCommandSelect,
    setIsCommandMenuVisible
  };
}