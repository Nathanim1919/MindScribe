import { useState } from 'react';
import { BlockType } from '../types/block.interface';
import { createBlock } from '../components/utils/blockUtils';

// Hook to manage block state
export function useBlocks(initialBlocks: BlockType[] = []) {
  const [blocks, setBlocks] = useState<BlockType[]>(initialBlocks);

  // Add a new block to the list
  const addBlock = (
    type: BlockType['type'],
    content: string = '',
    additionalProps: any = {},
  ) => {
    const newBlock = createBlock(type, content, additionalProps);
    setBlocks([...blocks, newBlock]);
  };

  // Delete a block from the list by index
  const deleteBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  // Update a block by index
  const updateBlock = (index: number, newBlock: BlockType) => {
    const updatedBlocks = blocks.map((block, i) =>
      i === index ? newBlock : block,
    );
    setBlocks(updatedBlocks);
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
