import { BlockType } from "./block.interface";

interface Entry {
  _id: string;
  title: string;
  description?: string;
  blocks: BlockType[];
  createdAt: string;
  updatedAt: string;
  mood: string;
}


type EntryMap = Record<string, Entry>;
export type { Entry, EntryMap };