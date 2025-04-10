// components/blocks/HeaderBlock.tsx

import { IParagraphBlock } from '../../../types/block.interface';
import { getActionDecorators, getParagraphDecorators } from '../../../utils/decorators';
import { BaseBlock } from '../Block';

interface ParagraphBlockProps {
  block: IParagraphBlock;
  index: number;
  isFocused: boolean;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
}

export const ParagraphBlock = ({
  block,
  index,
  isFocused,
  placeholder,
  onKeyDown,
  onClick,
  onInput,
  onBlur,
  onAddClick,
  onDragClick,
}: ParagraphBlockProps & {
  onAddClick: () => void;
  onDragClick: () => void;
}) => {
  const paragraphClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };


   const decorators = [
      ...getParagraphDecorators(),
      ...getActionDecorators(
        () => onAddClick?.(),
        () => onDragClick?.()
      )
    ];

  return (
    <div className="relative group w-full">
      <BaseBlock
        decorators={decorators}
        block={block}
        blockId={block.id}
        index={index}
        content={block.content}
        placeholder={placeholder}
        isFocused={isFocused}
        className={`${paragraphClasses.medium}   text-light-800 w-full dark:text-dark-600`}
        showPlaceholder={!block.content?.trim()}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onInput={onInput}
        onBlur={onBlur}
      />
    </div>
  );
};
