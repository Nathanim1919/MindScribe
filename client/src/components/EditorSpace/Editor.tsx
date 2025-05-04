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
import { EditorSkeleton } from '../LoadingSkeletons/EntrieSkeleton';
import { useMatches } from '@tanstack/react-router';
import { Entry } from '../../types/entrie.interface';
import { useEntryContext } from '../../contexts/EntryContext';

export function Editor() {
  const {
    blocks,
    refMap,
    addBlock,
    setBlocks,
    updateBlock,
    deleteBlock,
    clearBlocks,
    updateCursorPosition,
  } = useBlockContext();

  const editorRef = useRef<HTMLDivElement>(null);
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);

  const cursorPosition = useRef<Record<string, number>>({});
  const [isCommandOptionVisible, setIsCommandOptionVisible] = useState(false);

  // console static data from the route
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1] || {};
  const { staticData } = currentMatch;
  const { intent } = staticData || {};
  const { params } = currentMatch;
  const entryId = params?.entryId;

  const { setEntries } = useEntryContext();

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

  useEffect(() => {
    if (editorRef.current) {
      const firstBlock = editorRef.current.querySelector(
        '[contenteditable]',
      ) as HTMLDivElement;
      if (firstBlock) {
        firstBlock.focus();
        placeCaretAtEnd(firstBlock);
        setFocusedBlockId(blocks[0]?.id || null);
      }
    }
  }, []);

  useEffect(() => {
    const storedEntries = localStorage.getItem('entries');
    if (storedEntries) {
      const parsed: Entry[] = JSON.parse(storedEntries);
      setEntries(parsed);
    }
  }, []);

 // Load entry on mount or when entryId changes
useEffect(() => {
  if (intent === 'view' && entryId) {
    const storedEntries = localStorage.getItem('entries');
    if (storedEntries) {
      const parsed: Entry[] = JSON.parse(storedEntries);
      const entry = parsed.find((entry) => entry.id === entryId);
      setBlocks(entry?.content || []);
      setFocusedBlockId(entry?.content[0]?.id || null);
    }
  } else {
    clearBlocks();
  }
}, [entryId, intent]);

// Save to localStorage when blocks change, but debounce
useEffect(() => {
  if (intent !== 'view' || !entryId) return;
  
  const handler = setTimeout(() => {
    const storedEntries = localStorage.getItem('entries');
    if (storedEntries) {
      const parsed: Entry[] = JSON.parse(storedEntries);
      const updatedEntries = parsed.map(entry => 
        entry.id === entryId ? { ...entry, content: blocks } : entry
      );
      localStorage.setItem('entries', JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
    }
  }, 500); // Debounce to avoid frequent writes

  return () => clearTimeout(handler);
}, [blocks, entryId, intent, setEntries]);
  

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

  const handleBlockClick = useCallback(
    (id: string) => {
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
    },
    [focusedBlockId, hideMenu],
  );

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

  const onAddButtonClick = (id: string) => {
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
      className="bg-light-50 relative dark:bg-dark-50 md:left-[-2rem] md:w-[95%] mx-auto h-[98vh] overflow-hidden overflow-y-auto md:mt-2 rounded-md border border-light-200 dark:border-dark-100"
    >
      <EditorToolbar />
      {/*  */}
      {/* <EditorSkeleton/> */}

      {/* 📌 Render Blocks */}
      <div className="relative w-full mx-auto md:px-4 pb-[4rem]">
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
