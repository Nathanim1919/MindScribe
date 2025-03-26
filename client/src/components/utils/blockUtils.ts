import { BlockType } from "../../types/block.interface";

// Validate a block
export function validateBlock(block: BlockType): boolean {
    if (!block.type) throw new Error("Block must have a type");
    // if (!block.content && block.type !== "divider") throw new Error("Block must have content");
    return true;
}
