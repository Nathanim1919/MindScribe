import { useState } from 'react';
import { BlockType } from '../types/block.interface';
import { createBlock } from '../components/utils/blockUtils';

// Hook to manage block state
export function useBlocks(initialBlocks: BlockType[] = []) {
  const [blocks, setBlocks] = useState<BlockType[]>(initialBlocks);

  // Add a new block to the list
  const addBlock = (block: BlockType, index?: number) => {
    const newBlock: BlockType = createBlock(block.type);

    if (index !== undefined) {
      if (index < 0 || index > blocks.length) {
        console.error('Invalid index:', index);
        return;
      }

      const newBlocks = [...blocks]; // Copy the blocks array
      newBlocks.splice(index, 0, newBlock); // Insert the new block at the specified index
      setBlocks(newBlocks);
    } else {
      const newBlocks = [...blocks, newBlock]; // Append to the end
      setBlocks(newBlocks);
    }
  };

  // Delete a block from the list by index
  const deleteBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const updateBlocksWithNewSetOfBlocks = (newBlocks: BlockType[]) => {
    setBlocks(newBlocks);
  };

  // Update a block by index
  const updateBlock = (index: number, updatedBlock: BlockType) => {
    setBlocks((prevBlocks) => {
      const newBlocks = prevBlocks.map((block, i) =>
        i === index ? { ...block, content: updatedBlock.content } : block,
      );

      return [...newBlocks];
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
    updateBlocksWithNewSetOfBlocks,
  };
}
