import { useState } from "react";
import { useBlocks } from "./useBlocks";

export function useCommandOption(index: number | null) {
  const [isCommandOptionVisible, setIsCommandOptionVisible] = useState(false);
  const { blocks, updateBlocksWithNewSetOfBlocks } = useBlocks();

  console.log("All blocks:", blocks);
console.log("Trying to access index:", index);


  // **Copy Function**
  const handleCopy = () => {
    if (index !== null && blocks[index]) {
      const block = blocks[index];
  
      // Convert to JSON
      const blockData = JSON.stringify(block);
  
      // ✅ Debugging
      console.log("Copying block:", block);
  
      // Copy to clipboard
      navigator.clipboard
        .writeText(blockData)
        .then(() => console.log("Block copied successfully!"))
        .catch((err) => console.error("Failed to copy:", err));
    } else {
      console.warn("No block found at index:", index);
    }
  
    setIsCommandOptionVisible(false);
  };
  

  const handlePaste = async () => {
    try {
      const clipboardData = await navigator.clipboard.readText();
      console.log("Clipboard raw data:", clipboardData); // ✅ Debug
  
      // ✅ Check if the clipboard contains valid JSON
      let parsedBlock;
      try {
        parsedBlock = JSON.parse(clipboardData);
      } catch (error) {
        console.error("Clipboard data is not valid JSON:", clipboardData);
        return;
      }
  
      // ✅ Ensure parsed block has correct structure
      if (parsedBlock && parsedBlock.type && parsedBlock.content) {
        const newBlock = { ...parsedBlock, id: Date.now() }; // Assign a new ID
        updateBlocksWithNewSetOfBlocks([...blocks, newBlock]);
        console.log("Pasted block:", newBlock);
      } else {
        console.warn("Invalid block structure:", parsedBlock);
      }
    } catch (err) {
      console.error("Failed to paste:", err);
    }
  
    setIsCommandOptionVisible(false);
  };
  

  // **Cut Function (Copy & Remove)**
  const handleCut = () => {
    if (index !== null && blocks[index]) {
      const block = blocks[index];

      // Copy first
      navigator.clipboard
        .writeText(JSON.stringify(block))
        .then(() => {
          // Remove block after copying
          const newBlocks = blocks.filter((_, i) => i !== index);
          updateBlocksWithNewSetOfBlocks(newBlocks);
          console.log("Block cut:", block);
        })
        .catch((err) => console.error("Failed to cut:", err));
    }
    setIsCommandOptionVisible(false);
  };

  // **Delete Function**
  const handleDelete = () => {
    if (index !== null) {
      const newBlocks = blocks.filter((_, i) => i !== index);
      updateBlocksWithNewSetOfBlocks(newBlocks);
      console.log("Deleted block at index:", index);
    }
    setIsCommandOptionVisible(false);
  };

  // **Undo Functionality (Future Enhancement)**
  const handleUndo = () => {
    console.log("Undo action (not implemented yet)");
    setIsCommandOptionVisible(false);
  };

  // **Redo Functionality (Future Enhancement)**
  const handleRedo = () => {
    console.log("Redo action (not implemented yet)");
    setIsCommandOptionVisible(false);
  };

  // **Duplicate Function**
  const handleDuplicate = () => {
    if (index !== null && blocks[index]) {
      const duplicatedBlock = { ...blocks[index], id: Date.now() };
      const newBlocks = [...blocks];
      newBlocks.splice(index + 1, 0, duplicatedBlock); // Insert after the original

      updateBlocksWithNewSetOfBlocks(newBlocks);
      console.log("Duplicated block:", duplicatedBlock);
    }
    setIsCommandOptionVisible(false);
  };

  return {
    isCommandOptionVisible,
    setIsCommandOptionVisible,
    handleCopy,
    handlePaste,
    handleCut,
    handleDelete,
    handleUndo,
    handleRedo,
    handleDuplicate,
  };
}
