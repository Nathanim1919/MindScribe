import { useState } from "react";
import { useBlocks } from "./useBlocks";
import { BlockType } from "../types/block.interface";

export function useCommandOption(index: number | null, blocks: BlockType[]) {
  const [isCommandOptionVisible, setIsCommandOptionVisible] = useState(false);
  const { updateBlocksWithNewSetOfBlocks, addBlock } = useBlocks(blocks);

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
  
      let parsedBlock;
      try {
        parsedBlock = JSON.parse(clipboardData);
      } catch (error) {
        console.error("Clipboard data is not valid JSON:", clipboardData);
        return;
      }
  
      if (parsedBlock && parsedBlock.type && parsedBlock.content) {
        const newBlock = { ...parsedBlock, id: Date.now() }; // Assign a new ID
        console.log("Update the block at index: ", index)
        // updateBlock(index, newBlock);
        blocks.forEach((block, i) =>{
          if (i === index){
            block.type = newBlock.type;
            block.content = newBlock.content;
          }
        })
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

  const handleDuplicate = () => {
    if (index !== null && blocks[index]) {
      // ✅ Create a deep copy with a unique ID
      const duplicatedBlock = {
        ...blocks[index],
        id: Date.now(), // Ensuring a unique identifier
      };
  
      console.log("Duplicating block:", duplicatedBlock);
  
      // ✅ Create a new array with the duplicated block inserted
      const newBlocks = [...blocks.slice(0, index + 1), duplicatedBlock, ...blocks.slice(index + 1)];
  
      // ✅ Update state properly
      updateBlocksWithNewSetOfBlocks(newBlocks);
      console.log("Updated blocks after duplication:", newBlocks);
    } else {
      console.warn("No block found at index:", index);
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
