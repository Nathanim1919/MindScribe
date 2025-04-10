import { BlockType } from '../types/block.interface';

export function mergeBlockUpdate<T extends BlockType>(
  block: T,
  updates: Partial<T>,
): T {
  return {
    ...block,
    ...updates,
    meta: {
      ...block.meta,
      ...(updates.meta ?? {}),
    },
  };
}

export const applyBlockUpdate = <T extends BlockType>(
  block: T,
  updates: Partial<T>,
): T => ({
  ...block,
  ...mergeBlockUpdate(block, updates),
});
