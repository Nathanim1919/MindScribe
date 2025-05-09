// context/BlockContext.tsx
import {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { BlockType, ImageType } from '../types/block.interface';
import { createBlock } from '../components/utils/blockFactory';
import { mergeBlockUpdate } from '../utils/mergeUpdate';
import { blockTypeDefaults } from '../utils/blockTypeDefaults';
import { findIndexById } from '../utils/block.utils';
import { BlockMeta } from '../types/meta.type';

interface addBlockPayLoad {
  type: BlockType['type'];
  urls?: {
    url: string;
    caption: string;
    alt: string;
    meta?: {
      width: number;
      height: number;
      alignment?: 'left' | 'center' | 'right';
    };
  }[];
  content: string;
  afterId?: string;
  beforeId?: string;
  meta?: BlockMeta;
}

// -------------------
// ACTION TYPES
// -------------------
type Action =
  | {
      type: 'ADD_BLOCK';
      payload: {
        block: BlockType;
        afterId?: string;
        beforeId?: string;
        urls?: ImageType[];
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
      const { block, afterId, beforeId, urls } = action.payload;
      console.log('THE NEW BLOCK IS: ', block);

      if (afterId) {
        const index = state.findIndex((b) => b.id === afterId);
        if (index === -1) return state;

        return [...state.slice(0, index + 1), block, ...state.slice(index + 1)];
      }

      if (beforeId) {
        const index = state.findIndex((b) => b.id === beforeId);
        if (index === -1) return state;
        return [...state.slice(0, index), block, ...state.slice(index)];
      }

      return [...state, block];
    }

    case 'UPDATE_BLOCK': {
      const { id, updates } = action.payload;

      return state.map((block) =>
        block.id === id ? mergeBlockUpdate(block, updates) : block,
      );
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
        const newMeta = blockTypeDefaults[newType] || undefined;

        return {
          ...block,
          type: newType,
          meta: newMeta, // Update meta for the new block type
        } as BlockType;
      });
    }

    case 'REORDER_BLOCKS': {
      const { sourceId, targetId } = action.payload;
      if (sourceId === targetId) return state;

      const sourceIndex = findIndexById(state, sourceId);
      const targetIndex = findIndexById(state, targetId);

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
  refMap: Map<string, React.RefObject<HTMLElement>>;
  updateCursorPosition: (blockId: string, position: number) => void;
  addBlock: (payload: addBlockPayLoad) => string;
  updateBlock: (id: string, updates: Partial<BlockType>) => void;
  deleteBlock: (id: string) => void;
  reorderBlocks: (sourceId: string, targetId: string) => void;
  changeBlockType: (id: string, newType: BlockType['type']) => void;
  setBlocks: (blocks: BlockType[]) => void;
  clearBlocks: () => void;
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
  const initialBlocks = () => {
    const blocksFromLocalStorage = localStorage.getItem('blocks');
    if (blocksFromLocalStorage) {
      try {
        const parsedBlocks = JSON.parse(blocksFromLocalStorage);
        return parsedBlocks.map((block: any) =>
          createBlock(block.type, block.content, block.meta),
        );
      } catch (e) {
        console.error('Failed to parse blocks from localStorage:', e);
      }
    }

    return [
      createBlock('header', '', {
        level: 1,
        spacing: 'large',
      }),
    ];
  };

  const [blocks, dispatch] = useReducer(blockReducer, [], initialBlocks);

  const cursorPositions = useRef<Record<string, number>>({});
  const refMap = useMemo(
    () => new Map<string, React.RefObject<HTMLElement>>(),
    [],
  );

  const updateCursorPosition = useCallback(
    (blockId: string, position: number) => {
      cursorPositions.current[blockId] = position;
    },
    [],
  );

  const addBlock = useCallback((payload: addBlockPayLoad): string => {
    console.log('🧪 Add Block Payload', payload);

    const newBlock = createBlock(
      payload.type,
      payload.type === 'image' ? payload.urls || [] : payload.content,
      payload.meta,
    );

    dispatch({
      type: 'ADD_BLOCK',
      payload: {
        block: newBlock,
        urls: payload.urls,
        afterId: payload.afterId,
        beforeId: payload.beforeId,
      },
    });

    return newBlock.id;
  }, []);

  const updateBlock = useCallback((id: string, updates: Partial<BlockType>) => {
    dispatch({ type: 'UPDATE_BLOCK', payload: { id, updates } });
  }, []);

  const deleteBlock = useCallback((id: string) => {
    dispatch({ type: 'DELETE_BLOCK', payload: { id } });
  }, []);


  const clearBlocks = useCallback(() => {
    dispatch({ type: 'SET_BLOCKS', payload: { blocks: [{
      id: '1',
      type: 'header',
      content: '',
      meta: {
        level: 1,
        spacing: 'large',
      },
      prevId: null,
      nextId: null,
    }] } });
  }
  , []);

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
      refMap,
      updateCursorPosition,
      addBlock,
      updateBlock,
      deleteBlock,
      changeBlockType,
      reorderBlocks,
      setBlocks,
      clearBlocks,
    }),
    [
      blocks,
      refMap,
      cursorPositions,
      addBlock,
      updateBlock,
      deleteBlock,
      changeBlockType,
      reorderBlocks,
      setBlocks,
      clearBlocks,
      updateCursorPosition,
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
