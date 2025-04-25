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
  entry: ObjectId;
  nextId?: ObjectId; // Optional, as it may not always be present
  previousId?: ObjectId; // Optional, as it may not always be present
  position: number;
  metadata?:Record<string, any>;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
