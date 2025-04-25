import mongoose from "mongoose";
import { BlockModel } from "./block.model";

const ImageBlockSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  // what if i want to change the metadata for the specific image, with what unique field can i search it? url?, may be their might have dublicate images (same urls).
  // their need to have unique field or we might handles these by separating the image model and creating its own schema and using the reference mechanism.
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

export const ImageBlock = BlockModel.discriminator("image", ImageBlockSchema);
