import React, { JSX } from 'react';
import { BlockType } from '../../types/block.interface';
import { EditorBlock } from './EditorBlock';
import { motion } from 'motion/react';

export const EditorBlocks = React.memo(
  ({
    blocks,
    focusedBlockId,
    renderBlock,
    onClickBlock,
    isCommandOptionVisible,
  }: {
    blocks: BlockType[] | undefined;
    focusedBlockId: string | null;
    renderBlock: (props: {
      block: BlockType;
      id: string;
      isFocused: boolean;
    }) => JSX.Element;
    onClickBlock: (id: string) => void;
    isCommandOptionVisible: boolean;
  }) => {


    return (
      <div className="relative w-full max-w-4xl mx-auto px-4 pb-[4rem]">
        {blocks?.map((block) => (
        <motion.div
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.02 * (blocks.indexOf(block) + 1) }}
          key={block.id}
          onClick={() => onClickBlock(block.id)}
          className={`flex group w-full  ${
            isCommandOptionVisible && focusedBlockId === block.id
              ? 'bg-light-100 dark:bg-dark-100'
              : ''
          } relative rounded-md cursor-text`}
        >
          <EditorBlock
            block={block}
            id={block.id}
            isFocused={focusedBlockId === block.id}
            renderBlock={renderBlock}
          />
        </motion.div>
      ))}
      </div>
    );
  },
);

EditorBlocks.displayName = 'EditorBlocks';
