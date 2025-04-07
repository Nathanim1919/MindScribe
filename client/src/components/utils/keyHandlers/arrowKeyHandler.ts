import { KeyHandler } from '../../../types/key-handler.interface';
import { placeCaretAtPosition } from '../cursorUtils';

export const handleArrowKeys: KeyHandler = (e, { id, context }) => {
  const { blocks, setFocusedBlockId } = context;
  const currentBlock = blocks.find((block) => block.id === id);
  const currentContent = currentBlock?.content;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const caretOffset = range.startOffset;

  const index = blocks.findIndex((block) => block.id === id);

  if (e.key === 'ArrowDown') {
    if (index < blocks.length - 1) {
      const isCaretAtEnd = caretOffset === currentContent?.length;
      if (isCaretAtEnd) {
        e.preventDefault();
        const newIndex = index + 1;
        const targetBlock = blocks[newIndex];
        const targetPosition = 0; // Start of next block

        setFocusedBlockId(targetBlock?.id);

        requestAnimationFrame(() => {
          const targetElement = document.querySelector(
            `[data-block-index="${newIndex}"] [contenteditable]`,
          ) as HTMLElement;

          if (targetElement) {
            targetElement.focus();
            placeCaretAtPosition(targetElement, targetPosition);
          }
        });
      }
      // Else, allow default behavior to move within block
    }
  } else if (e.key === 'ArrowUp') {
    if (index > 0) {
      const isCaretAtStart = caretOffset === 0;
      if (isCaretAtStart) {
        e.preventDefault();
        const newIndex = index - 1;
        const targetBlock = blocks[newIndex];
        const targetPosition = targetBlock.content?.length || 0; // End of previous block

        setFocusedBlockId(targetBlock?.id);

        requestAnimationFrame(() => {
          const targetElement = document.querySelector(
            `[data-block-index="${newIndex}"] [contenteditable]`,
          ) as HTMLElement;

          if (targetElement) {
            targetElement.focus();
            placeCaretAtPosition(targetElement, targetPosition);
          }
        });
      }
      // Else, allow default behavior to move within block
    }
  }
};
