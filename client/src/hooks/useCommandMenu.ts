import { useEffect, useState } from 'react';
import { BlockType } from '../types/block.interface';

// Hooks to handle keyboard shorcuts and command menu
export function useCommand(
  addBlock: (
    type: BlockType['type'],
    content?: string,
    additionalProps?: any,
  ) => void,
) {
  const [isCommandMenuVisible, setIsCommandMenuVisible] = useState(false);
  const [commandFilter, setCommandFilter] = useState('');

  // Show command menu when '/ is typed
  useEffect(() => {
    const handleSlash = (e: KeyboardEvent) => {
      if (e.key === '/') {
        setIsCommandMenuVisible(true);
      }
    };

    window.addEventListener('keydown', handleSlash);
    return () => window.removeEventListener('keydown', handleSlash);
  }, []);

  // Hide command menu when 'Esc' is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCommandMenuVisible(false);
        setCommandFilter('');
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Handle command menu selection
  const handleCommandSelection = (type: BlockType['type']) => {
    addBlock(type);
    setIsCommandMenuVisible(false);
    setCommandFilter('');
  };

  return {
    isCommandMenuVisible,
    setIsCommandMenuVisible,
    commandFilter,
    setCommandFilter,
    handleCommandSelection,
  };
}
