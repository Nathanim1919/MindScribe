import mongoose from "mongoose";

const ImageBlockSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  urls: [
    {
      url: { type: String, required: true },
      alt: { type: String, required: true },
      caption: { type: String, required: true },
      meta: {
        width: { type: Number },
        height: { type: Number },
        alignment: { type: String },
      },
    },
  ],
});
