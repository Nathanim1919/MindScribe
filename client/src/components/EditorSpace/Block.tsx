import React from 'react';
import { BlockType } from '../../types/block.interface';

interface BlockProps {
  index: number;
  block: BlockType;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
  placeholder: string;
}

export function Block({
  index,
  block,
  onKeyDown,
  onClick,
  onInput,
  onBlur,
  placeholder,
}: BlockProps) {
  return (
    <div
      data-block-index={index}
      aria-label={`Editable block ${index}`}
      dangerouslySetInnerHTML={{ __html: block.content ?? '' }}
      contentEditable
      onClick={onClick}
      onKeyDown={onKeyDown}
      spellCheck={false}
      onInput={onInput}
      onBlur={onBlur}
      className={`relative before:block w-full outline-none border-none break-words font-sans overflow-hidden
        ${
          block.type === 'header'
            ? 'text-light-950 font-bold dark:text-dark-900 text-2xl before:text-center'
            : 'text-light-600 dark:text-dark-500 text-[16px] font-extralight'
        }
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
