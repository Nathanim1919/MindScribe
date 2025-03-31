// components/blocks/HeaderBlock.tsx
import { IQuoteBlock } from '../../../types/block.interface';
import { BaseBlock } from '../Block';

interface QuoteBlockProps {
  block: IQuoteBlock;
  index: number;
  isFocused: boolean;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
}

export const QuoteBlock = ({
  block,
  index,
  isFocused,
  placeholder,
  onKeyDown,
  onClick,
  onInput,
  onBlur,
  onAddClick,
  onDragClick
}: QuoteBlockProps & {
  onAddClick: () => void;
  onDragClick: () => void;
}) => {

  const paragraphClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <div className="relative group w-full">
      <BaseBlock
        blockId={block.id}
        index={index}
        content={block.content}
        placeholder={placeholder}
        isFocused={isFocused}
        className={`${paragraphClasses} bg-light-100 dark:bg-dark-100 px-2 rounded-md text-gray-500 dark:text-dark-500`}
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
