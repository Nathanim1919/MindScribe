import React, { useRef, useState, useEffect } from 'react';
import { useBlocks, useCommand } from '../../hooks';
import { CommandMenu } from './CommandMenu';
import { createBlock } from '../utils/blockUtils';
import { BlockType } from '../../types/block.interface';

export function Editor() {
  const { blocks, addBlock, updateBlock, deleteBlock, updateBlocksWithNewSetOfBlocks } = useBlocks([
    { type: 'header', content: '' },
  ]);

  const {
    isCommandMenuVisible,
    setIsCommandMenuVisible,
    commandFilter,
    setCommandFilter,
  } = useCommand(addBlock);

  const editorRef = useRef<HTMLDivElement>(null);
  const [focusedBlockIndex, setFocusedBlockIndex] = useState<number | null>(
    null,
  );
  const [selectedBlocks, setSelectedBlocks] = useState<Set<number>>(new Set());
  const [copiedBlocks, setCopiedBlocks] = useState<BlockType[]>([]);

  // 📌 Helper Functions: Cursor & Selection
  const getCursorPosition = (element: HTMLElement): number => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length;
  };

  const splitContentAtCursor = (element: HTMLElement): [string, string] => {
    const cursorPosition = getCursorPosition(element);
    const content = element.innerText;
    console.log('Splitting content:', content, 'at position:', cursorPosition); // Debugging
    return [content.slice(0, cursorPosition), content.slice(cursorPosition)];
  };

  const placeCaretAtEnd = (element: HTMLElement) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  // 📌 Lifecycle: Focus First Block on Load
  useEffect(() => {
    if (editorRef.current) {
      const firstBlock = editorRef.current.querySelector(
        '[contenteditable]',
      ) as HTMLDivElement;
      if (firstBlock) {
        firstBlock.focus();
        placeCaretAtEnd(firstBlock);
      }
    }
  }, []);

  // 📌 Handlers: Key Press Events
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => {
    const currentBlockDiv = e.currentTarget;
    const cursorPosition = getCursorPosition(currentBlockDiv);
    const currentContent = currentBlockDiv.innerText;

    // 🔹 Backspace at start of block (merge with previous)
    if (e.key === 'Backspace') {
      // If at the beginning or block is empty
      if (cursorPosition === 0 || currentContent.trim() === '') {
        // If it is not the first block
        if (index > 0) {
          e.preventDefault();
          const previousBlock: BlockType = blocks[index - 1];
          const currentBlock: BlockType = blocks[index];

          // Merge the current block with the previous block
          updateBlock(index - 1, {
            ...previousBlock,
            content:
              (previousBlock.content ?? '') + (currentBlock.content ?? ''),
          });
          deleteBlock(index);
          setFocusedBlockIndex(index - 1);
        } else {
          // Optional: if it's the first block, do default behavior
        }
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const blockDiv = e.currentTarget;
      const cursorPosition = getCursorPosition(blockDiv);
      const content = blockDiv.innerText;

      // If the block is empty, or caret is at the very end,
      // insert the new block right below the current block.
      if (content.trim() === '' || cursorPosition === content.length) {
        // Insert the new block immediately after the current block
        const newIndex = index + 1;
        addNewBlock('paragraph', newIndex);
        setFocusedBlockIndex(newIndex);
      }
      // If caret is at the very beginning, insert a new block above the current one.
      else if (cursorPosition === 0) {
        addNewBlock('paragraph', index);
        setFocusedBlockIndex(index);
      }
      // Otherwise, split the content into two parts:
      // current block keeps the first part, new block gets the remainder.
      else {
        const [firstPart, secondPart] = splitContentAtCursor(blockDiv);

        updateBlock(index, { ...blocks[index], content: firstPart });
        // Insert the new block immediately after the current block
        addNewBlock('paragraph', index + 1, secondPart);
        setFocusedBlockIndex(index + 1);

        console.log('Updated block:', blocks[index]);

        console.log('Added new block:', blocks[index + 1]);
        // Place the caret at the end of the new block (with a slight delay)
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

    // down arrow and up arrow to navigate between blocks
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

  // 📌 Handlers: Input & Click Events
  const handleInput = (index: number, e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerText.trim();
    updateBlock(index, { ...blocks[index], content });
    console.log(blocks);
  };

  const handleBlockClick = (index: number) => {
    setFocusedBlockIndex(index);
  };

  const handleCommandSelection = (type: string) => {
    if (focusedBlockIndex === null) return;
    addNewBlock(type as BlockType['type'], focusedBlockIndex);
    setIsCommandMenuVisible(false);
    setCommandFilter('');
    setFocusedBlockIndex(null);
  };

  // 📌 Utility: Add New Block
  const addNewBlock = (
    type: BlockType['type'],
    index: number,
    content = '',
  ) => {
    const newBlock = createBlock(type, content);
    addBlock(newBlock, index);
    setFocusedBlockIndex(index);
  };

  // const introBox = () => {
  //   const box = 'heading /heading and text /text';
  // };

  // 📌 Focus New Block When Added
  useEffect(() => {
    if (focusedBlockIndex !== null && editorRef.current) {
      setTimeout(() => {
        const blockDivs =
          editorRef.current.querySelectorAll('[contenteditable]');
        if (blockDivs[focusedBlockIndex]) {
          const newBlockDiv = blockDivs[focusedBlockIndex] as HTMLDivElement;
          newBlockDiv.focus();
          placeCaretAtEnd(newBlockDiv);
        }
      }, 0);
    }
  }, [blocks]);

  const activeBlockInformation = (index: number) => {
    const block = blocks[index];

    // For header blocks, show placeholder ("Head 1" or custom value) if empty.
    if (block.type === 'header') {
      return block.content?.trim() === '' ? 'Head 1' : '';
    }

    // For other blocks, only show placeholder if this block is focused and empty.
    if (focusedBlockIndex === index && block.content?.trim() === '') {
      return 'Write something, press "/" for commands';
    }

    return '';
  };

  const handleBlockSelection = (index: number) => {
    const newSelectedBlocks = new Set(selectedBlocks);
    if (newSelectedBlocks.has(index)) {
      newSelectedBlocks.delete(index); // Deselect if already selected
    } else {
      newSelectedBlocks.add(index); // Select if not already selected
    }
    setSelectedBlocks(newSelectedBlocks);
  };

  const handleCopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (selectedBlocks.size > 0) {
      const copied = Array.from(selectedBlocks).map((index) => blocks[index]);
      setCopiedBlocks(copied);
      console.log('Copied blocks:', copied);
    }
  };

  const handleCut = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (selectedBlocks.size > 0) {
      const copied = Array.from(selectedBlocks).map((index) => blocks[index]);
      setCopiedBlocks(copied);

      // Remove the selected blocks
      const newBlocks = blocks.filter((_, index) => !selectedBlocks.has(index));
      updateBlocksWithNewSetOfBlocks(newBlocks);

      setSelectedBlocks(new Set()); // Clear selection
      console.log('Cut blocks:', copied);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (copiedBlocks.length > 0) {
      const pasteIndex =
        focusedBlockIndex !== null ? focusedBlockIndex + 1 : blocks.length;
      const newBlocks = [...blocks];
      newBlocks.splice(pasteIndex, 0, ...copiedBlocks); // Insert copied blocks
      updateBlocksWithNewSetOfBlocks(newBlocks);
      console.log('Pasted blocks at index:', pasteIndex);
    }
  };

  return (
    <div
      onCopy={handleCopy}
      onCut={handleCut}
      onPaste={handlePaste}
      ref={editorRef}
      className="bg-light-50 dark:bg-dark-50 h-[90vh] overflow-hidden overflow-y-auto mt-2 rounded-md border border-light-200 dark:border-dark-100"
    >
      {/* 📌 Render Blocks */}
      <div className="relative w-[60%] m-auto">
        {blocks.map((block, index) => (
          <div
            key={index}
            data-block-index={index} // Add this attribute
            aria-label={`Editable block ${index}`}
            contentEditable
            onClick={() => {handleBlockClick(index); handleBlockSelection(index);}}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onInput={(e) => handleInput(index, e)}
            className={`relative w-full outline-none border-none break-words font-sans
         ${
           block.type === 'header'
             ? 'text-light-950 dark:text-dark-900 text-4xl py-2 before:text-center'
             : 'text-light-600 dark:text-dark-500 text-[18px] leading-[1.2em]'
         }
         ${
          selectedBlocks.has(index)
            ? 'border-2 border-blue-500' // Add a border for selected blocks
            : ''
        }
         before:absolute before:top-0 before:left-0 before:text-gray-500 before:opacity-50 
         before:pointer-events-none before:content-[attr(data-placeholder)]
         ${
           block.type === 'header'
             ? block.content?.trim() === ''
               ? 'before:block'
               : 'before:hidden'
             : 'before:hidden focus:before:block'
         }
       `}
            data-placeholder={activeBlockInformation(index)}
          ></div>
        ))}

        {/* 📌 Command Menu */}
        {isCommandMenuVisible && (
          <CommandMenu
            filter={commandFilter}
            onFilterChange={setCommandFilter}
            onSelect={handleCommandSelection}
            position={focusedBlockIndex !== null ? focusedBlockIndex : 0}
          />
        )}
      </div>
    </div>
  );
}
