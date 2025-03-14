import React, { useRef, useState, useEffect } from 'react';
import { useBlocks, useCommand } from '../../hooks';
import { CommandMenu } from './CommandMenu';
import { createBlock } from '../utils/blockUtils';
import { BlockType } from '../../types/block.interface';

export function Editor() {
  const { blocks, addBlock, updateBlock, deleteBlock } = useBlocks([
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
    }

    // 🔹 Enter (new block logic)
    else if (e.key === 'Enter') {
      e.preventDefault();
      const blockDiv = e.currentTarget;
      const cursorPosition = getCursorPosition(blockDiv);
      const content = blockDiv.innerText;

      if (content.length === 0 || cursorPosition === content.length) {
        // if (
        addNewBlock('paragraph', index + 1);
      } else if (cursorPosition === 0) {
        addNewBlock('paragraph', index);
      } else {
        const [firstPart, secondPart] = splitContentAtCursor(blockDiv);
        updateBlock(index, { ...blocks[index], content: firstPart });
        addNewBlock('paragraph', index + 1, secondPart);
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
      alert('Slash key pressed');
      setIsCommandMenuVisible(true);
      setFocusedBlockIndex(index);
    }
  };

  // 📌 Handlers: Input & Click Events
  const handleInput = (index: number, e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerText.trim();
    updateBlock(index, { ...blocks[index], content });
  };

  const handleBlockClick = (index: number) => {
    setFocusedBlockIndex(index);
  };

  const handleCommandSelection = (type: string) => {
    if (focusedBlockIndex === null) return;
    addNewBlock(type as BlockType['type'], focusedBlockIndex + 1);
    setIsCommandMenuVisible(false);
    setCommandFilter('');
    setFocusedBlockIndex(null);
  };

  // 📌 Utility: Add New Block
  const addNewBlock = (
    type: BlockType['type'],
    index: number,
    content = 'Write here!!',
  ) => {
    const newBlock = createBlock(type, content);
    addBlock(newBlock, index);
    setFocusedBlockIndex(index);
  };

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
  }, [blocks, focusedBlockIndex]);

  return (
    <div ref={editorRef} className="bg-dark-base">
      {/* 📌 Render Blocks */}
      {blocks.map((block, index) => (
        <div
          key={index}
          aria-label={`Editable block ${index}`}
          contentEditable
          onClick={() => handleBlockClick(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onBlur={(e) => handleInput(index, e)}
          className={`relative w-full outline-none border-none font-bold break-words
            ${block.type === 'header' ? 'text-dark-900 text-4xl' : 'text-dark-500 text-base'}
            before:absolute before:top-0 before:left-0 before:text-gray-500 before:opacity-50
            before:pointer-events-none empty:before:content-[attr(data-placeholder)]
          `}
          data-placeholder={
            block.type === 'header' ? 'Heading...' : 'Write something...'
          }
        ></div>
      ))}

      {/* 📌 Command Menu */}
      {isCommandMenuVisible && (
        <CommandMenu
          filter={commandFilter}
          onFilterChange={setCommandFilter}
          onSelect={handleCommandSelection}
        />
      )}
    </div>
  );
}
