import { JSX } from 'react';
import { BlockType } from '../../types/block.interface';
import React from 'react';

export const EditorBlock = React.memo(
  ({
    block,
    id,
    isFocused,
    renderBlock,
  }: {
    block: BlockType;
    id: string;
    isFocused: boolean;
    renderBlock: (props: {
      block: BlockType;
      id: string;
      isFocused: boolean;
    }) => JSX.Element;
  }) => {
    return (
      <div
        data-block-id={id}
        // data-block-index={index}
        className="flex group w-full max-w-[800px] relative rounded-md cursor-text"
      >
        {renderBlock({
          block,
          id,
          isFocused,
        })}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.block.id === nextProps.block.id &&
    prevProps.block.content === nextProps.block.content &&
    prevProps.id === nextProps.id &&
    prevProps.isFocused === nextProps.isFocused,
);
EditorBlock.displayName = 'EditorBlock';
