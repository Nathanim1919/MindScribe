import mongoose from "mongoose";
import { BlockModel } from "./block.model";

const QuoteBlockSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

export const QuoteBlock = BlockModel.discriminator("quote", QuoteBlockSchema);
