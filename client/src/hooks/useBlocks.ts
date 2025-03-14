import { useState } from 'react';
import { BlockType } from '../types/block.interface';
import { createBlock } from '../components/utils/blockUtils';

// Hook to manage block state
export function useBlocks(initialBlocks: BlockType[] = []) {
  const [blocks, setBlocks] = useState<BlockType[]>(initialBlocks);

  // Add a new block to the list
  const addBlock = (block: BlockType, index?: number) => {
    const { type, content, ...additionalProps } = block;
    console.log(type, content, additionalProps);
    const newBlock: BlockType = createBlock(block.type, content);
  
    if (index !== undefined) {
      console.log("Index is: ", index);
      if (index < 0 || index > blocks.length) {
        console.error("Invalid index:", index);
        return;
      }
      const newBlocks = [...blocks]; // Copy the blocks array
      newBlocks.splice(index, 0, newBlock); // Insert the new block at the specified index
      setBlocks(newBlocks);
    } else {
      console.log("Index is not defined, appending to the end");
      setBlocks([...blocks, newBlock]);
    }
  };

  // Delete a block from the list by index
  const deleteBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  // Update a block by index
 const updateBlock = (index: number, updatedBlock: BlockType) => {
  setBlocks((prevBlocks) => {
    const newBlocks = [...prevBlocks]; // Create a new array to trigger re-render
    newBlocks[index] = updatedBlock; // Update the specific block
    return newBlocks;
  });
};

  // Reorder blocks
  const reorderBlocks = (startIndex: number, endeIndex: number) => {
    const newBlocks = Array.from(blocks);
    const [removed] = newBlocks.splice(startIndex, 1);
    newBlocks.splice(endeIndex, 0, removed);
    setBlocks(newBlocks);
  };

  return {
    blocks,
    addBlock,
    deleteBlock,
    updateBlock,
    reorderBlocks,
  };
}
