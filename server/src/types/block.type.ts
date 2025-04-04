import { ObjectId } from "mongoose";

export enum BlockType {
  TEXT = "text",
  HEADING_1 = "heading1",
  HEADING_2 = "heading2",
  HEADING_3 = "heading3",
  QUOTE = "quote",
}

export type Block = {
  type: BlockType;
  entry: ObjectId; // Assuming entry is a string, adjust as necessary
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
