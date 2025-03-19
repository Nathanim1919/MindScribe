import { BlockType } from '../../types/block.interface';
import {
  getCursorPosition,
  splitContentAtCursor,
  placeCaretAtEnd,
  placeCaretAtStart,
  insertTextAtCaret,
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
  props: KeyPressHandlersProps,
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
    console.log('after removed: ', blocks); // Debugging
  } 
  // if space is pressed
  else if (e.key === ' ') {
    e.preventDefault();
    insertTextAtCaret('\u00A0'); // Insert a non-breaking space (safe for all browsers)
    console.log('Space is pressed');
  }
  else if (e.key === 'Enter') {
    e.preventDefault(); 
    const blockDiv = e.currentTarget;
    const cursorPosition = getCursorPosition(blockDiv);
    const content = blockDiv.innerText;
    const blockType = blocks[index].type;

    // 1️⃣ Case: Block is empty OR cursor is at the end → Create a new block below
    if (content.trim() === '' || cursorPosition === content.length) {
      console.log('Enter: Creating a new block below');

      const newIndex = index + 1;
      addBlock({ type: 'paragraph', content: 'New Paragraph Just Created!!!' }, newIndex);
      setFocusedBlockIndex(newIndex);
    }
    // 2️⃣ Case: Cursor is at the beginning of a non-empty block → Insert above and shift down
    else if (cursorPosition === 0 && index > 0) {
      console.log(
        'Enter: Inserting a new block above and shifting existing block down',
      );

      addBlock({ type: 'paragraph', content: '' }, index);
      // setFocusedBlockIndex(index + 1);

      // set the cursr at the beginning of index + 1 block
      setTimeout(() => {
        const newBlockDiv = document.querySelector(
          `[data-block-index="${index + 1}"]`,
        ) as HTMLElement;
        if (newBlockDiv) {
          placeCaretAtStart(newBlockDiv);
        }
      }, 0);
    }
    // 3️⃣ Case: Cursor is in the middle of text → Split the content into two blocks
    else {
      console.log('Enter: Splitting block at cursor position');

      const [firstPart, secondPart] = splitContentAtCursor(blockDiv);

      // Lets Check if it is really spliting the text
      console.log('The Splited text are: ', firstPart, '---:---', secondPart);

      // Update the current block with the first part
      updateBlock(index, { ...blocks[index], content: 'firstPart' });

      // Preserve the block type for the split content
      addBlock({ type: blockType, content: secondPart }, index + 1);
      setFocusedBlockIndex(index + 1);

      // Ensure the cursor moves to the newly created block
      setTimeout(() => {
        const newBlockDiv = document.querySelector(
          `[data-block-index="${index + 1}"]`,
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
