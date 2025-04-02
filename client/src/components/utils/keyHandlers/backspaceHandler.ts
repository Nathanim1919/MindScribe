import { KeyHandler } from "../../../types/key-handler.interface";
import { getCursorPosition, placeCaretAtPosition } from "../cursorUtils";

export const handleBackspace: KeyHandler = (
  e,
  { index, currentElement, context }
) => {
  const cursorPosition = getCursorPosition(currentElement);
  const currentContent = currentElement.textContent || '';
  const currentBlock = context.blocks[index];

  if (cursorPosition === 0 || currentContent.trim() === '') {
    if (index > 0) {
      e.preventDefault();
      const previousBlock = context.blocks[index - 1];
      
      // Merge blocks
      const mergedContent = (previousBlock.content || '') + (currentBlock.content || '');
      context.updateBlock(index - 1, { content: mergedContent });
      context.deleteBlock(index);

      // Update cursor position via context
      const newPosition = previousBlock.content?.length || 0;
      context.updateCursorPosition(previousBlock.id, newPosition);
      
      queueMicrotask(() => {
        const prevBlockElement = document.querySelector(
          `[data-block-id="${previousBlock.id}"] [contenteditable]`
        ) as HTMLElement;
        if (prevBlockElement) {
          placeCaretAtPosition(prevBlockElement, newPosition);
        }
      });

      context.setFocusedBlockIndex(index - 1);
    }
  }
};