import React from 'react';
import { IParagraphBlock } from '../../../types/block.interface';
import { BlockWrapper } from './BlockWrapper';
import { getActionDecorators, getParagraphDecorators } from '../../../utils/decorators';
import { BaseTextBlock } from '../Block';

interface ParagraphBlockProps {
  block: IParagraphBlock;
  blockId: string;
  isFocused: boolean;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
  onAddClick: () => void;
  onDragClick: () => void;
}

export const ParagraphBlock = React.memo(({
  block,
  blockId,
  isFocused,
  placeholder,
  onAddClick,
  onDragClick,
  ...textProps
}: ParagraphBlockProps) => {

  const paragraphClasses = {
    small: 'text-sm',
    medium: 'text-md',
    large: 'text-lg',
  };

  const decorators = React.useMemo(() => [
    ...getParagraphDecorators(),
    ...getActionDecorators(onAddClick, onDragClick)
  ], [onAddClick, onDragClick]);

  return (
    <BlockWrapper
      block={block}
      blockId={blockId}
      isFocused={isFocused}
      className={`p-1 rounded-md text-gray-500 dark:text-dark-500 relative ${paragraphClasses.large}
        `}
      decorators={decorators}
    >
      <BaseTextBlock
        blockId={blockId}
        content={block.content}
        placeholder={placeholder}
        isFocused={isFocused}
        showPlaceholder={!block.content?.trim()}
        spacing={block.meta?.spacing ?? 'medium'}
        className="text-light-700 dark:text-dark-700"
        {...textProps}
      />
    </BlockWrapper>
  );
});


ParagraphBlock.displayName = 'ParagraphBlock';