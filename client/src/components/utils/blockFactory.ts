import { BlockType } from '../../types/block.interface';

export function createBlock<T extends BlockType['type']>(
  type: T,
  content?: string,
  meta?: Record<string, unknown>,
): Extract<BlockType, { type: T }> {
  if (type === 'header') {
    const { level, spacing } = meta!;
    return {
      id: generateId(),
      type: 'header',
      content,
      meta: { level, spacing },
    } as Extract<BlockType, { type: T }>;
  } else if (type === 'paragraph') {
    return {
      id: generateId(),
      type: 'paragraph',
      content,
    } as Extract<BlockType, { type: T }>;
  } else if (type === 'quote') {
    return {
      id: generateId(),
      type: 'quote',
      content,
    } as Extract<BlockType, { type: T }>;
  } 
  else if (type === 'image') {
    return {
      id: generateId(),
      type: 'image',
      url:content, // can be a URL or empty initially
      caption: 'this is image caption',
      meta: {
        // alt: meta?.alt || '',
        width: meta?.width || 'auto',
      },
    } as Extract<BlockType, { type: T }>;
  }
  
  else {
    throw new Error(`Unsupported block type: ${type}`);
  }
}

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
