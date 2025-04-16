// // components/blocks/HeaderBlock.tsx

// import { IParagraphBlock } from '../../../types/block.interface';
// import { getActionDecorators, getParagraphDecorators } from '../../../utils/decorators';

// interface ParagraphBlockProps {
//   block: IParagraphBlock;
//   id: string;
//   isFocused: boolean;
//   placeholder: string;
//   onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
//   onClick: () => void;
//   onInput: (e: React.FormEvent<HTMLDivElement>) => void;
//   onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
// }

// export const ParagraphBlock = ({
//   block,
//   id,
//   isFocused,
//   placeholder,
//   onKeyDown,
//   onClick,
//   onInput,
//   onBlur,
//   onAddClick,
//   onDragClick,
// }: ParagraphBlockProps & {
//   onAddClick: () => void;
//   onDragClick: () => void;
// }) => {
//   const paragraphClasses = {
//     small: 'text-sm',
//     medium: 'text-lg',
//     large: 'text-lg',
//   };


//    const decorators = [
//       ...getParagraphDecorators(),
//       ...getActionDecorators(
//         () => onAddClick?.(),
//         () => onDragClick?.()
//       )
//     ];

//   return (
//     <div className="relative group w-full">
//       <BaseBlock
//         decorators={decorators}
//         block={block}
//         blockId={id}
//         content={block.content}
//         placeholder={placeholder}
//         isFocused={isFocused}
//         className={`${paragraphClasses.medium}   text-light-800 w-full dark:text-dark-600`}
//         showPlaceholder={!block.content?.trim()}
//         onKeyDown={onKeyDown}
//         onClick={onClick}
//         onInput={onInput}
//         onBlur={onBlur}
//       />
//     </div>
//   );
// };


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
      className={`p-1 rounded-md text-gray-500 dark:text-dark-500 relative ${paragraphClasses.medium}
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