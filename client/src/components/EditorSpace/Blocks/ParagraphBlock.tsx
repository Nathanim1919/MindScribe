// components/blocks/HeaderBlock.tsx

import { IParagraphBlock } from '../../../types/block.interface';
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

  return (
    <div className="relative group">
      <BaseBlock
        blockId={block.id}
        index={index}
        content={block.content}
        placeholder={placeholder}
        isFocused={isFocused}
        className={`${paragraphClasses} text-light-500 dark:text-dark-500`}
        showPlaceholder={!block.content?.trim()}
        // spacing={block.meta.spacing}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onInput={onInput}
        onBlur={onBlur}
        onAddClick={onAddClick}
        onDragClick={onDragClick}
      />
    </div>
  );
};
