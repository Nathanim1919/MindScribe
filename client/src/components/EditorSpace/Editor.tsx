import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { CommandMenu } from './CommandMenu';
// import { createBlock } from '../utils/blockUtils';
import { BlockType, isHeaderBlock } from '../../types/block.interface';
import { handleKeyPress } from '../utils/keyPressHandlers';
import { placeCaretAtEnd, placeCaretAtPosition } from '../utils/cursorUtils';
import { HiOutlineCalendarDateRange } from 'react-icons/hi2';
import { getCurrentDate } from '../utils/dateUtils';
import { CommandOption } from './CommandOption';
import { useBlockContext } from '../../contexts/BlockContext';
import { BiRedo, BiUndo } from 'react-icons/bi';
import { renderBlock } from './Blocks';
import { useCommandMenu } from '../../hooks/useCommandMenu';

export function Editor() {
  const { blocks, addBlock, updateBlock, deleteBlock } = useBlockContext();

  const editorRef = useRef<HTMLDivElement>(null);
  const [focusedBlockIndex, setFocusedBlockIndex] = useState<number | null>(
    null,
  );
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [isCommandOptionVisible, setIsCommandOptionVisible] = useState(false);

  const {
    isVisible,
    filter,
    setFilter,
    position,
    menuRef,
    showMenu,
    handleSelect,
    hideMenu,
  } = useCommandMenu(addBlock);

  // 📌 Lifecycle: Focus First Block on Load
  useEffect(() => {
    if (editorRef.current) {
      const firstBlock = editorRef.current.querySelector(
        '[contenteditable]',
      ) as HTMLDivElement;
      if (firstBlock) {
        firstBlock.focus();
        placeCaretAtEnd(firstBlock);
        setFocusedBlockIndex(0);
      }
    }
  }, []);

  // Focus management
  useEffect(() => {
    if (editorRef.current && blocks.length > 0 && focusedBlockIndex !== null) {
      const blockElement = editorRef.current.querySelector(
        `[data-block-index="${focusedBlockIndex}"]`,
      ) as HTMLElement;
      if (blockElement) {
        blockElement.focus();
      }
    }
  }, [focusedBlockIndex, blocks]);

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
      setFilter,
    });
  };

  // const handleBlur = (index: number, e: React.FormEvent<HTMLDivElement>) => {
  //   const content = e.currentTarget.innerText;
  //   updateBlock(index, { content });
  // };

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
    // get the content of the focused block
    const content = e.currentTarget.innerText;

    // Save cursor position
    updateBlock(index, { content });
    setCursorPosition(getCursorPosition(e.currentTarget));
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
  }, [blocks, focusedBlockIndex]);

  const handleBlockClick = (index: number) => {
    if (focusedBlockIndex !== index) {
      setFocusedBlockIndex(index);
      placeCaretAtPosition(
        editorRef.current?.querySelector(
          `[data-block-index="${index}"]`,
        ) as HTMLElement,
        cursorPosition,
      );
    }
    // setIsCommandMenuVisible(false);
    setIsCommandOptionVisible(false);
  };

  const getCurrentFocusedBlockElement = () => {
    if (focusedBlockIndex !== null && editorRef.current) {
      const blockDivs =
        editorRef.current?.querySelectorAll('[contenteditable]');
      const element = blockDivs[focusedBlockIndex] as HTMLElement;
      if (element !== undefined) {
        // Move cursor to the end
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false); // Move to end
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  };

  useLayoutEffect(() => {
    if (focusedBlockIndex !== null) {
      getCurrentFocusedBlockElement();
    }
  }, [focusedBlockIndex]); // Only runs when focus changes

  const handleAddButtonClicked = (index: number) => {
    showMenu(index);
  };

  const handleBlockContainerClick = (index: number | null) => {
    if (focusedBlockIndex === index) {
      if (isVisible) hideMenu();
      if (isCommandOptionVisible) setIsCommandOptionVisible(false);
    } else {
      getCurrentFocusedBlockElement();
      setFocusedBlockIndex(index);
    }
  };

  return (
    <div
      ref={editorRef}
      className="bg-light-50 relative dark:bg-dark-50 max-w-[80%] mx-auto h-[90vh] overflow-hidden overflow-y-auto mt-2 rounded-md border border-light-200 dark:border-dark-100"
    >
      <div className="sticky top-0 flex items-center justify-between text-light-500 dark:text-dark-500">
        <div className="flex items-center gap-1 px-4">
          <BiUndo className="w-6 h-6 p-[2px] rounded-full dark:bg-dark-100 cursor-pointer hover:dark:bg-dark-200 bg-light-100 hover:bg-light-200 border dark:border-dark-200 border-light-200" />
          <BiRedo className="w-6 h-6 p-[2px] rounded-full dark:bg-dark-100 cursor-pointer hover:dark:bg-dark-200 bg-light-100 hover:bg-light-200 border dark:border-dark-200 border-light-200" />
        </div>
        <span className="flex items-center font-extralight gap-1 p-3 py-2 border border-light-200 dark:border-dark-100 border-t-0 border-r-0 rounded-bl-2xl bg-light-100 dark:bg-dark-base text-[13px]">
          <HiOutlineCalendarDateRange /> {getCurrentDate()}
        </span>
      </div>
      {/* <div className='absolute w-full h-full grid place-items-center'>
        <EditorIntro/>
      </div> */}
      {/* 📌 Render Blocks */}
      <div className="relative w-[70%] m-auto">
        {blocks.map((block, index) => (
          <div
            key={index}
            data-block-index={index}
            className={`flex group w-full rounded-md cursor-text ${index === focusedBlockIndex ? 'bg-dark-100' : ''}`}
            onClick={() => handleBlockContainerClick(index)}
          >
            {renderBlock({
              block,
              index,
              isFocused: index === focusedBlockIndex,
              placeholder: getPlaceholder(block, index),
              onKeyDown: (e) => handleKeyDown(e, index),
              onClick: () => handleBlockClick(index),
              onInput: (e) => handleInput(index, e),
              onBlur: (e) => handleInput(index, e),
              onAddClick: () => {
                setFocusedBlockIndex(index);
                setIsCommandOptionVisible(false);
                handleAddButtonClicked(index);
              },
              onDragClick: () => {
                setFocusedBlockIndex(index);
                setIsCommandOptionVisible(true);
                hideMenu();
              },
            })}
          </div>
        ))}
        {/* 📌 Command Menu */}
        {isVisible && (
          <CommandMenu
            filter={filter}
            onSelect={handleSelect}
            position={position}
            menuRef={menuRef}
          />
        )}
        {isCommandOptionVisible && focusedBlockIndex !== null && (
          <CommandOption
            position={focusedBlockIndex}
            blocks={blocks}
            setIsCommandOptionVisible={setIsCommandOptionVisible}
          />
        )}
        {/* <TextFormatingMenu/> */}
      </div>
    </div>
  );
}

// Helper functions
function getPlaceholder(block: BlockType, index: number): string {
  if (isHeaderBlock(block)) {
    return block.content?.trim() ? '' : 'Heading';
  }
  return index === 0 ? 'Start writing...' : 'Continue writing...';
}
