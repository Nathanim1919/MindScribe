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

// export interface NonEditableBlock {
//   type:"nonEditable"
// }

// Interface for all block types
export type BlockType =
  | IHeaderBlock
  | IParagraphBlock
  | IQuoteBlock
  // | NonEditableBlock
