import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useBlocks, useCommand } from '../../hooks';
import { CommandMenu } from './CommandMenu';
import { createBlock } from '../utils/blockUtils';
import { BlockType } from '../../types/block.interface';
import { Block } from './Block';
import { handleCopy, handleCut, handlePaste } from '../utils/selectionUtils';
import { handleKeyPress } from '../utils/keyPressHandlers';
import { placeCaretAtEnd, placeCaretAtPosition } from '../utils/cursorUtils';
import { HiOutlineCalendarDateRange } from 'react-icons/hi2';
import { TbDragDrop2 } from 'react-icons/tb';

export function Editor() {
  const {
    blocks,
    addBlock,
    updateBlock,
    deleteBlock,
    updateBlocksWithNewSetOfBlocks,
  } = useBlocks([
    {
      type: 'header',
      content: 'Hello, Nathanim, What are you up to...',
    },
    {
      type: 'paragraph',
      content:
        'Today, I finally decided to take a leap of faith. I resigned from my job to start my own business. It’s scary, but I know this is what I want. Here’s to new beginnings!',
    },
    {
      type: 'paragraph',
      content:
        'It rained all day. I sat by the window with a cup of coffee, watching the rain drops',
    },
  ]);

  const {
    isCommandMenuVisible,
    setIsCommandMenuVisible,
    commandFilter,
    setCommandFilter,
  } = useCommand(addBlock);

  const editorRef = useRef<HTMLDivElement>(null);
  const [selectedBlocks, setSelectedBlocks] = useState<Set<number>>(new Set());
  const [copiedBlocks, setCopiedBlocks] = useState<BlockType[]>([]);
  const [isFocused, setIsFocused] = useState(false); // Track focus state
  const [focusedBlockIndex, setFocusedBlockIndex] = useState<number | null>(
    null,
  );
  const [cursorPosition, setCursorPosition] = useState<number>(0);

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
    handleKeyPress(e, index, {
      blocks,
      addBlock,
      updateBlock,
      deleteBlock,
      setFocusedBlockIndex,
      setIsCommandMenuVisible,
      setCommandFilter,
    });
  };

  const handleBlur = (index: number, e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerText;
    updateBlock(index, { ...blocks[index], content });
  };

  const getCursorPosition = (element: HTMLElement): number => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.startContainer, range.startOffset);

    return preCaretRange.toString().length; // Returns the correct cursor position
  };

  // 📌 Handlers: Input & Click Events
  const handleInput = (index: number, e: React.FormEvent<HTMLDivElement>) => {
    setIsCommandMenuVisible(false);
    const content = e.currentTarget.innerText;

    // Save cursor position
    setCursorPosition(getCursorPosition(e.currentTarget));
    updateBlock(index, { ...blocks[index], content });
  };

  useLayoutEffect(() => {
    if (focusedBlockIndex !== null && editorRef.current) {
      const blockDivs = editorRef.current.querySelectorAll('[contenteditable]');
      if (blockDivs[focusedBlockIndex]) {
        placeCaretAtPosition(
          blockDivs[focusedBlockIndex] as HTMLElement,
          cursorPosition,
        );
      }
    }
  }, [blocks]); // Runs after every block update

  const handleBlockClick = (index: number) => {
    if (focusedBlockIndex !== index) {
      setFocusedBlockIndex(index);
      setIsCommandMenuVisible(false);
    }
  };

  useLayoutEffect(() => {
    if (focusedBlockIndex !== null) {
      console.log('🔥 Focused Block Index:', focusedBlockIndex);
      const blockDivs =
        editorRef.current?.querySelectorAll('[contenteditable]');
      if (blockDivs && blockDivs[focusedBlockIndex]) {
        const element = blockDivs[focusedBlockIndex] as HTMLElement;
        element.focus();

        // Move cursor to the end
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false); // Move to end
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }, [focusedBlockIndex]); // Only runs when focus changes

  const handleCommandSelection = (type: string) => {
    if (focusedBlockIndex === null) return;
    if (type === 'header') {
      addNewBlock(type as BlockType['type'], focusedBlockIndex + 1, 'Header');
    } else {
      addNewBlock(type as BlockType['type'], focusedBlockIndex);
    }
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

  const activeBlockInformation = (index: number) => {
    const block = blocks[index];

    // For header blocks, show placeholder ("Head 1" or custom value) if empty.
    if (block.type === 'header') {
      return block.content?.trim() === ''
        ? 'Hello, Nathanim, What are up to...'
        : '';
    }

    // For other blocks, only show placeholder if this block is focused and empty.
    if (focusedBlockIndex === index && block.content?.trim() === '') {
      return 'Write something, press "/" for commands';
    }

    return '';
  };

  return (
    <div
      onCopy={(e) => handleCopy(e, selectedBlocks, blocks, setCopiedBlocks)}
      onCut={(e) =>
        handleCut(
          e,
          selectedBlocks,
          blocks,
          setCopiedBlocks,
          updateBlocksWithNewSetOfBlocks,
          setSelectedBlocks,
        )
      }
      onPaste={(e) =>
        handlePaste(
          e,
          copiedBlocks,
          focusedBlockIndex,
          blocks,
          updateBlocksWithNewSetOfBlocks,
        )
      }
      ref={editorRef}
      className="bg-light-50 dark:bg-dark-50 h-[90vh] overflow-hidden overflow-y-auto mt-2 rounded-md border border-light-200 dark:border-dark-100"
    >
      <div className="sticky top-0 p-4 flex items-center justify-between text-light-500 dark:text-dark-500">
        <span className="flex items-center gap-1 font-extralight text-[13px]">
          <HiOutlineCalendarDateRange /> Jan 25, 2025
        </span>
        <span>Save</span>
      </div>
      {/* 📌 Render Blocks */}
      <div className="relative w-[70%] m-auto">
        {blocks.map((block, index) => (
          <div
            key={index}
            data-block-index={index}
            className="flex  gap-2 group"
          >
            {block?.content !== '' && (
              <TbDragDrop2 className="opacity-0 group-hover:opacity-100 dark:text-dark-400 cursor-grab text-2xl" />
            )}
            <Block
              key={index}
              index={index}
              block={{ ...block }} // Force new reference
              isSelected={selectedBlocks.has(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => handleBlockClick(index)}
              onInput={(e) => handleInput(index, e)}
              onBlur={(e) => handleBlur(index, e)}
              placeholder={activeBlockInformation(index)}
            />
          </div>
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
