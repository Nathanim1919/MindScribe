import { BlockType } from "../types/block.interface";

export const findIndexById = (blocks: BlockType[], id: string) =>
    blocks.findIndex((b) => b.id === id);
  