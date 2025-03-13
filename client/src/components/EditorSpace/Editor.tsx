import React, { useRef, useState, useEffect } from 'react';
import { useBlocks, useCommand } from '../../hooks';
import { CommandMenu } from './CommandMenu';
import { createBlock } from '../utils/blockUtils';
import { BlockType } from '../../types/block.interface';
import { HeaderBlock, ParagraphBlock } from './Blocks';

export function Editor() {
  const { blocks, addBlock, updateBlock, deleteBlock } = useBlocks([
    { type: 'header', content: 'Hey, How are you doing, buddy!' },
  ]);

  const {
    isCommandMenuVisible,
    setIsCommandMenuVisible,
    commandFilter,
    handleCommandSelect,
    setCommandFilter,
  } = useCommand(addBlock);

  const editorRef = useRef<HTMLDivElement>(null);
  const [focusedBlockIndex, setFocusedBlockIndex] = useState<number | null>(
    null,
  );

  // Get the cursor position in a contenteditable div
  const getCursorPosition = (element: HTMLElement): number => {
    const selection = window.getSelection(); // Get the selection, which is the cursor position
    if (!selection || selection.rangeCount === 0) return 0; // Return 0 if there is no selection or range(which is the cursor position)

    const range = selection.getRangeAt(0); // Get the range of the selection
    const preCaretRange = range.cloneRange(); // Clone the range, means copy the range
    preCaretRange.selectNodeContents(element); // Select the node contents of the element
    preCaretRange.setEnd(range.endContainer, range.endOffset); // Set the end of the range to the end of the selection
    return preCaretRange.toString().length; // Return the length of the range
  };

  // Spilit the content of a block at the cursor position
  const spliteContentAtCursor = (element: HTMLElement): [string, string] => {
    const cursorPosition = getCursorPosition(element); // Get the cursor position
    const content = element.innerText; // Get the content of the element
    return [content.slice(0, cursorPosition), content.slice(cursorPosition)]; // Return the content before and after the cursor position
  };

  // Focus the first block when the editor loads
  useEffect(() => {
    if (editorRef.current) {
      // firstBlockDiv is the first block in the editor, which is always a paragraph block
      const firstBlockDiv = editorRef.current.querySelector(
        '[contenteditable]',
      ) as HTMLDivElement;
      if (firstBlockDiv) {
        firstBlockDiv.focus(); // Focus the first block
        placeCaretAtEnd(firstBlockDiv); // Move the cursor to the end of the block
      }
    }
  }, []);

  // Helper function to place the caret at the end of a contenteditable div
  const placeCaretAtEnd = (element: HTMLElement) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false); // Collapse the range to the end
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  // Handle keydown events in the contenteditable div
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => {
    const selection = window.getSelection();
    const cursorPosition = selection?.anchorOffset || 0;
    const cursorLine = selection?.anchorNode?.parentElement;

    // if the user presses backspace at the beginning of a block, merge it with the previous block and remove the current block
    if (e.key === 'Backspace' && cursorPosition === 0) {
      e.preventDefault(); // Prevent default behavior (e.g., navigate to the previous page)

      if (index > 0) {
        const block = blocks[index];
        const previousBlock = blocks[index - 1];
        const updatedBlock = {
          ...previousBlock,
          content: `${previousBlock.content}${block.content}`,
        };
        updateBlock(index - 1, updatedBlock);
        // Remove the current block
        deleteBlock(index);
      }
    }

    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default behavior (new line)
      const blockDiv = e.currentTarget;
      const cursorPosition = getCursorPosition(blockDiv);
      const content = blockDiv.innerText;


      // Case 1: Block is empty or cursor is at the end
      if(content.length === 0 || cursorPosition === content.length){
        const newBlock = createBlock('paragraph', "new paragraph block");
        addBlock(newBlock, index + 1); // Insert the new block after the current block
        setFocusedBlockIndex(index + 1); // Set the focus to the new block
      }


      // Case 2: Cursor is at the beginning
      else if (cursorPosition === 0){
        const newBlock = createBlock('paragraph', "new paragraph block");
        addBlock(newBlock, index); // Insert the new block before the current block
        setFocusedBlockIndex(index); // Set the focus to the new block
      }  

      // Case 3: Cursor is in the middle
      else {
        const [firstPart, secondPart] = spliteContentAtCursor(blockDiv);

        // Update the current block with the first part
        updateBlock(index, { ...blocks[index], content: firstPart });

        // create new block with the second part
        const newBlock = createBlock('paragraph', secondPart);
        addBlock(newBlock, index + 1); // Insert the new block after the current block
        setFocusedBlockIndex(index + 1); // Set the focus to the new block
      }
    }

    if (
      e.key === '/' &&
      (cursorPosition === 0 ||
        cursorLine?.textContent?.[cursorPosition - 1] === ' ')
    ) {
      e.preventDefault(); // Show command menu if "/" is pressed
      setIsCommandMenuVisible(true);
      setFocusedBlockIndex(index);
    }
  };

  // Handle command selection
  const handleCommandSelection = (type: string) => {
    if (focusedBlockIndex === null) return;

    const newBlock = createBlock(type as BlockType['type'], 'Write here!!');
    // Insert the new block after the focused block or at the start of the editor if no block is focused
    addBlock(newBlock, focusedBlockIndex !== null ? focusedBlockIndex + 1 : 0);

    // const newBlock = createBlock(type as BlockType['type'], 'Write here!!');
    // addBlock(newBlock, focusedBlockIndex + 1); // Insert the new block after the focused block

    // Hide the command menu
    setIsCommandMenuVisible(false);
    setCommandFilter('');
    setFocusedBlockIndex(null);
  };

  // Handle input changes in a block
  const handleInput = (index: number, e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerText;
    console.log('The content is: ', content);
    const updatedBlock = { ...blocks[index], content };
    updateBlock(index, updatedBlock);
  };

 // Focus the newly added block
 useEffect(() => {
  if (focusedBlockIndex !== null && editorRef.current) {
    setTimeout(() => {
      const blockDivs = editorRef.current.querySelectorAll("[contenteditable]");
      if (blockDivs[focusedBlockIndex]) {
        const newBlockDiv = blockDivs[focusedBlockIndex] as HTMLDivElement;
        newBlockDiv.focus();
        placeCaretAtEnd(newBlockDiv);
      }
    }, 0);
  }
}, [blocks, focusedBlockIndex]);

  const renderBlockContent = (block: BlockType) => {
    switch (block.type) {
      case 'header':
        return <HeaderBlock {...block} />;
      case 'paragraph':
        return <ParagraphBlock {...block} />;
      case 'quote':
        return <blockquote>{block.content}</blockquote>;
      default:
        return <p>{block.content}</p>;
    }
  };

  return (
    <div ref={editorRef} className="bg-dark-200">
      {/* Render blocks */}
      {blocks.map((block, index) => {
        const renderedContent = renderBlockContent(block);
        console.log(renderedContent);
        return (
          <div
            key={index}
            aria-label={`Editable block ${index}`}
            contentEditable
            dangerouslySetInnerHTML={{ __html: block.content }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onBlur={(e) => handleInput(index, e)}
            style={{
              color: 'gray',
              textAlign: 'left',
              fontSize: `${block.type === 'header' ? 44 : 16}px`,
              padding: '8px',
              outline: 'none',
              border: 'none',
              width: '100%',
              overflowWrap: 'break-word',
            }}
            dir="ltr"
          ></div>
        );
      })}

      {/* Command menu */}
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
