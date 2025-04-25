import mongoose from "mongoose";
import { BlockModel } from "./block.model";

const ParagraphBlockSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

export const ParagraphBlock = BlockModel.discriminator(
  "paragraph",
  ParagraphBlockSchema
);
