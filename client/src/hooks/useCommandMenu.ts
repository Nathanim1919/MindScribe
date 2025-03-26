import { useState } from "react";
import { BlockType } from "../types/block.interface";

export function useCommand(
  addBlock: (type: BlockType['type'], index?: number) => void
) {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('');
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  const showMenu = (index: number) => {
    setTargetIndex(index);
    setIsVisible(true);
  };

  const handleSelect = (type: BlockType['type']) => {
    alert('Selected: ' + type);
    if (targetIndex === null) return;
    
    const insertIndex = type === 'header' ? targetIndex + 1 : targetIndex;
    addBlock(type, insertIndex);
    
    setIsVisible(false);
    setFilter('');
    setTargetIndex(null);
  };

  return {
    isCommandMenuVisible: isVisible,
    commandFilter: filter,
    setCommandFilter: setFilter,
    handleCommandSelect: handleSelect,
    showCommandMenu: showMenu,
    hideCommandMenu: () => setIsVisible(false)
  };
}