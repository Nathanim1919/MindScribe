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
  const {
    blocks,
    refMap,
    addBlock,
    updateBlock,
    deleteBlock,
    updateCursorPosition,
  } = useBlockContext();

  const editorRef = useRef<HTMLDivElement>(null);
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);

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
  } = useCommandMenu(addBlock, refMap);

  // 📌 Handlers: Input & Click Events
  // In Editor.tsx
  const handleBlockContainerClick = useCallback(
    (blockId: string | null) => {
      if (focusedBlockId === blockId) {
        if (isVisible) hideMenu();
        if (isCommandOptionVisible) setIsCommandOptionVisible(false);
      } else {
        setFocusedBlockId(blockId);
      }
    },
    [focusedBlockId, isVisible, isCommandOptionVisible, hideMenu],
  );

  const handleCursorPosition = useCallback((id: string | null) => {
    if (id && refMap.has(id)) {
      const element = refMap.get(id)?.current;
      if (element) {
        const position = cursorPosition.current[id];
        if (position !== undefined) {
          placeCaretAtPosition(element, position);
        } else {
          placeCaretAtEnd(element);
        }
      }
    }
  }, [refMap]);

  const handleInput = useCallback(
    (blockId: string, e: React.FormEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const content = target.textContent || '';

      // Save cursor position
      const selection = window.getSelection();
      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        cursorPosition.current[blockId] = range.startOffset;
      }

      const block = blocks.find((block) => block.id === blockId);

      // Only update if content changed
      if (content !== block?.content) {
        updateBlock(blockId, { content });
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
        setFocusedBlockId(blocks[0].id);
        // Set initial cursor position
      }
    }
  }, []);

  // Focus management
  useEffect(() => {
    if (editorRef.current && blocks.length > 0 && focusedBlockId !== null) {
      const targetEl = refMap.get(focusedBlockId)?.current;
      if (targetEl) {
        targetEl.focus();
      }
    }
  }, [focusedBlockId, blocks]);

  // 📌 Handlers: Key Press Events
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    id: string,
  ) => {
    handleKeyPress(e, id, {
      blocks,
      updateCursorPosition,
      addBlock,
      updateBlock,
      deleteBlock,
      setFocusedBlockId,
      showMenu,
      setFilter,
      refMap,
    });
  };

  //TODO:  what if use it in block level??
  useLayoutEffect(() => {
    if (focusedBlockId !== null && editorRef.current) {
      const position = cursorPosition.current[focusedBlockId] || 0;

      const element = editorRef.current.querySelector(
        `[data-block-id="${focusedBlockId}"] [contenteditable]`,
      ) as HTMLElement;
      if (element) {
        placeCaretAtPosition(element, position);
      }
    }
  }, [blocks, focusedBlockId]);

  const handleBlockClick = useCallback((id: string) => {
    // Save selection before any state changes
    const selection = window.getSelection();
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);
      cursorPosition.current[id] = range.startOffset;
    }
  
    if (focusedBlockId !== id) {
      setFocusedBlockId(id);
    }
    setIsCommandOptionVisible(false);
    hideMenu();
  }, [focusedBlockId, hideMenu]);

  const getCurrentFocusedBlockElement = useCallback(() => {
    if (focusedBlockId !== null) {
      const element = refMap.get(focusedBlockId)?.current;
      if (element) {
        // Only place caret if we have a saved position
        const position = cursorPosition.current[focusedBlockId];
        if (position !== undefined) {
          placeCaretAtPosition(element, position);
        } else {
          placeCaretAtEnd(element);
        }
      }
    }
  }, [focusedBlockId, refMap]);

  useLayoutEffect(() => {
    if (focusedBlockId !== null) {
      const element = refMap.get(focusedBlockId)?.current;
      if (element) {
        // Focus the element
        element.focus();
        
        // Only restore position if we have one saved
        const position = cursorPosition.current[focusedBlockId];
        if (position !== undefined) {
          requestAnimationFrame(() => placeCaretAtPosition(element, position));
        }
      }
    }
  }, [focusedBlockId, refMap]);

  const onAddButtonClick = (id: string | null) => {
    if (focusedBlockId !== id) {
      setFocusedBlockId(id);
    }
    showMenu(id);
    setIsCommandOptionVisible(false);
  };

  useEffect(() => {
    console.log('Focused Block Index:', focusedBlockId);
  }, [focusedBlockId]);

  function getPlaceholder(block: BlockType, id: string): string {
    if (block.type === 'image') 
      return block.caption?.trim() ? '' : 'Add a caption...';
    if (block.content?.trim() === '' && focusedBlockId !== id) {
      return '';
    }

    const index = blocks.findIndex((b) => b.id === id);
    if (index === 0) {
      return block.content?.trim() ? '' : 'Untitled';
    }
    if (isHeaderBlock(block)) {
      return block.content?.trim() ? '' : 'Heading';
    }
    return index === 0 ? 'Start writing...' : 'Continue writing...';
  }

  console.log('It is Re-Rendering ...');

  const handleImageReplace = (file: File, id: string) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      updateBlock(id, {
        url: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };
  

  const renderSingleBlock = useCallback(
    ({
      block,
      id,
      isFocused,
    }: {
      block: BlockType;
      id: string;
      isFocused: boolean;
    }) => {
      return renderBlock({
        block,
        id,
        isFocused,
        placeholder: getPlaceholder(block, id),
        onKeyDown: (e) => handleKeyDown(e, id),
        onClick: () => handleBlockClick(id),
        onInput: (e) => handleInput(id, e),
        onBlur: (e) => handleInput(id, e),
        onAddClick: () => onAddButtonClick(id),
        onDragClick: () => {
          setFocusedBlockId(id);
          setIsCommandOptionVisible(true);
          hideMenu();
        },
        setFocusedBlockId,
        setIsCommandOptionVisible,
        hideMenu,
        showMenu,

        onImageReplace: (file: File) => handleImageReplace(file, id),
        onRemove: () => {
          deleteBlock(id);
          setFocusedBlockId(null);
          setIsCommandOptionVisible(false);
        }
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
      className="bg-light-50 relative dark:bg-dark-50 left-[-2rem] w-[95%] mx-auto h-[98vh] overflow-hidden overflow-y-auto mt-2 rounded-md border border-light-200 dark:border-dark-100"
    >
      <EditorToolbar />

      {/* 📌 Render Blocks */}
      <div className="relative w-full max-w-4xl mx-auto px-4 pb-[4rem]">
        <EditorBlocks
          blocks={blocks}
          focusedBlockId={focusedBlockId}
          renderBlock={renderSingleBlock}
          onClickBlock={handleBlockContainerClick}
          isCommandOptionVisible={isCommandOptionVisible}
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
        {isCommandOptionVisible && (
          <CommandOption
            id={focusedBlockId}
            blocks={blocks}
            setIsCommandOptionVisible={setIsCommandOptionVisible}
          />
        )}
      </div>
    </div>
  );
}
