import { KeyHandler } from "../../../types/key-handler.interface";
import { createBlock } from "../blockFactory";
import { getCursorPosition, placeCaretAtEnd, placeCaretAtStart, splitContentAtCursor } from "../cursorUtils";

export const handleEnter: KeyHandler = (e, { id, currentElement, context }) => {
  e.preventDefault();
  const cursorPosition = getCursorPosition(currentElement);
  const content = currentElement.innerText;

  const index = context.blocks.findIndex(block => block.id === id);



  if (index === 0 && cursorPosition === 0){
    return
  }

  // Case 1: Empty or end of block
  if (content.trim() === '' || cursorPosition === content.length) {
    context.addBlock({
      type:"paragraph",
      id: id,
      afterId: id,
      content:"new block"
    });
    context.setFocusedBlockId(context.blocks[index + 1]?.id);
    setTimeout(() => {
      const newBlock = document.querySelector(`[data-block-index="${index + 1}"]`);
      const blockId = context.blocks[index + 1]?.id
      console.log("The new block id is: ", blockId);
      console.log(context.blocks);
      console.log("New block is: ", newBlock)
      if (newBlock) placeCaretAtStart(newBlock as HTMLElement);
    }, 0);
    return;
  }


  // Case 2: Start of block
  if (cursorPosition === 0 && index > 0) {
    context.addBlock('paragraph',"", id);
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
  context.setFocusedBlockId(context.blocks[index + 1]?.id);

  setTimeout(() => {
    const newBlock = document.querySelector(`[data-block-index="${index + 1}"]`);
    if (newBlock) placeCaretAtEnd(newBlock as HTMLElement);
  }, 0);
};