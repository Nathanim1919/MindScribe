// components/blocks/HeaderBlock.tsx
import { IQuoteBlock } from '../../../types/block.interface';
import {
  getActionDecorators,
  getQuoteDecorators,
} from '../../../utils/decorators';
import { BaseBlock } from '../Block';
import { FaQuoteLeft } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa6";



interface QuoteBlockProps {
  block: IQuoteBlock;
  id: string;
  isFocused: boolean;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
}

export const QuoteBlock = ({
  block,
  id,
  isFocused,
  placeholder,
  onKeyDown,
  onClick,
  onInput,
  onBlur,
  onAddClick,
  onDragClick,
}: QuoteBlockProps & {
  onAddClick: () => void;
  onDragClick: () => void;
}) => {
  const decorators = [
    ...getQuoteDecorators(),
    ...getActionDecorators(
      () => onAddClick?.(),
      () => onDragClick?.(),
    ),
  ];
  return (
    <div className="relative group w-[95%] mx-auto">
      <span
      className='absolute w-10 h-10 text-2xl z-999 dark:text-dark-400 text-light-400 left-18 -top-2'
      >
        <FaQuoteLeft/>
      </span>
      <BaseBlock
        block={block}
        decorators={decorators}
        blockId={id}
        content={block.content}
        placeholder={placeholder}
        isFocused={isFocused}
        contentClassName="dark:border-dark-400 px-4 italic text-[15px] bg-light-100 dark:bg-dark-100"
        className={`p-1 rounded-md text-gray-500 dark:text-dark-500 relative
          `}
        showPlaceholder={!block.content?.trim()}
        spacing={block?.meta?.spacing}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onInput={onInput}
        onBlur={onBlur}
      />
        <span
      className='absolute w-10 h-10 text-2xl z-999 dark:text-dark-400 text-light-400 right-0 -bottom-6'
      >
        <FaQuoteRight/>
      </span>
    </div>
  );
};
