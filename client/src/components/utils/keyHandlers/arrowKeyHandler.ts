import { KeyHandler } from "../../../types/key-handler.interface";
import { placeCaretAtPosition } from "../cursorUtils";

export const handleArrowKeys: KeyHandler = (e, { index, context }) => {
    e.preventDefault();
    const { blocks, setFocusedBlockIndex } = context;
    
    if (e.key === 'ArrowDown' && index < blocks.length - 1) {
      const newIndex = index + 1;
      const targetBlock = blocks[newIndex];
      const targetPosition = targetBlock.content?.length || 0;
      
      setFocusedBlockIndex(newIndex);
      
      // Use requestAnimationFrame for better timing with React's render cycle
      requestAnimationFrame(() => {
        const targetElement = document.querySelector(
          `[data-block-index="${newIndex}"] [contenteditable]`
        ) as HTMLElement;
        
        if (targetElement) {
          targetElement.focus();
          placeCaretAtPosition(targetElement, targetPosition);
        }
      });
    } 
    else if (e.key === 'ArrowUp' && index > 0) {
      const newIndex = index - 1;
      const targetBlock = blocks[newIndex];
      const targetPosition = targetBlock.content?.length || 0;
      
      setFocusedBlockIndex(newIndex);
      
      requestAnimationFrame(() => {
        const targetElement = document.querySelector(
          `[data-block-index="${newIndex}"] [contenteditable]`
        ) as HTMLElement;
        
        if (targetElement) {
          targetElement.focus();
          placeCaretAtPosition(targetElement, targetPosition);
        }
      });
    }
  };