import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useBlockContext } from '../../contexts/BlockContext';

interface BaseTextBlockProps {
  blockId: string;
  content?: string;
  placeholder: string;
  isFocused: boolean;
  showPlaceholder: boolean;
  spacing?: 'small' | 'medium' | 'large';
  className?: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
}

export const BaseTextBlock = React.forwardRef<
  HTMLDivElement,
  BaseTextBlockProps
>(
  (
    {
      content,
      placeholder,
      showPlaceholder,
      spacing = 'large',
      className = '',
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const resolvedRef = (ref || internalRef) as React.RefObject<HTMLDivElement>;
    const { refMap } = useBlockContext();

    // Content synchronization
    useEffect(() => {
      refMap.set(props.blockId, resolvedRef);
      return () => {
        refMap.delete(props.blockId);
      };
    }, [props.blockId, resolvedRef, refMap]);

    useEffect(() => {
      if (resolvedRef.current && content !== resolvedRef.current.innerText) {
        resolvedRef.current.innerText = content ?? '';
      }
    }, [content]);

    const spacingClasses = {
      small: 'py-1',
      medium: 'py-2',
      large: 'py-4',
    };

    return (
      <motion.div
        draggable={true}
        initial={{ opacity: 0, translateY: '2px' }}
        animate={{ opacity: 1, translateY: '0px' }}
        transition={{ duration: 0.4 }}
        ref={resolvedRef}
        spellCheck={false}
        data-focused={props.isFocused}
        aria-label={`Editable block ${props.blockId}`}
        contentEditable={true}
        className={`
          base-text-block 
          outline-none 
          w-full 
          ${spacingClasses[spacing]} 
          ${className}
          relative
          before:content-[attr(data-placeholder)]
          before:absolute
          before:top-0
          before:left-0
          before:grid
          before:items-center
          dark:before:text-dark-300
          before:text-light-400
          before:pointer-events-none
          before:w-full
          before:h-full
          before:${showPlaceholder ? 'block' : 'hidden'}
        `}
        data-placeholder={showPlaceholder ? placeholder : ''}
        dangerouslySetInnerHTML={{
          __html: content || '',
        }}
        {...props}
      />
    );
  },
);
BaseTextBlock.displayName = 'BaseTextBlock';
