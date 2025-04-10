import { KeyHandler } from "../../../types/key-handler.interface";
import { getCursorPosition, placeCaretAtPosition } from "../cursorUtils";

export const handleBackspace: KeyHandler = (
  e,
  { id, currentElement, context }
) => {
  const cursorPosition = getCursorPosition(currentElement);
  const currentContent = currentElement.textContent || '';
  const currentBlock = context.blocks.find(block => block.id === id);
  const index = context.blocks.findIndex(block => block.id === id);


  if (cursorPosition === 0 || currentContent.trim() === '') {
    if (index > 0) {
      e.preventDefault();
      const previousBlock = context.blocks[index - 1];
      
      // Merge blocks
      const mergedContent = (previousBlock.content || '') + (currentBlock?.content || '');

      context.updateBlock(previousBlock.id, { content: mergedContent });
      context.deleteBlock(id);

      // Update cursor position via context
      const newPosition = previousBlock.content?.length || 0;
      context.updateCursorPosition(previousBlock.id, newPosition);
      
      queueMicrotask(() => {
        const prevBlockElement = context.refMap.get(previousBlock.id)?.current;
        if (prevBlockElement) {
          placeCaretAtPosition(prevBlockElement, newPosition);
        }
      });

      context.setFocusedBlockId(context.blocks[index + 1]?.id);
    }
  }
};