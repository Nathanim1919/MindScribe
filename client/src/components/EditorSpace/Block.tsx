import React, { useEffect, useRef } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdDragIndicator } from 'react-icons/md';
import { FaQuoteLeft } from 'react-icons/fa';

interface BaseBlockProps {
  blockId: string;
  index: number;
  content?: string;
  placeholder: string;
  isFocused: boolean;
  className?: string;
  showPlaceholder: boolean;
  spacing?: 'small' | 'medium' | 'large';
  editable?: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
  onAddClick?: () => void;
  onDragClick?: () => void;
}

export const BaseBlock = React.forwardRef<HTMLDivElement, BaseBlockProps>(
  (
    {
      blockId,
      index,
      content,
      placeholder,
      isFocused,
      className = '',
      showPlaceholder,
      spacing = 'medium',
      editable = true,
      onKeyDown,
      onClick,
      onInput,
      onBlur,
      onAddClick,
      onDragClick,
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const resolvedRef = (ref || internalRef) as React.RefObject<HTMLDivElement>;

    const spacingClasses = {
      small: 'py-1',
      medium: 'py-2',
      large: 'py-4',
    };

    useEffect(() => {
      if (resolvedRef.current && content !== resolvedRef.current.innerText) {
        resolvedRef.current.innerText = content ?? '';
      }
    }, [content]);

    return (
      <div className={`flex w-full h-full group items-center gap-2`}>
        {/* Controls */}
        {(onAddClick || onDragClick || isFocused) && (
          <div
            className={`flex ${spacingClasses[spacing]} self-start mt-1 relative gap-1 text-light-400 dark:text-dark-400`}
          >
            {onAddClick && (
              <IoMdAdd
                onClick={onAddClick}
                className="hover:dark:bg-dark-100 hover:bg-light-100 rounded-sm opacity-0 group-hover:opacity-100 cursor-pointer text-[20px]"
              />
            )}
            {onDragClick && (
              <MdDragIndicator
                onClick={onDragClick}
                className="hover:dark:bg-dark-100 hover:bg-light-100 rounded-sm opacity-0 group-hover:opacity-100 cursor-grab text-[20px]"
              />
            )}
          </div>
        )}
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div
            ref={resolvedRef}
            data-block-id={blockId}
            data-block-index={index}
            aria-label={`Editable block ${index}`}
            dangerouslySetInnerHTML={{ __html: content ?? '' }}
            contentEditable={editable}
            onClick={onClick}
            onKeyDown={onKeyDown}
            spellCheck={false}
            onInput={onInput}
            onBlur={onBlur}
            className={`${className} leading-tight relative w-full  ${spacingClasses[spacing]} relative outline-none break-words before:absolute before:text-dark-500 before:font-light before:grid before:place-content-center before:h-full before:pointer-events-none before:content-[attr(data-placeholder)] before:top-0 before:left-0
              `}
            data-placeholder={showPlaceholder ? placeholder : ''}
          />
        </div>
      </div>
    );
  },
);

BaseBlock.displayName = 'BaseBlock';
