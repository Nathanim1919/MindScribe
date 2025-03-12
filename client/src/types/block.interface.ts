// Base interface for all block types
export interface IBlock {
  type: string; // Type of the block (e.g., "paragraph", "quote", "header")
  content?: string; // Content of the block
}

// Interface for header blocks
export interface IHeaderBlock extends IBlock {
  type: 'header'; // Type of the block
  level?: number; // Level of the header (1 for h1, 2 for h2, etc.)
}

// Interface for paragraph blocks
export interface IParagraphBlock extends IBlock {
  type: 'paragraph'; // Type of the block
}

// Interface for quote blocks
export interface IQuoteBlock extends IBlock {
  type: 'quote'; // Type of the block
}

// Interface for list blocks
export interface IListBlock extends IBlock  {
  type: 'list';
  style: 'bullet' | 'numbered';
  items: string[];
}

// Interface for image blocks
export interface IImageBlock extends IBlock {
  type: 'image'; // Type of the block
  url: string; // URL of the image
  caption?: string; // Caption for the image
}

// Interface for divider blocks
export interface IDividerBlock extends IBlock {
  type: 'divider'; // Type of the block
}

// Interface for all block types
export type BlockType =
  | IHeaderBlock
  | IParagraphBlock
  | IQuoteBlock
  | IListBlock
  | IImageBlock
  | IDividerBlock;
