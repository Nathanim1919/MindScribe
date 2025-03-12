import { IDividerBlock } from "../../../types/block.interface";

export const DividerBlock = {
    type: "divider" as const,
    create: (): IDividerBlock => ({
      type: "divider",
    }),
  };