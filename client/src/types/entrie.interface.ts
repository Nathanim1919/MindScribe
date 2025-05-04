import { BlockType } from "./block.interface";

interface Entry {
  id: string;
  title: string;
  description?: string;
  content: BlockType[];
  createdAt: string;
  updatedAt: string;
  mood: string;
}


type EntryMap = Record<string, Entry>;
export type { Entry, EntryMap };