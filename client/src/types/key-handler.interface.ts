import { BlockType } from "./block.interface";


export interface KeyHandlerContext {
    blocks: BlockType[];
    addBlock: (block: BlockType['type'], index?: number, content?:'') => void;
    updateBlock: (index: number, updates: Partial<BlockType>) => void;
    deleteBlock: (index: number) => void;
    setFocusedBlockIndex: (index: number | null) => void;
    // setIsCommandMenuVisible: (visible: boolean) => void;
    setCommandFilter: (filter: string) => void;
}


export type KeyHandler = (
    e: React.KeyboardEvent<HTMLDivElement>,
    context: {
        index: number;
        currentBlock: BlockType;
        currentElement: HTMLDivElement;
        context: KeyHandlerContext;
    }
) => void;