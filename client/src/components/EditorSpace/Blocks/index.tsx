import React from 'react';
import {
  BlockType,
  IHeaderBlock,
  IImageBlock,
  IParagraphBlock,
  IQuoteBlock,
} from '../../../types/block.interface';
import { HeaderBlock } from './HeaderBlock';
import { ParagraphBlock } from './ParagraphBlock';
import { QuoteBlock } from './QuoteBlock';
import { ImageBlock } from './ImageBlock';

type BlockComponentProps = {
  block: BlockType;
  id: string;
  isFocused: boolean;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
  onAddClick: () => void;
  onDragClick: () => void;
  setFocusedBlockId: (id: string) => void;
  showMenu: (id: string) => void;
  hideMenu: () => void;
  setIsCommandOptionVisible: (visible: boolean) => void;

  // ✅ Add these for ImageBlock
  handleImageReplace?: (file: File, id: string) => void;
  onCaptionChange?: (newCaption: string) => void;
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

      case 'image': {
        const imageBlock = block as IImageBlock;
        return (
          <ImageBlock
            key={block.id}
            imageUrl={imageBlock.url}
            caption={imageBlock.caption}
            onReplace={(file) => props.handleImageReplace?.(file, block.id)}
            onCaptionChange={(newCaption) =>
              props.onCaptionChange?.(newCaption)
            }
            isFocused={props.isFocused}
            onAddClick={onAddClick}
            onDragClick={onDragClick}
          />
        );
      }
      
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
