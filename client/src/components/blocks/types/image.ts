import { IImageBlock } from "../../../types/block.interface";

export const ImageBlock = {
    type: "image" as const,
    defaults: {
      url: "", // Default image URL
      caption: "", // Default caption
    },
    create: (url: string = "", caption: string = ""): IImageBlock => ({
      type: "image",
      url,
      caption,
    }),
  };