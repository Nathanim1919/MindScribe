
import { IHeaderBlock } from "../../../types/block.interface";

export const HeaderBlock = {
  type: 'header' as const, // insure that the type is 'header'
  defaults: {
    level: 1, // Default level of the header
    content: '', // Default content of the header
  },

  create: (content: string = '', level: number = 1): IHeaderBlock => ({
    type: 'header',
    level,
    content,
  }),
};
