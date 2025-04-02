import React from 'react';
import {
  BlockType,
  IHeaderBlock,
  IParagraphBlock,
  IQuoteBlock,
} from '../../../types/block.interface';
import { HeaderBlock } from './HeaderBlock';
import { ParagraphBlock } from './ParagraphBlock';
import { QuoteBlock } from './QuoteBlock';

type BlockComponentProps = {
  block: BlockType;
  index: number;
  isFocused: boolean;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
  onAddClick: () => void;
  onDragClick: () => void;
  setFocusedBlockIndex: (index: number) => void;
  showMenu: (index: number) => void;
  hideMenu: () => void;
  setIsCommandOptionVisible: (visible: boolean) => void;
};

export const renderBlock = (props: BlockComponentProps) => {
  const { block, onAddClick, onDragClick, ...restProps } = props; // Separate block from other props

  switch (props.block.type) {
    case 'header':
      return (
        <HeaderBlock
          block={block as IHeaderBlock}
          key={props.block.id}
          {...restProps}
          onAddClick={onAddClick}
          onDragClick={onDragClick}
        />
      );
    case 'paragraph':
      return (
        <ParagraphBlock
          key={block.id}
          block={block as IParagraphBlock}
          {...restProps}
          onAddClick={onAddClick}
          onDragClick={onDragClick}
        />
      );
    case 'quote':
      return (
        <QuoteBlock
          key={block.id}
          block={block as IQuoteBlock}
          {...restProps}
          onAddClick={onAddClick}
          onDragClick={onDragClick}
        />
      );
    default:
      return (
        <ParagraphBlock
          key={block.id}
          block={block as IParagraphBlock}
          {...restProps}
          onAddClick={onAddClick}
          onDragClick={onDragClick}
        />
      );
  }
};
