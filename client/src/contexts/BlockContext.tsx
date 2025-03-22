import { createContext, useReducer, ReactNode, useContext } from 'react';
import { BlockType } from '../types/block.interface';
import { createBlock } from '../components/utils/blockUtils';

// define actions
type Action =
  | { type: 'ADD_BLOCK'; payload: { block: BlockType; index?: number } }
  | { type: 'UPDATE_BLOCK'; payload: { index: number; content: string } }
  | { type: 'DELETE_BLOCK'; payload: { index: number } }
  | {
      type: 'UPDATE_BLOCK_WITH_NEW_TYPE';
      payload: { index: number; newBlock: BlockType };
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
      const newBlock: BlockType = createBlock(action.payload.block.type);
      newBlock.content = action.payload.block.content;
      if (action.payload.index !== undefined) {
        if (action.payload.index < 0 || action.payload.index > state.length) {
          console.error('Invalid index:', action.payload.index);
          return state;
        }
        const newBlocks = [...state];
        newBlocks.splice(action.payload.index, 0, newBlock);
        return newBlocks;
      }
      return [...state, newBlock];
    }
    case 'DELETE_BLOCK': {
      return state.filter((_, i) => i !== action.payload.index);
    }
    case 'UPDATE_BLOCK': {
      return state.map((block, i) =>
        i === action.payload.index
          ? { ...block, content: action.payload.content }
          : block,
      );
    }
    case 'UPDATE_BLOCK_WITH_NEW_TYPE': {
      return state.map((block, i) =>
        i === action.payload.index
          ? {
              ...block,
              type: action.payload.newBlock.type,
              content: action.payload.newBlock.content,
            }
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
      console.error('Invalid action:', action);
      return state;
    }
  }
};

export type BlockContextType = {
  blocks: BlockType[];
  addBlock: (block: BlockType, index?: number) => void;
  updateBlock: (index: number, content: string) => void;
  deleteBlock: (index: number) => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  updateBlockWithNewType: (index: number, newBlock: BlockType) => void;
  setBlocks: (blocks: BlockType[]) => void;
};

// Create the context
export const BlockContext = createContext<BlockContextType | undefined>(
  undefined,
);

// Create the provider
export const BlockProvider = ({ children }: { children: ReactNode }) => {
  const [blocks, dispatch] = useReducer(blockReducer, [
    {
      type: 'header',
      content: 'Your very first Entrie..',
    },
    {
      type: 'paragraph',
      content: new Date().toLocaleDateString(),
    },
  ]);

  const addBlock = (block: BlockType, index?: number) => {
    dispatch({ type: 'ADD_BLOCK', payload: { block, index } });
  };

  const updateBlock = (index: number, content: string) => {
    dispatch({ type: 'UPDATE_BLOCK', payload: { index, content } });
  };

  const deleteBlock = (index: number) => {
    dispatch({ type: 'DELETE_BLOCK', payload: { index } });
  };

  const reorderBlocks = (startIndex: number, endIndex: number) => {
    dispatch({ type: 'REORDER_BLOCKS', payload: { startIndex, endIndex } });
  };

  const updateBlockWithNewType = (index: number, newBlock: BlockType) => {
    dispatch({
      type: 'UPDATE_BLOCK_WITH_NEW_TYPE',
      payload: { index, newBlock },
    });
  };

  const setBlocks = (blocks: BlockType[]) => {
    dispatch({ type: 'SET_BLOCKS', payload: { blocks } });
  };

  return (
    <BlockContext.Provider
      value={{
        blocks,
        addBlock,
        deleteBlock,
        updateBlock,
        updateBlockWithNewType,
        reorderBlocks,
        setBlocks,
      }}
    >
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
