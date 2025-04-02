import { BlockType } from "./block.interface";


export interface KeyHandlerContext {
    blocks: BlockType[];
    updateCursorPosition: (blockId: string, position: number) => void;
    addBlock: (type: BlockType['type'], content:string, index?: number, meta?:{level: number, spacing:string}) => void,
    updateBlock: (index: number, updates: Partial<BlockType>) => void;
    deleteBlock: (index: number) => void;
    setFocusedBlockIndex: (index: number | null) => void;
    showMenu: (index: number) => void;
    setFilter: (filter: string) => void;
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