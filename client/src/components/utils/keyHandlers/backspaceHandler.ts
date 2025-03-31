import { KeyHandler } from '../../../types/key-handler.interface';
import { getCursorPosition, placeCaretAtPosition } from '../cursorUtils';

export const handleBackspace: KeyHandler = (
  e,
  { index, currentElement, context },
) => {
  const cursorPosition = getCursorPosition(currentElement);
  const currentContent = currentElement.textContent || ''; // Use textContent instead of innerText

  if (cursorPosition === 0 || currentContent.trim() === '') {
    if (index > 0) {
      e.preventDefault();
      const previousBlock = context.blocks[index - 1];
      const currentBlock = context.blocks[index];

      // Merge blocks
      context.updateBlock(index - 1, {
        content: (previousBlock.content || '') + (currentBlock.content || ''),
      });
      context.deleteBlock(index);

      // Use setTimeout to ensure DOM updates have flushed
      // setTimeout(() => {
      //   // Get the updated previous block element
      //   const prevBlockElement = document.querySelector(
      //     `[data-block-index="${index - 1}"]`,
      //   ) as HTMLElement;

      //   if (prevBlockElement) {
      //     // Focus the element first
      //     prevBlockElement.focus();

      //     // Calculate new cursor position (end of merged content)
      //     const newPosition = previousBlock.content?.length || 0;
      //     console.log('newPosition', newPosition);

      //     // Set cursor position
      //     placeCaretAtPosition(prevBlockElement, newPosition);
      //   }
      // }, 0);

      requestAnimationFrame(() => {
        const prevBlockElement = document.querySelector(
          `[data-block-index="${index - 1}"]`,
        ) as HTMLElement;

        const newPosition = previousBlock.content?.length || 0;


        if (prevBlockElement) {
          // Maybe ensure focus again just in case deleteBlock didn't handle it
          // prevBlockElement.focus();
          placeCaretAtPosition(prevBlockElement, newPosition);
        }
      });

      // Update focused index after merge
      context.setFocusedBlockIndex(index - 1);
    }
  }
};

//   export const handleBackspace: KeyHandler = (e, { index, currentElement, currentBlock, context }) => {
//     e.preventDefault(); // Prevent default action ALWAYS for Backspace

//     const selection = window.getSelection();
//     // Handle Range Selection Deletion First (if selection covers multiple characters)
//     if (selection && !selection.isCollapsed) {
//         const range = selection.getRangeAt(0);
//         const currentContent = currentBlock.content || '';

//         // Calculate content before and after the range
//         // (This requires careful range analysis, might be simpler to just read the new content after deletion)
//         // --> OR: A simpler approach for range deletion:
//         range.deleteContents(); // Let browser delete range in DOM *temporarily*
//         const newContent = currentElement.textContent || ''; // Read the result
//         const newCursorPos = getCursorPosition(currentElement); // Get cursor pos after deletion

//         context.updateBlock(index, { content: newContent }); // Update state

//         requestAnimationFrame(() => { // Reposition cursor
//             const el = document.querySelector(`[data-block-index="${index}"]`) as HTMLElement || currentElement;
//             if (el) placeCaretAtPosition(el, newCursorPos);
//         });
//         return; // Done handling range deletion
//     }

//     // Handle Single Character Deletion / Merging
//     const cursorPosition = getCursorPosition(currentElement);
//     const currentContent = currentBlock.content || ''; // Get content from STATE

//     if (cursorPosition > 0) {
//         // --- Deleting character WITHIN the block ---
//         const newContent = currentContent.slice(0, cursorPosition - 1) + currentContent.slice(cursorPosition);
//         const newCursorPos = cursorPosition - 1;

//         context.updateBlock(index, { content: newContent }); // Update state

//         requestAnimationFrame(() => { // Reposition cursor
//             const el = document.querySelector(`[data-block-index="${index}"]`) as HTMLElement || currentElement;
//             if (el) placeCaretAtPosition(el, newCursorPos);
//         });

//     } else { // cursorPosition === 0
//         // --- Attempting to MERGE with previous block ---
//         if (index > 0) {
//             const previousBlock = context.blocks[index - 1];
//             // ** Important check: Only merge if previous block is compatible (e.g., text-based) **
//             // Assuming previousBlock.content exists and is mergeable for now

//             const contentBeforeMerge = previousBlock.content || '';
//             const contentToMerge = currentBlock.content || ''; // Use state content
//             const newContent = contentBeforeMerge + contentToMerge;
//             const newCursorPos = contentBeforeMerge.length; // Cursor goes after original previous content

//             // Perform updates in specific order:
//             // 1. Update previous block's content
//             context.updateBlock(index - 1, { content: newContent });
//             // 2. Delete current block
//             context.deleteBlock(index); // This might immediately trigger focus change, be careful
//             // 3. Set focus to previous block *index*
//             context.setFocusedBlockIndex(index - 1);

//             // Place cursor AFTER state updates and potential focus shift
//             requestAnimationFrame(() => {
//                 const prevBlockElement = document.querySelector(
//                     `[data-block-index="${index - 1}"]`
//                 ) as HTMLElement;

//                 if (prevBlockElement) {
//                     // Maybe ensure focus again just in case deleteBlock didn't handle it
//                     // prevBlockElement.focus();
//                     placeCaretAtPosition(prevBlockElement, newCursorPos);
//                 }
//             });
//         }
//         // else: Cursor is at start of the very first block, do nothing.
//     }
// };
