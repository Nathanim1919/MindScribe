import React, { JSX, useMemo } from 'react';
import { BlockType } from '../../types/block.interface';
import { EditorBlock } from './EditorBlock';

export const EditorBlocks = React.memo(
  ({
    blocks,
    focusedBlockIndex,
    renderBlock,
    onClickBlock,
  }: {
    blocks: BlockType[];
    focusedBlockIndex: number | null;
    renderBlock: (props: {
      block: BlockType;
      index: number;
      isFocused: boolean;
    }) => JSX.Element;
    onClickBlock: (index: number) => void;
  }) => {
    const blockList = useMemo(() => {
      return blocks.map((block, index) => (
        <div
          key={block.id}
          onClick={() => onClickBlock(index)}
          className="flex group w-full max-w-[800px] relative rounded-md cursor-text"
        >
          <EditorBlock
            key={block.id}
            block={block}
            index={index}
            isFocused={focusedBlockIndex === index}
            renderBlock={renderBlock}
          />
        </div>
      ));
    }, [blocks, focusedBlockIndex, renderBlock]);

    return (
      <div className="relative w-full max-w-4xl mx-auto px-4 pb-[4rem]">
        {blockList}
      </div>
    );
  },
);

EditorBlocks.displayName = 'EditorBlocks';
