import { KeyHandler } from "../../../types/key-handler.interface";
import { createBlock } from "../blockFactory";
import { getCursorPosition, placeCaretAtEnd, placeCaretAtStart, splitContentAtCursor } from "../cursorUtils";

export const handleEnter: KeyHandler = (e, { index, currentElement, context }) => {
  e.preventDefault();
  const cursorPosition = getCursorPosition(currentElement);
  const content = currentElement.innerText;


  if (index === 0 && cursorPosition === 0){
    return
  }

  // Case 1: Empty or end of block
  if (content.trim() === '' || cursorPosition === content.length) {
    const newBlock = context.addBlock('paragraph',"", index + 1);
    context.setFocusedBlockIndex(index + 1);

    console.log("New block created: ", newBlock)

    // setTimeout(() => {
    //   const blockId = context.blocks[index + 1].id;
    //   context.updateCursorPosition(blockId, 0);
    // }, 0)
    return;
  }


  // Case 2: Start of block
  if (cursorPosition === 0 && index > 0) {
    context.addBlock('paragraph',"", index);
    setTimeout(() => {
      const newBlock = document.querySelector(`[data-block-index="${index}"]`);
      if (newBlock) placeCaretAtStart(newBlock as HTMLElement);
    }, 0);
    return;
  }


  // Case 3: Middle of text
  const [firstPart, secondPart] = splitContentAtCursor(currentElement);
  context.updateBlock(index, { content: firstPart });
  const nextBlock = createBlock('paragraph',secondPart, {})
  context.addBlock(nextBlock.type,secondPart, index + 1);
  context.setFocusedBlockIndex(index + 1);

  setTimeout(() => {
    const newBlock = document.querySelector(`[data-block-index="${index + 1}"]`);
    if (newBlock) placeCaretAtEnd(newBlock as HTMLElement);
  }, 0);
};