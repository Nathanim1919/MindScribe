import { KeyHandler } from "../../../types/key-handler.interface";
import { getCursorPosition, placeCaretAtPosition } from "../cursorUtils";

export const handleBackspace: KeyHandler = (e, { index, currentElement, context }) => {
    const cursorPosition = getCursorPosition(currentElement);
    const currentContent = currentElement.textContent || ''; // Use textContent instead of innerText
  
    if (cursorPosition === 0 || currentContent.trim() === '') {
      if (index > 0) {
        e.preventDefault();
        const previousBlock = context.blocks[index - 1];
        const currentBlock = context.blocks[index];
  
        // Merge blocks
        context.updateBlock(index - 1, {
          content: (previousBlock.content || '') + (currentBlock.content || '')
        });
        context.deleteBlock(index);
  
        // Use setTimeout to ensure DOM updates have flushed
        setTimeout(() => {
          // Get the updated previous block element
          const prevBlockElement = document.querySelector(
            `[data-block-index="${index - 1}"]`
          ) as HTMLElement;
  
          if (prevBlockElement) {
            // Focus the element first
            prevBlockElement.focus();
            
            // Calculate new cursor position (end of merged content)
            const newPosition = previousBlock.content?.length || 0;
            
            // Set cursor position
            placeCaretAtPosition(prevBlockElement, newPosition);
          }
        }, 0);
  
        // Update focused index after merge
        context.setFocusedBlockIndex(index - 1);
      }
    }
  };