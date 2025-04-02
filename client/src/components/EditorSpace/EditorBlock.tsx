import { JSX } from 'react';
import { BlockType } from '../../types/block.interface';
import React from 'react';

export const EditorBlock = React.memo(
  ({
    block,
    index,
    isFocused,
    renderBlock,
  }: {
    block: BlockType;
    index: number;
    isFocused: boolean;
    renderBlock: (props: {
      block: BlockType;
      index: number;
      isFocused: boolean;
    }) => JSX.Element;
  }) => {
    return (
      <div
        data-block-id={block.id}
        data-block-index={index}
        className="flex group w-full max-w-[800px] relative rounded-md cursor-text"
      >
        {renderBlock({
          block,
          index,
          isFocused,
        })}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.block.id === nextProps.block.id &&
    prevProps.block.content === nextProps.block.content &&
    prevProps.index === nextProps.index &&
    prevProps.isFocused === nextProps.isFocused,
);
EditorBlock.displayName = 'EditorBlock';
