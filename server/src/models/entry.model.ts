import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    // required: true,
    trim: true,
  },
  blocks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
    },
  ],
  isFavorite: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  sentiment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sentiment",
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Entry = mongoose.model("Entry", EntrySchema);
export default Entry;
