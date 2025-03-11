import { IQuoteBlock } from "../../../types/block.interface";

export const QuoteBlock = {
    type: "quote" as const,
    defaults: {
      content: "", // Default content
    },
    create: (content: string = ""):IQuoteBlock => ({
      type: "quote",
      content,
    }),
  };