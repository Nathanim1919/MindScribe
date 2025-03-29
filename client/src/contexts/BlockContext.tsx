import { createContext, useReducer, ReactNode, useContext } from 'react';
import { BlockType } from '../types/block.interface';
import { createBlock } from '../components/utils/blockFactory';

// define actions
type Action =
  | {
      type: 'ADD_BLOCK';
      payload: { type: BlockType['type']; index?: number; content?: string };
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

// Reducer function
const blockReducer = (state: BlockType[], action: Action) => {
  switch (action.type) {
    case 'ADD_BLOCK': {
      console.log('The Payload is: ', action.payload.type);
      console.log('The index is: ', action.payload.index);
      console.log('The content is: ', action.payload.content);
      const newBlock: BlockType = createBlock(
        action.payload.type,
        action.payload.content,
      );
      if (action.payload.index !== undefined) {
        if (action.payload.index < 0 || action.payload.index > state.length) {
          console.error('Invalid index:', action.payload.index);
          return state;
        }

        return [
          ...state.slice(0, action.payload.index),
          newBlock,
          ...state.slice(action.payload.index),
        ];
      }
      return [...state, newBlock];
    }
    case 'DELETE_BLOCK': {
      if (action.payload.index === 0)
        return state;
      return state.filter((_, i) => i !== action.payload.index);
    }
    case 'UPDATE_BLOCK': {
      return state.map((block, i) =>
        i === action.payload.index
          ? { ...block, ...action.payload.updates }
          : block,
      );
    }

    case 'CHANGE_BLOCK_TYPE': {
      return state.map((block, i) =>
        i === action.payload.index
          ? { ...block, type: action.payload.newType }
          : block,
      );
    }

    case 'REORDER_BLOCKS': {
      const newBlocks = Array.from(state);
      const [removed] = newBlocks.splice(action.payload.startIndex, 1);
      newBlocks.splice(action.payload.endIndex, 0, removed);
      return newBlocks;
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
  addBlock: (type: BlockType['type'], index?: number, content?: string) => void;
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

// Create the provider
export const BlockProvider = ({ children }: { children: ReactNode }) => {
  const [blocks, dispatch] = useReducer(blockReducer, [
    createBlock('header', 'Hello sir'),
  ]);

  const contextValue: BlockContextType = {
    blocks,
    addBlock: (type, index, content) =>
      dispatch({ type: 'ADD_BLOCK', payload: { type, index, content } }),
    updateBlock: (index, updates) =>
      dispatch({ type: 'UPDATE_BLOCK', payload: { index, updates } }),
    deleteBlock: (index) =>
      dispatch({ type: 'DELETE_BLOCK', payload: { index } }),
    changeBlockType: (index, newType) =>
      dispatch({ type: 'CHANGE_BLOCK_TYPE', payload: { index, newType } }),
    reorderBlocks: (startIndex, endIndex) =>
      dispatch({ type: 'REORDER_BLOCKS', payload: { startIndex, endIndex } }),
    setBlocks: (blocks) =>
      dispatch({ type: 'SET_BLOCKS', payload: { blocks } }),
  };

  return (
    <BlockContext.Provider value={contextValue}>
      {children}
    </BlockContext.Provider>
  );
};

export const useBlockContext = () => {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error('useBlockContext must be used within a BlockProvider');
  }
  return context;
};
