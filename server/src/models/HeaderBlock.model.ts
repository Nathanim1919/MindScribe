// models/HeaderBlock.ts
import mongoose from "mongoose";
import { BlockModel } from "./block.model.ts";

const HeaderBlockSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

export const HeaderBlock = BlockModel.discriminator(
  "header",
  HeaderBlockSchema
);
