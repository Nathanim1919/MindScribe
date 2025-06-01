import { BlockType, ImageType } from '../../types/block.interface';
import { generateId } from './blockUtils';

export function createBlock<T extends BlockType['type']>(
  type: T,
  content?: string | ImageType[],
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
    // Ensure content is an array of ImageType
    const imageUrls: ImageType[] = Array.isArray(content) ? content : [{
      url: content || '', // fallback to empty string if content is not provided
      caption: 'Default caption', // default caption
      alt: 'Image', // default alt text
      meta: {
        width: (meta?.width as number), // default width
        height: (meta?.height as number), // default height
        alignment: (meta?.alignment as 'left' | 'center' | 'right') || 'center', // default alignment
      },
    }];

    
    return {
      id: generateId(),
      type: 'image',
      urls: imageUrls,
      caption: 'this is image caption', // default caption
      meta: {
        width: (meta?.width as number | string) || 'auto',
        alignment: (meta?.alignment as 'left' | 'center' | 'right') || 'center', // default alignment
      },
    } as Extract<BlockType, { type: T }>;


  }
  
  else {
    throw new Error(`Unsupported block type: ${type}`);
  }
}


