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
}: QuoteBlockProps) => {
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
        className={`${paragraphClasses} text-gray-900 dark:text-white`}
        showPlaceholder={!block.content?.trim()}
        // spacing={block.meta.spacing}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onInput={onInput}
        onBlur={onBlur}
      />
    </div>
  );
};
