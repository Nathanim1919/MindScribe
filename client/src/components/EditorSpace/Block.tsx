import React, { useEffect, useMemo, useRef } from 'react';
import { BlockDecorator } from '../../types/decorators';
import { BlockType } from '../../types/block.interface';
import { motion } from 'motion/react';

interface BaseBlockProps {
  block: BlockType;
  blockId: string;
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
  decorators?: BlockDecorator[];
  contentClassName?: string;
  actionDecorators?: BlockDecorator[];
}

export const BaseBlock = React.forwardRef<HTMLDivElement, BaseBlockProps>(
  (
    { decorators = [], actionDecorators = [], contentClassName = '', ...props },
    ref,
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const resolvedRef = (ref || internalRef) as React.RefObject<HTMLDivElement>;

    // Add decorators to the content
    const [isHovered, setIsHovered] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(props.isFocused);
    // Combine all decorators
    const allDecorators = [...(decorators || []), ...actionDecorators];

    useEffect(() => {
      setIsFocused(props.isFocused);
    }, [props.isFocused]);

    const visibleDecorators = useMemo(() => {
      return allDecorators.filter((d) => {
        const isEmpty = !props.content?.trim();
        switch (d.visibility) {
          case 'always':
            return true;
          case 'hover':
            return isHovered;
          case 'focus':
            return isFocused;
          case 'empty':
            return isEmpty;
          default:
            return true;
        }
      });
    }, [decorators, isHovered, isFocused, props.content]);

    const spacingClasses = {
      small: 'py-1',
      medium: 'py-2',
      large: 'py-4',
    };

    useEffect(() => {
      if (
        resolvedRef.current &&
        props.content !== resolvedRef.current.innerText
      ) {
        resolvedRef.current.innerText = props.content ?? '';
      }
    }, [props.content]);

    return (
      <div
        className={`flex w-full h-full group items-center gap-2 ${props.className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Decorators */}
        <div
          className={`flex items-center dark:text-dark-400 text-light-400 self-start gap-1 ${spacingClasses[props.spacing??"large"]}`}
        >
          {visibleDecorators
            .filter((d) => d.position === 'prefix')
            .map((d) => (
              <div
                key={d.id}
                className="inline-flex items-center justify-center h-[24px] w-[24px]"
                onMouseDown={(e) => {
                  e.preventDefault(); // Critical for contentEditable
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.currentTarget.querySelector('button')?.click();
                }}
              >
                <d.component block={props.block} />
              </div>
            ))}
        </div>
        {/* Content */}
        <div className={`flex-1 min-w-0 h-full`}>
          <motion.div
            draggable={true}
            initial={{opacity:0, translateY:"2px"}}
            animate={{opacity:1,translateY:"0px"}}
            transition={{duration:.4}}
            ref={resolvedRef}
            data-focused={isFocused}
            data-block-id={props.blockId}
            aria-label={`Editable block ${props.blockId}`}
            dangerouslySetInnerHTML={{ __html: props.content ?? '' }}
            contentEditable={true}
            onClick={props.onClick}
            onKeyDown={props.onKeyDown}
            spellCheck={false}
            onInput={props.onInput}
            onBlur={props.onBlur}
            className={`
            leading-tight relative w-full 
            ${spacingClasses[props.spacing ?? 'large']} 
            outline-none break-words
            before:absolute before:text-dark-500 
            before:font-light before:grid before:place-content-center 
            before:h-full before:pointer-events-none 
            before:content-[attr(data-placeholder)] before:top-0 before:left-0
            ${contentClassName}
          `}
            data-placeholder={props.showPlaceholder ? props.placeholder : ''}
          />
        </div>

        <div className="flex items-center" contentEditable={false}>
          {visibleDecorators
            .filter((d) => d.position === 'suffix')
            .map((d) => (
              <d.component key={d.id} block={props.block} />
            ))}
        </div>
      </div>
    );
  },
);

BaseBlock.displayName = 'BaseBlock';
