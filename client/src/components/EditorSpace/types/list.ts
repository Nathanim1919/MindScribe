import { IListBlock } from "../../../types/block.interface";

export const ListBlock = {
    type: "list",
    defaults: {
      style: "bullet" as const, // Default list style
      items: [] as string[], // Default list items
    },
    create: (items = [], style:"bullet" | "numbered" = "bullet"): IListBlock => ({
      type: "list",
      style,
      items,
    }),
  };