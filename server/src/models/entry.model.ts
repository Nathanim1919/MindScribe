import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  blocks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sentiment: {
    type: String,
    name: String,
    emoji: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



const Entry = mongoose.model("Entry", EntrySchema);
export default Entry;