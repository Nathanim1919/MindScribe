import { KeyHandler } from '../../../types/key-handler.interface';
import {
  getCursorPosition,
  placeCaretAtEnd,
  placeCaretAtStart,
  splitContentAtCursor,
} from '../cursorUtils';

export const handleEnter: KeyHandler = async (
  e,
  { id, currentElement, context },
) => {
  e.preventDefault();
  const cursorPosition = getCursorPosition(currentElement);
  const content = currentElement.innerText;
  const index = context.blocks.findIndex((block) => block.id === id);

  if (index === 0 && cursorPosition === 0) return;

  // Case 1: Empty or end of block
  if (content.trim() === '' || cursorPosition === content.length) {
    const newBlockId = context.addBlock({
      type: 'paragraph',
      afterId: id,
      content: '',
    });

    await new Promise((resolve) => setTimeout(resolve, 0));

    if (!newBlockId) return;

    context.setFocusedBlockId(newBlockId);
    await new Promise((resolve) => setTimeout(resolve, 0));

    const targetEl = context.refMap.get(newBlockId)?.current;

    if (targetEl) {
      requestAnimationFrame(() => {
        placeCaretAtStart(targetEl);
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
    
    return;
  }

  // Case 2: Start of block
  if (cursorPosition === 0 && index > 0) {
    context.addBlock({ type: 'paragraph', content: '', afterId: id });
    setTimeout(() => {
      const newBlock = context.refMap.get(id)?.current;
      if (newBlock) placeCaretAtStart(newBlock);
    }, 0);
    return;
  }

  // Case 3: Middle of text
  const [firstPart, secondPart] = splitContentAtCursor(currentElement);
  context.updateBlock(context.blocks[index].id, { content: firstPart });
  const newBlockId = context.addBlock({
    type: 'paragraph',
    content: secondPart,
    afterId: context.blocks[index].id,
  });
  await new Promise((resolve) => setTimeout(resolve, 0));

  if (!newBlockId) return;
  context.setFocusedBlockId(newBlockId);

  const targetEl = context.refMap.get(newBlockId)?.current;
  if (targetEl) placeCaretAtEnd(targetEl);
};