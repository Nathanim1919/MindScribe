// context/BlockContext.tsx
import {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  BlockType,
  isHeaderBlock,
  isParagraphBlock,
  isQuoteBlock,
} from '../types/block.interface';
import { createBlock } from '../components/utils/blockFactory';
import { mergeBlockUpdate } from '../utils/mergeUpdate';

// -------------------
// ACTION TYPES
// -------------------
type Action =
  | {
      type: 'ADD_BLOCK';
      payload: {
        type: BlockType['type'];
        content: string;
        afterId?: string;
        meta?: { level: number; spacing: string };
      };
    }
  | {
      type: 'UPDATE_BLOCK';
      payload: { id: string; updates: Partial<BlockType> };
    }
  | {
      type: 'DELETE_BLOCK';
      payload: { id: string };
    }
  | {
      type: 'CHANGE_BLOCK_TYPE';
      payload: { id: string; newType: BlockType['type'] };
    }
  | {
      type: 'REORDER_BLOCKS';
      payload: { sourceId: string; targetId: string };
    }
  | {
      type: 'SET_BLOCKS';
      payload: { blocks: BlockType[] };
    };

// -------------------
// REDUCER
// -------------------
const blockReducer = (state: BlockType[], action: Action): BlockType[] => {
  switch (action.type) {
    case 'ADD_BLOCK': {
      const { afterId, content, type, meta } = action.payload;
      const newBlock = createBlock(type, content, meta);

      if (afterId) {
        const index = state.findIndex((b) => b.id === afterId);
        if (index === -1) return state;

        return [
          ...state.slice(0, index + 1),
          newBlock,
          ...state.slice(index + 1),
        ];
      }

      return [...state, newBlock];
    }

    case 'UPDATE_BLOCK': {
      const { id, updates } = action.payload;

      return state.map((block) => {
        if (block.id !== id) return block;

        if (isHeaderBlock(block)) {
          return mergeBlockUpdate(block, updates as Partial<typeof block>);
        } else if (isParagraphBlock(block)) {
          return mergeBlockUpdate(block, updates as Partial<typeof block>);
        } else if (isQuoteBlock(block)) {
          return mergeBlockUpdate(block, updates as Partial<typeof block>);
        }

        return block;
      });
    }

    case 'DELETE_BLOCK': {
      const { id } = action.payload;
      return state.filter((block) => block.id !== id);
    }

    case 'CHANGE_BLOCK_TYPE': {
      const { id, newType } = action.payload;
      return state.map((block) => {
        if (block.id !== id) return block;
    
        // Determine the default meta for the new type
        let newMeta: BlockType['meta'] | undefined = undefined;
    
        switch (newType) {
          case 'header':
            newMeta = { level: 1, spacing: 'large' }; // Default meta for a header block
            break;
          case 'paragraph':
            newMeta = { spacing: 'medium' }; // Default meta for a paragraph block
            break;
          case 'quote':
            newMeta = { spacing: 'small' }; // Default meta for a quote block
            break;
          // Handle other block types similarly
          default:
            newMeta = undefined; // No meta for other types (if needed)
        }
    
        return {
          ...block,
          type: newType,
          meta: newMeta,  // Update meta for the new block type
        } as BlockType;
      });
    }
    

    case 'REORDER_BLOCKS': {
      const { sourceId, targetId } = action.payload;
      if (sourceId === targetId) return state;

      const sourceIndex = state.findIndex((b) => b.id === sourceId);
      const targetIndex = state.findIndex((b) => b.id === targetId);

      if (sourceIndex === -1 || targetIndex === -1) return state;

      const updated = [...state];
      const [moved] = updated.splice(sourceIndex, 1);
      updated.splice(targetIndex, 0, moved);
      return updated;
    }

    case 'SET_BLOCKS': {
      return action.payload.blocks;
    }

    default: {
      const _exhaustiveCheck: never = action;
      throw new Error(`Unhandled action: ${_exhaustiveCheck}`);
    }
  }
};

// -------------------
// CONTEXT TYPES
// -------------------
export type BlockContextType = {
  blocks: BlockType[];
  cursorPositions: React.MutableRefObject<Record<string, number>>;
  updateCursorPosition: (blockId: string, position: number) => void;
  addBlock: (
    type: BlockType['type'],
    content: string,
    afterId?: string,
    meta?: { level: number; spacing: string },
  ) => void;
  updateBlock: (id: string, updates: Partial<BlockType>) => void;
  deleteBlock: (id: string) => void;
  reorderBlocks: (sourceId: string, targetId: string) => void;
  changeBlockType: (id: string, newType: BlockType['type']) => void;
  setBlocks: (blocks: BlockType[]) => void;
};

// -------------------
// CONTEXT
// -------------------
export const BlockContext = createContext<BlockContextType | undefined>(
  undefined,
);

// -------------------
// PROVIDER
// -------------------
export const BlockProvider = ({ children }: { children: ReactNode }) => {
  const [blocks, dispatch] = useReducer(blockReducer, [
    createBlock('header', '', { level: 1, spacing: 'large' }),
  ]);

  const cursorPositions = useRef<Record<string, number>>({});

  const updateCursorPosition = useCallback(
    (blockId: string, position: number) => {
      cursorPositions.current[blockId] = position;
    },
    [],
  );

  const addBlock = useCallback(
    (
      type: BlockType['type'],
      content: string,
      afterId?: string,
      meta?: { level: number; spacing: string },
    ) => {
      dispatch({
        type: 'ADD_BLOCK',
        payload: { type, content, afterId, meta },
      });
    },
    [],
  );

  const updateBlock = useCallback((id: string, updates: Partial<BlockType>) => {
    dispatch({ type: 'UPDATE_BLOCK', payload: { id, updates } });
  }, []);

  const deleteBlock = useCallback((id: string) => {
    dispatch({ type: 'DELETE_BLOCK', payload: { id } });
  }, []);

  const changeBlockType = useCallback(
    (id: string, newType: BlockType['type']) => {
      dispatch({ type: 'CHANGE_BLOCK_TYPE', payload: { id, newType } });
    },
    [],
  );

  const reorderBlocks = useCallback((sourceId: string, targetId: string) => {
    dispatch({ type: 'REORDER_BLOCKS', payload: { sourceId, targetId } });
  }, []);

  const setBlocks = useCallback((blocks: BlockType[]) => {
    dispatch({ type: 'SET_BLOCKS', payload: { blocks } });
  }, []);

  const value = useMemo(
    () => ({
      blocks,
      cursorPositions,
      updateCursorPosition,
      addBlock,
      updateBlock,
      deleteBlock,
      changeBlockType,
      reorderBlocks,
      setBlocks,
    }),
    [
      blocks,
      addBlock,
      updateBlock,
      deleteBlock,
      changeBlockType,
      reorderBlocks,
      setBlocks,
    ],
  );

  return (
    <BlockContext.Provider value={value}>{children}</BlockContext.Provider>
  );
};

// -------------------
// HOOK
// -------------------
export const useBlockContext = () => {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error('useBlockContext must be used within a BlockProvider');
  }
  return context;
};
