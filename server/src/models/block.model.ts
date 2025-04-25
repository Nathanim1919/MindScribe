// models/block.model.ts
import mongoose from "mongoose";

const baseOptions = {
  discriminatorKey: "type",
  timestamps: true,
};

const BaseBlockSchema = new mongoose.Schema(
  {
    entry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entry",
      required: true,
    },
    prevId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
      default: null,
    },
    nextId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
      default: null,
    },
    position: {
      type: Number,
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    }    
  },
  baseOptions
);

const BlockModel = mongoose.model("Block", BaseBlockSchema);
