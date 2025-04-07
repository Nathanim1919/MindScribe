// Base interface for all block types

export interface IBaseBlock {
  id: string; // Unique identifier for the block
  type: string; // Type of the block (e.g., "paragraph", "quote", "header")
  content?: string; // Content of the block
  prevId: string | null;
  nextId: string | null;
  meta?: Record<string, unknown>; // Additional metadata for the block
}

// Specific block types
export interface IHeaderBlock extends IBaseBlock {
  type: 'header'; // Type of the block
  meta: {
    level: 1 | 2 | 3; // Level of the header (1 for h1, 2 for h2, etc.)
    spacing: 'large';
  };
}

export interface IParagraphBlock extends IBaseBlock {
  type: 'paragraph';
  meta?: {
    spacing?: 'small' | 'medium';
  };
}

export interface IQuoteBlock extends IBaseBlock {
  type: 'quote';
  meta?: {
    spacing?: 'small' |'medium' | 'large';
  };
}


// Union type of all possible blocks
export type BlockType = IHeaderBlock | IParagraphBlock | IQuoteBlock;

// type guard helpers
export const isHeaderBlock = (block: BlockType): block is IHeaderBlock =>
  block.type === 'header';
export const isParagraphBlock = (block: BlockType): block is IParagraphBlock =>
  block.type === 'paragraph';
export const isQuoteBlock = (block: BlockType): block is IQuoteBlock =>
  block.type === 'quote';
