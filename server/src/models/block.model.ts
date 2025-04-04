import mongoose from "mongoose";
import { Block, BlockType } from "../types/block.type";

const blockSchema = new mongoose.Schema<Block>({
  type: {
    type: String,
    enum: Object.values(BlockType),
    required: true,
  },
  entry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entry",
    required: true,
  },
  content: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Block = mongoose.model("Block", blockSchema);
export default Block;
