import { BlockType } from "./block.interface";


export interface KeyHandlerContext {
    blocks: BlockType[];
    updateCursorPosition: (blockId: string, position: number) => void;
    addBlock: (type: BlockType['type'], content:string, afterId?: string, beforeId?: string, id?: string, meta?:{level: number, spacing:string}) => void,
    updateBlock: (id: string, updates: Partial<BlockType>) => void;
    deleteBlock: (id: string) => void;
    setFocusedBlockId: (index: string | null) => void;
    showMenu: (index: number) => void;
    setFilter: (filter: string) => void;
}


export type KeyHandler = (
    e: React.KeyboardEvent<HTMLDivElement>,
    context: {
        id: string;
        // currentBlock: BlockType;
        currentElement: HTMLDivElement;
        context: KeyHandlerContext;
    }
) => void;