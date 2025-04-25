// models/HeaderBlock.ts
import mongoose from "mongoose";
import { BlockModel } from "./block.model";

const HeaderBlockSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    enum: [1, 2, 3], // Assuming you only want levels 1, 2, and 3
  },
});

export const HeaderBlock = BlockModel.discriminator(
  "header",
  HeaderBlockSchema
);
