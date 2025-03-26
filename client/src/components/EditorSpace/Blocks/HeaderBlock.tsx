// components/blocks/HeaderBlock.tsx

import { IHeaderBlock } from '../../../types/block.interface';
import { BaseBlock } from '../Block';

interface HeaderBlockProps {
  block: IHeaderBlock;
  index: number;
  isFocused: boolean;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
}

export const HeaderBlock = ({
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
}: HeaderBlockProps & {
  onAddClick: () => void;
  onDragClick: () => void;
}) => {
  const headerClasses = {
    1: 'text-4xl font-extrabold',
    2: 'text-3xl font-bold',
    3: 'text-2xl font-semibold',
    4: 'text-xl font-medium',
    5: 'text-lg font-medium',
    6: 'text-base font-medium',
  };

  return (
    <div className="relative group">
      <BaseBlock
        blockId={block.id}
        index={index}
        content={block.content}
        placeholder={placeholder}
        isFocused={isFocused}
        className={`${headerClasses[block.meta?.level ?? 1]} text-gray-900 dark:text-white`}
        showPlaceholder={!block.content?.trim()}
        spacing={block.meta?.spacing ?? 'large'}
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
