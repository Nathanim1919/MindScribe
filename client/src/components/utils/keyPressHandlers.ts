import { BlockType } from '../../types/block.interface';
import {
  getCursorPosition,
  splitContentAtCursor,
  placeCaretAtEnd,
} from './cursorUtils';

interface KeyPressHandlersProps {
  blocks: BlockType[];
  addBlock: (block: BlockType, index?: number) => void;
  updateBlock: (index: number, block: BlockType) => void;
  deleteBlock: (index: number) => void;
  setFocusedBlockIndex: (index: number | null) => void;
  setIsCommandMenuVisible: (visible: boolean) => void;
  setCommandFilter: (filter: string) => void;
}

export const handleKeyPress = (
  e: React.KeyboardEvent<HTMLDivElement>,
  index: number,
  props: KeyPressHandlersProps
) => {
  const {
    blocks,
    addBlock,
    updateBlock,
    deleteBlock,
    setFocusedBlockIndex,
    setIsCommandMenuVisible,
    setCommandFilter,
  } = props;

  const currentBlockDiv = e.currentTarget;
  const cursorPosition = getCursorPosition(currentBlockDiv);
  const currentContent = currentBlockDiv.innerText;

  // 🔹 Backspace at start of block (merge with previous)
  if (e.key === 'Backspace') {
    if (cursorPosition === 0 || currentContent.trim() === '') {
      if (index > 0) {
        e.preventDefault();
        const previousBlock: BlockType = blocks[index - 1];
        const currentBlock: BlockType = blocks[index];

        // Merge the current block with the previous block
        updateBlock(index - 1, {
          ...previousBlock,
          content: (previousBlock.content ?? '') + (currentBlock.content ?? ''),
        });
        deleteBlock(index);
        setFocusedBlockIndex(index - 1);
      }
    }
    console.log("after removed: ", blocks); // Debugging
  }

 // 🔹 Enter key (split or create new block)
 else if (e.key === 'Enter') {
  e.preventDefault();
  const blockDiv = e.currentTarget;
  const cursorPosition = getCursorPosition(blockDiv);
  const content = blockDiv.innerText;


  // If the block is empty, or caret is at the very end,
  // insert the new block right below the current block.
  if (content.trim() === '' || cursorPosition === content.length) {
    console.log("The first consdition of enter key handle logic is executed!")
    const newIndex = index + 1;
    addBlock({ type: 'paragraph', content: '' }, newIndex);
    setFocusedBlockIndex(newIndex);
  }
  // If caret is at the very beginning, insert a new block above the current one.
  else if (cursorPosition === 0 && index > 0) {
    console.log("The second consdition of enter key handle logic is executed!")

    addBlock({ type: 'paragraph', content: '' }, index);
    setFocusedBlockIndex(index);
  }
  // Otherwise, split the content into two parts:
  // current block keeps the first part, new block gets the remainder.
  else {
    const [firstPart, secondPart] = splitContentAtCursor(blockDiv);
    console.log("The third consdition of enter key handle logic is executed!")

    updateBlock(index, { ...blocks[index], content: firstPart });
    addBlock({ type: 'paragraph', content: secondPart }, index + 1);
    setFocusedBlockIndex(index + 1);

    setTimeout(() => {
      const newBlockDiv = document.querySelector(
        `[data-block-index="${index + 1}"]`
      ) as HTMLElement;
      if (newBlockDiv) {
        placeCaretAtEnd(newBlockDiv);
      }
    }, 0);
  }
}
  

  // 🔹 Arrow keys (navigate between blocks)
  else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (index < blocks.length - 1) {
      setFocusedBlockIndex(index + 1);
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (index > 0) {
      setFocusedBlockIndex(index - 1);
    }
  }

  // 🔹 Slash (open command menu)
  else if (e.key === '/') {
    e.preventDefault();
    setIsCommandMenuVisible(true);
    if (blocks[index].content?.trim() === '') {
      setFocusedBlockIndex(index);
    } else {
      setFocusedBlockIndex(index + 1);
    }
  }
};