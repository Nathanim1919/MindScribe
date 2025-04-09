import React, { JSX, useMemo } from 'react';
import { BlockType } from '../../types/block.interface';
import { EditorBlock } from './EditorBlock';

export const EditorBlocks = React.memo(
  ({
    blocks,
    focusedBlockId,
    renderBlock,
    onClickBlock,
  }: {
    blocks: BlockType[];
    focusedBlockId: string | null;
    renderBlock: (props: {
      block: BlockType;
      id: string;
      isFocused: boolean;
    }) => JSX.Element;
    onClickBlock: (id: string) => void;
  }) => {
    const blockList = useMemo(() => {
      return blocks.map((block, index) => (
        <div
          key={block.id}
          onClick={() => onClickBlock(block.id)}
          className="flex group w-full max-w-[800px] relative rounded-md cursor-text"
        >
          <EditorBlock
            key={block.id}
            block={block}
            id={block.id}
            isFocused={focusedBlockId === block.id}
            renderBlock={renderBlock}
          />
        </div>
      ));
    }, [blocks, focusedBlockId, renderBlock]);

    return (
      <div className="relative w-full max-w-4xl mx-auto px-4 pb-[4rem]">
        {blockList}
      </div>
    );
  },
);

EditorBlocks.displayName = 'EditorBlocks';
