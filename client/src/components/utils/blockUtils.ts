import { BlockType } from "../../types/block.interface";

// Validate a block
export function validateBlock(block: BlockType): boolean {
    if (!block.type) throw new Error("Block must have a type");
    // if (!block.content && block.type !== "divider") throw new Error("Block must have content");
    return true;
}


export const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };