import React, { useMemo, useState } from 'react';
import { BlockType } from '../../../types/block.interface';
import { BlockDecorator } from '../../../types/decorators';

interface BlockWrapperProps {
  children: React.ReactNode;
  isFocused: boolean;
  block: BlockType;
  blockId: string;
  className?: string;
  decorators?: BlockDecorator[];
}

export const BlockWrapper = React.memo(
  ({
    children,
    isFocused,
    block,
    blockId,
    className = '',
    decorators = [],
  }: BlockWrapperProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const visibleDecorators = useMemo(() => {
      return decorators.filter((d) => {
        switch (d.visibility) {
          case 'always':
            return true;
          case 'hover':
            return isHovered;
          case 'focus':
            return isFocused;
          default:
            return true;
        }
      });
    }, [decorators, isHovered, isFocused]);

    return (
      <div
        className={`block-wrapper group relative w-full flex ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-block-id={blockId}
      >
        <DecoratorSide
          position="prefix"
          decorators={visibleDecorators}
          block={block}
        />

        <>{children}</>

        <DecoratorSide
          position="suffix"
          decorators={visibleDecorators}
          block={block}
        />
      </div>
    );
  },
);

const DecoratorSide = React.memo(
  ({
    position,
    decorators,
    block,
  }: {
    position: 'prefix' | 'suffix';
    decorators: BlockDecorator[];
    block: BlockType;
  }) => (
    <div className={`decorator-side ${position} flex`}>
      {decorators
        .filter((d) => d.position === position)
        .map((d) => (
          <DecoratorItem key={d.id} decorator={d} block={block} />
        ))}
    </div>
  ),
);

const DecoratorItem = React.memo(
  ({ decorator, block }: { decorator: BlockDecorator; block: BlockType }) => (
    <div className="decorator-item">
      <decorator.component block={block} />
    </div>
  ),
);

BlockWrapper.displayName = 'BlockWrapper';
DecoratorSide.displayName = 'DecoratorSide';
DecoratorItem.displayName = 'DecoratorItem';
