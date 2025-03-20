import { useState } from 'react';

export function useCommandOption(index: number | null) {
  const [isCommandOptionVisible, setIsCommandOptionVisible] = useState(false);

  const handleCopy = () => {
    alert('coppy the block at index: ' + index);
    console.log('Copy');
    setIsCommandOptionVisible(false);
  };

  const handleCut = () => {
    console.log('Cut');
    setIsCommandOptionVisible(false);
  };

  const handleDelete = () => {
    console.log('Delete');
    setIsCommandOptionVisible(false);
  };

  const handleUndo = () => {
    console.log('Undo');
    setIsCommandOptionVisible(false);
  };

  const handleRedo = () => {
    console.log('Redo');
    setIsCommandOptionVisible(false);
  };

  const handleDuplicate = () => {
    console.log('Duplicate');
    setIsCommandOptionVisible(false);
  };

  return {
    isCommandOptionVisible,
    setIsCommandOptionVisible,
    handleCopy,
    handleCut,
    handleDelete,
    handleUndo,
    handleRedo,
    handleDuplicate,
  };
}
