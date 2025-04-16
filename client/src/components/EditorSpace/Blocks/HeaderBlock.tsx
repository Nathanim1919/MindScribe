import React from 'react';
import { IHeaderBlock } from '../../../types/block.interface';
import { BlockWrapper } from './BlockWrapper';
import { getHeaderDecorators, getActionDecorators } from '../../../utils/decorators';
import { BaseTextBlock } from '../Block';

interface HeaderBlockProps {
  block: IHeaderBlock;
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

export const HeaderBlock = React.memo(({
  block,
  blockId,
  isFocused,
  placeholder,
  onAddClick,
  onDragClick,
  ...textProps
}: HeaderBlockProps) => {
  const level = block.meta?.level || 1;

  const decorators = React.useMemo(() => [
    ...getHeaderDecorators(level),
    ...getActionDecorators(onAddClick, onDragClick)
  ], [level, onAddClick, onDragClick]);

  const headerClasses = {
    1: 'text-4xl font-extrabold',
    2: 'text-3xl font-bold',
    3: 'text-2xl font-semibold',
    4: 'text-xl font-medium',
    5: 'text-lg font-medium',
    6: 'text-base font-medium',
  }[level];

  return (
    <BlockWrapper
      block={block}
      blockId={blockId}
      isFocused={isFocused}
      className={`rounded-md text-gray-500 dark:text-dark-500 relative ${headerClasses}
        `}
      decorators={decorators}
    >
      <BaseTextBlock
        blockId={blockId}
        content={block.content}
        placeholder={placeholder}
        isFocused={isFocused}
        showPlaceholder={!block.content?.trim()}
        spacing={block.meta?.spacing ?? 'large'}
        className="text-light-900 dark:text-dark-950"
        {...textProps}
      />
    </BlockWrapper>
  );
});
HeaderBlock.displayName = 'HeaderBlock';