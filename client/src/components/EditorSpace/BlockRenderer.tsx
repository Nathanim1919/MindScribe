import { BlockType } from "../../types/block.interface";
import {
  HeaderBlock,
  ParagraphBlock,
  QuoteBlock,
} from "./Blocks"

interface BlockRendererProps {
  blocks: BlockType[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <div>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "header":
            return <HeaderBlock key={index} {...block} />;
          case "paragraph":
            return <ParagraphBlock key={index} {...block} />;
          case "quote":
            return <QuoteBlock key={index} {...block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}