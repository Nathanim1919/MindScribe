// Base interface for all block types

import { HeaderMeta, ParagraphMeta, QuoteMeta } from './meta.type';

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
  meta: HeaderMeta;
}

export interface IParagraphBlock extends IBaseBlock {
  type: 'paragraph';
  meta: ParagraphMeta;
}

export interface IQuoteBlock extends IBaseBlock {
  type: 'quote';
  meta?: QuoteMeta;
}

export interface ImageType {
  url: string;
  caption: string;
  alt: string;
  meta?: {
    width: number;
    height: number;
    alignment?: 'left' | 'center' | 'right';
  };
}

export interface IImageBlock {
  id: string;
  type: 'image';
  caption?: string;
  urls: ImageType[];
  prevId: string | null;
  nextId: string | null;
  meta?: {
    width: number;
    alignment?: 'left' | 'center' | 'right';
  };
}

// Union type of all possible blocks
export type BlockType =
  | IHeaderBlock
  | IParagraphBlock
  | IQuoteBlock
  | IImageBlock;

// type guard helpers
export const isHeaderBlock = (block: BlockType): block is IHeaderBlock =>
  block.type === 'header';
export const isParagraphBlock = (block: BlockType): block is IParagraphBlock =>
  block.type === 'paragraph';
export const isQuoteBlock = (block: BlockType): block is IQuoteBlock =>
  block.type === 'quote';
