import { BlockType } from "./block.interface";

export type EntryType = {
    id: string;
    title: string;
    description?: string;
    content: BlockType[];
    createdAt: string;
    updatedAt: string;
    mood: string;
  };


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