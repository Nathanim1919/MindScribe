import mongoose, { Schema } from "mongoose";

const sentimentSchema = new Schema({
  lable: {
    type: String,
    required: true,
    trim: true,
  },
  emoji: {
    type: String,
    required: true,
    trim: true,
  },
});

const Sentiment = mongoose.model("Sentiment", sentimentSchema);
export default Sentiment;
