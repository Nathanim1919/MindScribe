import {
    HeaderBlock,
    ParagraphBlock,
    QuoteBlock,
    ListBlock,
    ImageBlock,
    DividerBlock,
  } from "./types";



// Create a new block
export function createBlock(type: string, content="", additionalProps = {}){
    switch(type){
        case "header":
            return HeaderBlock.create(content, additionalProps.level);
        case "paragraph":
            return ParagraphBlock.create(content);
        case "quote":
            return QuoteBlock.create(content);
        case "list":
            return ListBlock.create(content, additionalProps.ordered);
        case "image":
            return ImageBlock.create(content, additionalProps.src);
        case "divider":
            return DividerBlock.create();
        default:
            throw new Error(`Unknown block type: ${type}`)
    }
}