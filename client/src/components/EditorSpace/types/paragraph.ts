import { IParagraphBlock } from "../../../types/block.interface";

export const ParagraphBlock = {
    type: "paragraph",
    defaults: {
      content: "", // Default content
    },
    create: (content:string = ""): IParagraphBlock => ({
      type: "paragraph",
      content,
    }),
  };

