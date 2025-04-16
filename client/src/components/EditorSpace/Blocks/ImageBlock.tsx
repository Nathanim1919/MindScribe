// components/blocks/ImageBlock.tsx

import { useMemo } from 'react';
import { BlockType } from '../../../types/block.interface';
import { getActionDecorators } from '../../../utils/decorators';
import { BlockWrapper } from './BlockWrapper';
import { motion } from 'motion/react';

type ImageBlockProps = {
  block: BlockType;
  blockId: string;
  imageUrl: string;
  caption?: string;
  isFocused: boolean;
  onAddClick: () => void;
  onDragClick: () => void;
  onImageClick?: () => void;
  onCaptionChange?: (newCaption: string) => void;
};

export function ImageBlock({
  block,
  blockId,
  imageUrl,
  caption = '',
  isFocused,
  onAddClick,
  onDragClick,
  onImageClick,
}: ImageBlockProps) {
  const decorators = useMemo(
    () => [...getActionDecorators(onAddClick, onDragClick)],
    [onAddClick, onDragClick],
  );

  return (
    <BlockWrapper
      block={block}
      blockId={blockId}
      isFocused={isFocused}
      className={`p-1 rounded-md text-gray-500 dark:text-dark-500 relative`}
      decorators={decorators}
    >
      <motion.div
        initial={{ opacity: 0, translateY: '2px' }}
        animate={{ opacity: 1, translateY: '0px' }}
        transition={{ duration: 0.4 }}
        data-block-id={blockId}
        onClick={onImageClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onImageClick?.();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Image block"
        className="flex relative flex-col items-center gap-2 hover:opacity-75"
      >
        {/* <img
          src={imageUrl}
          alt="Image block"
          className={`rounded-lg relative max-w-full cursor-pointer`}
          onClick={onImageClick}
        /> */}
        <div className='w-10 h-10 bg-dark-500'>

        </div>
        {caption && (
          <div className="text-sm text-gray-500 dark:text-gray-400 w-full text-center">
            {caption}
          </div>
        )}
      </motion.div>
    </BlockWrapper>
  );
}
