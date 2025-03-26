// utils/blockFactory.ts

import { BlockType, IHeaderBlock, IParagraphBlock, IQuoteBlock } from "../../types/block.interface";

export const createBlock = (type: BlockType['type'], content?: string): BlockType => {
  const id = generateId();
  
  switch (type) {
    case 'header':
      return {
        id,
        type: 'header',
        content,
        meta: { level: 1, spacing: 'large' }
      } as IHeaderBlock;
    case 'quote':
      return {
        id,
        type: 'quote',
        content,
        meta: { spacing: 'medium' }
      } as IQuoteBlock;
    case 'paragraph':
    default:
      return {
        id,
        type: 'paragraph',
        content,
        meta: { spacing: 'small' }
      } as IParagraphBlock;
  }
};

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};