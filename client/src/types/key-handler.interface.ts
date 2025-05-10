import { BlockType } from './block.interface';
import { BlockMeta } from './meta.type';

export interface KeyHandlerContext {

  blocks: BlockType[];
  updateCursorPosition: (blockId: string, position: number) => void;
  addBlock: (payload: {
    type: BlockType['type'];
    content: string;
    afterId?: string;
    beforeId?: string;
    meta?: BlockMeta;
  }) => string;
  
  updateBlock: (id: string, updates: Partial<BlockType>) => void;
  deleteBlock: (id: string) => void;
  setFocusedBlockId: (index: string | null) => void;
  showMenu: (id: string) => void;
  setFilter: (filter: string) => void;
  refMap: Map<string, React.RefObject<HTMLElement>>;
}

export type KeyHandler = (
  e: React.KeyboardEvent<HTMLDivElement>,
  context: {
    id: string;
    // currentBlock: BlockType;
    currentElement: HTMLDivElement;
    context: KeyHandlerContext;
  },
) => void;
