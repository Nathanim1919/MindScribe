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
import { useQuery } from '@tanstack/react-query';
import { fetchEntryById } from '../../services/entry.service';
import { useAutoSaveDraft } from '../../hooks/useAutoSaveDraft';
import { useInactivitySync } from '../../hooks/useInactivitySync';
import { useBeforeUnloadSync } from '../../hooks/useBeforeUnloadSync';

export function Editor() {
  const {
    blocks,
    refMap,
    addBlock,
    setBlocks,
    updateBlock,
    deleteBlock,
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

  const { setEntries, setSelectedEntryDetail } = useEntryContext();

  const {
    data: entryData,
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ['entry', entryId],
    queryFn: () => fetchEntryById(entryId),
    enabled: !!entryId,
  });



  useEffect(() => {
    if (entryData) {
      console.log('Entry data:', entryData);
      setSelectedEntryDetail(entryData); // keep this if needed elsewhere
      setBlocks(entryData.blocks);       // ✅ use entryData directly
    }
  }, [entryData]);

  
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
      console.log("The block being updated", block);

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
      alert('This is a draft editor. You can add blocks, edit them, and delete them. But you cannot publish or save the entry yet.');
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

  // Focus management
  useEffect(() => {
    if (editorRef.current && blocks?.length > 0 && focusedBlockId !== null) {
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

  function getPlaceholder(block: BlockType, id: string): string {
    if (block.type === 'image')
      return block.caption?.trim() ? '' : 'Add a caption...';
    if (block.content?.trim() === '' && focusedBlockId !== id) {
      return '';
    }

    const index = blocks?.findIndex((b) => b.id === id);
    if (index === 0) {
      return block.content?.trim() ? '' : 'Untitled';
    }
    if (isHeaderBlock(block)) {
      return block.content?.trim() ? '' : 'Heading';
    }
    return index === 0 ? 'Start writing...' : 'Continue writing...';
  }

  // useAutoSaveDraft(entryData); // 👈 Auto-save on any entry data changes
  // useInactivitySync(entryData); // 👈 Sync on inactivity
  // useBeforeUnloadSync(entryData); // 👈 Sync on before unload

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
      {isPending && intent === 'view' ? (
        <EditorSkeleton />
      ) : (
        <div className="relative w-full  mx-auto md:px-4 pb-[4rem]">
          <EditorBlocks
            blocks={blocks}
            focusedBlockId={focusedBlockId}
            renderBlock={renderSingleBlock}
            onClickBlock={handleBlockContainerClick}
            isCommandOptionVisible={isCommandOptionVisible}
          />

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
      )}
    </div>
  );
}
