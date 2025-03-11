import { BlockType } from "../../types/block.interface";

import {
    HeaderBlock,
    ParagraphBlock,
    QuoteBlock,
    ListBlock,
    ImageBlock,
    DividerBlock,
} from "../blocks/types";

// Helper type to map block types to their additional properties
type AdditionalProps<T extends BlockType["type"]> =
    T extends "header"
        ? { level: number }
        : T extends "list"
        ? { items: string[]; style: "bullet" | "numbered" }
        : T extends "image"
        ? { url: string; caption?: string }
        : Record<string, never>;

// Create a new block
export function createBlock<T extends BlockType["type"]>(
    type: T,
    content: string = "",
    additionalProps: AdditionalProps<T> = {} as AdditionalProps<T>
): BlockType {
    switch (type) {
        case "header":
            return HeaderBlock.create(content, (additionalProps as AdditionalProps<"header">).level);
        case "paragraph":
            return ParagraphBlock.create(content);
        case "quote":
            return QuoteBlock.create(content);
        case "list":
            return ListBlock.create(
                (additionalProps as AdditionalProps<"list">).style,
                (additionalProps as AdditionalProps<"list">).items,
            );
        case "image":
            return ImageBlock.create(
                (additionalProps as AdditionalProps<"image">).url,
                (additionalProps as AdditionalProps<"image">).caption
            );
        case "divider":
            return DividerBlock.create();
        default:
            throw new Error(`Unknown block type: ${type}`);
    }
}

// Validate a block
export function validateBlock(block: BlockType): boolean {
    if (!block.type) throw new Error("Block must have a type");
    if (!block.content && block.type !== "divider") throw new Error("Block must have content");
    return true;
}
