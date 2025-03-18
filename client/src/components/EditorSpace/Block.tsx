import React, { useEffect } from 'react';
import { BlockType } from '../../types/block.interface';

interface BlockProps {
  index: number;
  block: BlockType;
  isSelected: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  placeholder: string;
}

export function Block({
  index,
  block,
  isSelected,
  onKeyDown,
  onClick,
  onInput,
  placeholder,
}: BlockProps) {

  useEffect(() => {
    console.log('Blocks state updated:', block);
  }, [block]);
  
  return (
    <div
      data-block-index={index}
      aria-label={`Editable block ${index}`}
      dangerouslySetInnerHTML={{ __html: block.content }}
      contentEditable
      onClick={onClick}
      onKeyDown={onKeyDown}
      onInput={onInput}
      className={`relative before:block w-full outline-none border-none break-words font-sans
        ${
          block.type === 'header'
            ? 'text-light-950 font-bold dark:text-dark-900 text-4xl py-2 before:text-center'
            : 'text-light-600 dark:text-dark-500 text-[16px] font-extralight'
        }
        ${isSelected ? 'border-2 border-blue-500' : ''}
        before:absolute before:top-0 before:left-0 before:text-gray-500 before:opacity-50 
        before:pointer-events-none before:content-[attr(data-placeholder)]
        ${
          block.type === 'header'
            ? block.content?.trim() === ''
              ? 'before:block'
              : 'before:block'
            : 'before:block focus:before:block'
        }
      `}
      data-placeholder={placeholder}
    ></div>
  );
}