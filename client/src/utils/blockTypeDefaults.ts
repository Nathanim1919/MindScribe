import { BlockType } from "../types/block.interface";

export const blockTypeDefaults: Record<BlockType['type'], BlockType['meta'] | undefined> = {
    header: { level: 1, spacing: 'large' }, // Default meta for a header block
    paragraph: { spacing: 'medium' }, // Default meta for a paragraph block
    quote: { spacing: 'small' }, // Default meta for a quote block
    // Add other block types and their default meta here
}


