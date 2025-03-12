import React, { useRef, useState, useEffect } from "react";
import { useBlocks, useCommand } from "../../hooks";
import { CommandMenu } from "./CommandMenu";
import { createBlock } from "../utils/blockUtils";
import { BlockType } from "../../types/block.interface";
import { HeaderBlock, ParagraphBlock } from "./Blocks";

export function Editor() {
  const { blocks, addBlock, updateBlock } = useBlocks([{ type: "header", content: "Hey, How are you doing, buddy!" }]); // Start with a default paragraph block
  const {
    isCommandMenuVisible,
    setIsCommandMenuVisible,
    commandFilter,
    setCommandFilter,
  } = useCommand(addBlock);

  const editorRef = useRef<HTMLDivElement>(null);
  const [focusedBlockIndex, setFocusedBlockIndex] = useState<number | null>(null);

  // Focus the first block when the editor loads
  useEffect(() => {
    if (editorRef.current) {
      // firstBlockDiv is the first block in the editor, which is always a paragraph block
      const firstBlockDiv = editorRef.current.querySelector("[contenteditable]") as HTMLDivElement;
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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    const selection = window.getSelection();
    const cursorPosition = selection?.anchorOffset || 0;
    const cursorLine = selection?.anchorNode?.parentElement;

    // Show command menu if "/" is typed at the start of a new line or after a space
    if (e.key === "/" && (cursorPosition === 0 || (cursorLine && cursorLine.textContent && cursorLine.textContent[cursorPosition - 1] === " "))) {
      e.preventDefault(); // Prevent the "/" from being typed
      setIsCommandMenuVisible(true);
      setFocusedBlockIndex(index);
    }
  };

  // Handle command selection
  const handleCommandSelection = (type: string) => {
    if (focusedBlockIndex === null) return;

    const newBlock = createBlock(type as BlockType["type"], "Write here!!");
    addBlock(newBlock, focusedBlockIndex + 1); // Insert the new block after the focused block

    // Hide the command menu
    setIsCommandMenuVisible(false);
    setCommandFilter("");
    setFocusedBlockIndex(null);
  };

  // Handle input changes in a block
  const handleInput = (index: number, e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerText;
    const updatedBlock = { ...blocks[index], content };
    updateBlock(index, updatedBlock);
  };

  useEffect(() => {
    if (focusedBlockIndex !== null && editorRef.current) {
      setTimeout(() => {
        const blockDivs = editorRef.current.querySelectorAll("[contenteditable]");
        if (blockDivs[focusedBlockIndex + 1]) {
          blockDivs[focusedBlockIndex + 1].focus();
          placeCaretAtEnd(blockDivs[focusedBlockIndex + 1]);
        }
      }, 0);
    }
  }, [blocks]);
  

  const renderBlockContent = (block: BlockType) => {
    switch (block.type) {
      case "header":
        return <HeaderBlock {...block} />;
      case "paragraph":
        return <ParagraphBlock {...block} />;
      case "quote":
        return <blockquote>{block.content}</blockquote>;
      case "list":
        return (
          <ul>
            {block.items?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      case "image":
        return <img src={block.url} alt={block.caption || "Image"} />;
      case "divider":
        return <hr />;
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
  contentEditable
  onKeyDown={(e) => handleKeyDown(e, index)}
  onBlur={(e) => handleInput(index, e)}
  style={{
    color: "gray",
    textAlign: "left",
  }}
  dir="ltr"
>
  {renderBlockContent(block)}  {/* ✅ Correct - Render JSX directly */}
</div>
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