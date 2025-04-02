import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import { CommandMenu } from './CommandMenu';
import { BlockType, isHeaderBlock } from '../../types/block.interface';
import { handleKeyPress } from '../utils/keyPressHandlers';
import { placeCaretAtEnd, placeCaretAtPosition } from '../utils/cursorUtils';
import { CommandOption } from './CommandOption';
import { useBlockContext } from '../../contexts/BlockContext';
import { renderBlock } from './Blocks';
import { useCommandMenu } from '../../hooks/useCommandMenu';
import { EditorToolbar } from './EditorToolbar';
import { EditorBlocks } from './EditorBlocks';

export function Editor() {
  const { blocks, addBlock, updateBlock, deleteBlock, updateCursorPosition } =
    useBlockContext();

  const editorRef = useRef<HTMLDivElement>(null);
  const [focusedBlockIndex, setFocusedBlockIndex] = useState<number | null>(
    null,
  );
  const cursorPosition = useRef<Record<string, number>>({});
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

  // 📌 Handlers: Input & Click Events
  // In Editor.tsx
  const handleBlockContainerClick = useCallback(
    (index: number | null) => {
      if (focusedBlockIndex === index) {
        if (isVisible) hideMenu();
        if (isCommandOptionVisible) setIsCommandOptionVisible(false);
      } else {
        setFocusedBlockIndex(index);
      }
    },
    [focusedBlockIndex, isVisible, isCommandOptionVisible, hideMenu],
  );

  const handleInput = useCallback(
    (index: number, e: React.FormEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const content = target.textContent || '';
      const blockId = blocks[index].id;

      // Save cursor position
      const selection = window.getSelection();
      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        cursorPosition.current[blockId] = range.startOffset;
      }

      // Only update if content changed
      if (content !== blocks[index].content) {
        updateBlock(index, { content });
      }
    },
    [blocks, updateBlock],
  );

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
      updateCursorPosition,
      addBlock,
      updateBlock,
      deleteBlock,
      setFocusedBlockIndex,
      showMenu,
      setFilter,
    });
  };

  useLayoutEffect(() => {
    if (focusedBlockIndex !== null && editorRef.current) {
      const blockId = blocks[focusedBlockIndex].id;
      const position = cursorPosition.current[blockId] || 0;

      const element = editorRef.current.querySelector(
        `[data-block-id="${blockId}"] [contenteditable]`,
      ) as HTMLElement;
      if (element) {
        placeCaretAtPosition(element, position);
      }
    }
  }, [blocks, focusedBlockIndex]);

  const handleBlockClick = (index: number) => {
    if (focusedBlockIndex !== index) {
      console.log('Focused Block Index:', focusedBlockIndex);
      console.log('cursorPosition:', cursorPosition);
      setFocusedBlockIndex(index);
      const blockId = blocks[index].id;
      const position = cursorPosition.current[blockId] || 0;


      useLayoutEffect(()=> {
        placeCaretAtPosition(
          editorRef.current?.querySelector(
            `[data-block-index="${index}"]`,
          ) as HTMLElement,
          position,
        );
        console.log("Cursor-Position Updated to: ", position);
      })
    }
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

  const onAddButtonClick = (index: number) => {
    if (focusedBlockIndex !== index) {
      setFocusedBlockIndex(index);
    }
    showMenu(index);
    setIsCommandOptionVisible(false);
  };

  useEffect(() => {
    console.log('Focused Block Index:', focusedBlockIndex);
  }, [focusedBlockIndex]);

  function getPlaceholder(block: BlockType, index: number): string {
    if (block.content?.trim() === '' && focusedBlockIndex !== index) {
      return '';
    }
    if (index === 0) {
      return block.content?.trim() ? '' : 'Untitled';
    }
    if (isHeaderBlock(block)) {
      return block.content?.trim() ? '' : 'Heading';
    }
    return index === 0 ? 'Start writing...' : 'Continue writing...';
  }

  console.log('It is Re-Rendering ...');

  const renderSingleBlock = useCallback(
    ({
      block,
      index,
      isFocused,
    }: {
      block: BlockType;
      index: number;
      isFocused: boolean;
    }) => {
      return renderBlock({
        block,
        index,
        isFocused,
        placeholder: getPlaceholder(block, index),
        onKeyDown: (e) => handleKeyDown(e, index),
        onClick: () => handleBlockClick(index),
        onInput: (e) => handleInput(index, e),
        onBlur: (e) => handleInput(index, e),
        onAddClick: () => onAddButtonClick(index),
        onDragClick: () => {
          setFocusedBlockIndex(index);
          setIsCommandOptionVisible(true);
          hideMenu();
        },
        // Only pass down what's absolutely necessary
        setFocusedBlockIndex,
        setIsCommandOptionVisible,
        hideMenu,
        showMenu,
      });
    },
    [
      handleKeyDown,
      handleInput,
      handleBlockClick,
      onAddButtonClick,
      hideMenu,
      showMenu,
    ],
  );

  return (
    <div
      ref={editorRef}
      className="bg-light-50 relative dark:bg-dark-50 max-w-[80%] mx-auto h-[90vh] overflow-hidden overflow-y-auto mt-2 rounded-md border border-light-200 dark:border-dark-100"
    >
      <EditorToolbar />

      {/* 📌 Render Blocks */}
      <div className="relative w-full max-w-4xl mx-auto px-4 pb-[4rem]">
        <EditorBlocks
          blocks={blocks}
          focusedBlockIndex={focusedBlockIndex}
          renderBlock={renderSingleBlock}
          onClickBlock={handleBlockContainerClick}
        />
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
      </div>
    </div>
  );
}
