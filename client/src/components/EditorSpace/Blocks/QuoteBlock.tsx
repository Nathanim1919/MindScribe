// // components/blocks/HeaderBlock.tsx
// import { IQuoteBlock } from '../../../types/block.interface';
// import {
//   getActionDecorators,
//   getQuoteDecorators,
// } from '../../../utils/decorators';
// import { BaseBlock } from '../Block';
// import { FaQuoteLeft } from "react-icons/fa6";
// import { FaQuoteRight } from "react-icons/fa6";



// interface QuoteBlockProps {
//   block: IQuoteBlock;
//   id: string;
//   isFocused: boolean;
//   placeholder: string;
//   onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
//   onClick: () => void;
//   onInput: (e: React.FormEvent<HTMLDivElement>) => void;
//   onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
// }

// export const QuoteBlock = ({
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
// }: QuoteBlockProps & {
//   onAddClick: () => void;
//   onDragClick: () => void;
// }) => {
//   const decorators = [
//     ...getQuoteDecorators(),
//     ...getActionDecorators(
//       () => onAddClick?.(),
//       () => onDragClick?.(),
//     ),
//   ];
//   return (
//     <div className="relative group w-[95%] mx-auto">
     
//       <BaseBlock
//         block={block}
//         decorators={decorators}
//         blockId={id}
//         content={block.content}
//         placeholder={placeholder}
//         isFocused={isFocused}
//         contentClassName="border-l-4 dark:border-dark-400 px-4 italic text-[15px] bg-light-100 dark:bg-dark-100"
//         className={`p-1 rounded-md text-gray-500 dark:text-dark-500 relative
//           `}
//         showPlaceholder={!block.content?.trim()}
//         spacing={block?.meta?.spacing}
//         onKeyDown={onKeyDown}
//         onClick={onClick}
//         onInput={onInput}
//         onBlur={onBlur}
//       />
     
//     </div>
//   );
// };


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
import { BlockWrapper } from './BlockWrapper';
import { BaseTextBlock } from '../Block';
import { getActionDecorators, getQuoteDecorators } from '../../../utils/decorators';
import { IQuoteBlock } from '../../../types/block.interface';

interface QuoteBlockProps {
  block: IQuoteBlock;
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

export const QuoteBlock = React.memo(({
  block,
  blockId,
  isFocused,
  placeholder,
  onAddClick,
  onDragClick,
  ...textProps
}: QuoteBlockProps) => {


  const decorators = React.useMemo(() => [
    ...getQuoteDecorators(),
    ...getActionDecorators(onAddClick, onDragClick)
  ], [onAddClick, onDragClick]);

  return (
    <BlockWrapper
      block={block}
      blockId={blockId}
      isFocused={isFocused}
      // contentClassName="border-l-4 dark:border-dark-400 px-4 italic text-[15px] bg-light-100 dark:bg-dark-100"
      className={`p-1 rounded-md text-gray-500 dark:text-dark-500 relative
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
        className="text-light-500 dark:text-dark-500 border-l-4 italic border-light-300 dark:border-dark-300 px-4 text-[15px] bg-light-100 dark:bg-dark-100"
        {...textProps}
      />
    </BlockWrapper>
  );
});


QuoteBlock.displayName = 'QuoteBlock';