import { BlockType } from '../../types/block.interface';

export const handleCopy = (
  e: React.ClipboardEvent<HTMLDivElement>,
  selectedBlocks: Set<number>,
  blocks: BlockType[],
  setCopiedBlocks: (blocks: BlockType[]) => void,
) => {
  e.preventDefault();
  if (selectedBlocks.size > 0) {
    const copied = Array.from(selectedBlocks).map((index) => blocks[index]);
    setCopiedBlocks(copied);
  }
};

export const handleCut = (
  e: React.ClipboardEvent<HTMLDivElement>,
  selectedBlocks: Set<number>,
  blocks: BlockType[],
  setCopiedBlocks: (blocks: BlockType[]) => void,
  updateBlocksWithNewSetOfBlocks: (blocks: BlockType[]) => void,
  setSelectedBlocks: (blocks: Set<number>) => void,
) => {
  e.preventDefault();
  if (selectedBlocks.size > 0) {
    const copied = Array.from(selectedBlocks).map((index) => blocks[index]);
    setCopiedBlocks(copied);

    const newBlocks = blocks.filter((_, index) => !selectedBlocks.has(index));
    updateBlocksWithNewSetOfBlocks(newBlocks);

    setSelectedBlocks(new Set());
  }
};

export const handlePaste = (
  e: React.ClipboardEvent<HTMLDivElement>,
  copiedBlocks: BlockType[],
  focusedBlockIndex: number | null,
  blocks: BlockType[],
  updateBlocksWithNewSetOfBlocks: (blocks: BlockType[]) => void,
) => {
  e.preventDefault();
  if (copiedBlocks.length > 0) {
    const pasteIndex = focusedBlockIndex !== null ? focusedBlockIndex + 1 : blocks.length;
    const newBlocks = [...blocks];
    newBlocks.splice(pasteIndex, 0, ...copiedBlocks);
    updateBlocksWithNewSetOfBlocks(newBlocks);
  }
};