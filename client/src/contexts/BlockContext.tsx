import {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { BlockType } from '../types/block.interface';
import { createBlock } from '../components/utils/blockFactory';

// Define action types
type Action =
  | {
      type: 'ADD_BLOCK';
      payload: {
        type: BlockType['type'];
        content: string;
        index?: number;
        meta?: { level: number; spacing: string };
      };
    }
  | {
      type: 'UPDATE_BLOCK';
      payload: { index: number; updates: Partial<BlockType> };
    }
  | { type: 'DELETE_BLOCK'; payload: { index: number } }
  | {
      type: 'CHANGE_BLOCK_TYPE';
      payload: { index: number; newType: BlockType['type'] };
    }
  | {
      type: 'REORDER_BLOCKS';
      payload: { startIndex: number; endIndex: number };
    }
  | { type: 'SET_BLOCKS'; payload: { blocks: BlockType[] } };

// Optimized reducer function
const blockReducer = (state: BlockType[], action: Action) => {
  switch (action.type) {
    case 'ADD_BLOCK': {
      const { index, content, type, meta } = action.payload;
      const newBlock = createBlock(type, content, meta);
      console.log("newly created block is: ", newBlock);

      if (index !== undefined) {
        if (index < 0 || index > state.length) return state;

        const newState = state.slice();
        newState.splice(index, 0, newBlock);
        return newState;
      }
      return [...state, newBlock];
    }

    case 'DELETE_BLOCK': {
      const { index } = action.payload;
      if (index === 0) return state;

      const newState = state.slice();
      newState.splice(index, 1);
      return newState;
    }

    case 'UPDATE_BLOCK': {
      const { index, updates } = action.payload;
      const block = state[index];

      // Skip if no actual changes
      if (
        Object.keys(updates).every(
          (key) =>
            block[key as keyof BlockType] === updates[key as keyof BlockType],
        )
      ) {
        return state;
      }

      const newState = state.slice();
      newState[index] = { ...block, ...updates } as BlockType;
      return newState;
    }

    case 'CHANGE_BLOCK_TYPE': {
      const { index, newType } = action.payload;
      if (state[index].type === newType) return state;

      const newState = state.slice();
      newState[index] = { ...newState[index], type: newType } as BlockType;
      return newState;
    }

    case 'REORDER_BLOCKS': {
      const { startIndex, endIndex } = action.payload;
      if (startIndex === endIndex) return state;

      const newState = state.slice();
      const [removed] = newState.splice(startIndex, 1);
      newState.splice(endIndex, 0, removed);
      return newState;
    }

    case 'SET_BLOCKS': {
      return action.payload.blocks;
    }

    default: {
      const _exhaustiveCheck: never = action;
      throw new Error(`Unknown action type: ${_exhaustiveCheck}`);
    }
  }
};

export type BlockContextType = {
  blocks: BlockType[];
  addBlock: (
    type: BlockType['type'],
    content: string,
    index?: number,
    meta?: { level: number; spacing: string },
  ) => void;
  cursorPositions: React.MutableRefObject<Record<string, number>>;
  updateCursorPosition: (blockId: string, position: number) => void;
  updateBlock: (index: number, updates: Partial<BlockType>) => void;
  deleteBlock: (index: number) => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  changeBlockType: (index: number, newType: BlockType['type']) => void;
  setBlocks: (blocks: BlockType[]) => void;
};

// Create the context
export const BlockContext = createContext<BlockContextType | undefined>(
  undefined,
);

// Optimized provider component
export const BlockProvider = ({ children }: { children: ReactNode }) => {
  const [blocks, dispatch] = useReducer(blockReducer, [
    createBlock('header', '', { level: 1, spacing: 'large' }),
  ]);

  const cursorPositions = useRef<Record<string, number>>({});

const updateCursorPosition = useCallback((blockId: string, position: number) => {
  cursorPositions.current[blockId] = position;
}, []);

  // Memoized action creators
  const addBlock = useCallback(
    (
      type: BlockType['type'],
      content: string,
      index?: number,
      meta?: { level: number; spacing: string },
    ) => {
      dispatch({ type: 'ADD_BLOCK', payload: { type, content, index, meta } });
    },
    [],
  );

  const updateBlock = useCallback(
    (index: number, updates: Partial<BlockType>) => {
      // Skip if no actual changes
      if (
        Object.keys(updates).every(
          (key) =>
            blocks[index][key as keyof BlockType] ===
            updates[key as keyof BlockType],
        )
      )
        return;

      dispatch({ type: 'UPDATE_BLOCK', payload: { index, updates } });
    },
    [blocks],
  );

  const deleteBlock = useCallback((index: number) => {
    dispatch({ type: 'DELETE_BLOCK', payload: { index } });
  }, []);

  const changeBlockType = useCallback(
    (index: number, newType: BlockType['type']) => {
      dispatch({ type: 'CHANGE_BLOCK_TYPE', payload: { index, newType } });
    },
    [],
  );

  const reorderBlocks = useCallback((startIndex: number, endIndex: number) => {
    dispatch({ type: 'REORDER_BLOCKS', payload: { startIndex, endIndex } });
  }, []);

  const setBlocks = useCallback((blocks: BlockType[]) => {
    dispatch({ type: 'SET_BLOCKS', payload: { blocks } });
  }, []);

  // Memoized context value
  const contextValue = useMemo(
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
      cursorPositions,
      updateCursorPosition,
      addBlock,
      updateBlock,
      deleteBlock,
      changeBlockType,
      reorderBlocks,
      setBlocks,
    ],
  );

  return (
    <BlockContext.Provider value={contextValue}>
      {children}
    </BlockContext.Provider>
  );
};

// Custom hook for consuming the context
export const useBlockContext = () => {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error('useBlockContext must be used within a BlockProvider');
  }
  return context;
};
