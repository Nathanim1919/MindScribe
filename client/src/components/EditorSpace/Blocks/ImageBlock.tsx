import { useEffect, useMemo, useRef, useState } from 'react';
import {
  IImageBlock,
  ImageType,
} from '../../../types/block.interface';
import { getActionDecorators } from '../../../utils/decorators';
import { BlockWrapper } from './BlockWrapper';
import { motion } from 'motion/react';
import { FaPlus } from 'react-icons/fa6';
import { useBlockContext } from '../../../contexts/BlockContext';
import { SingleImagePreview } from '../../SingleImagePreview';

type ImageBlockProps = {
  block: IImageBlock;
  blockId: string;
  urls: ImageType[];
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
  urls,
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
  const { updateBlock } = useBlockContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const updateImageBlock = (url: ImageType) => {
    // Prevent duplicates by checking URL match
    const isDuplicate = urls.some((img) => img.url === url.url);
    if (isDuplicate) return;

    updateBlock(blockId, {
      ...block,
      urls: [...urls, url],
    } as Partial<IImageBlock>);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    updateImageBlock({
      url: objectUrl,
      alt: file.name,
      caption: file.name,
    });

    // Clear file input value to allow re-selection of the same file
    e.target.value = '';
  };


  useEffect(()=> {
    console.log(block.urls)
  }, [block.urls])

  return (

    <BlockWrapper
      block={block}
      blockId={blockId}
      isFocused={isFocused}
      className="p-1 rounded-md group text-gray-500 dark:text-dark-500 relative"
      decorators={decorators}
    >
      <SingleImagePreview url={previewUrl}/>
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
        className="columns-2 md:columns-3 lg:columns-4 hover:bg-light-100 hover:dark:bg-dark-100 p-4 rounded-2xl gap-2 space-y-2"
      >
        {urls?.length > 0 &&
          urls.map((url, index) => (
            <img
              key={index}
              src={url.url}
              alt={url.alt || 'Image'}
              className="rounded-lg hover:opacity-60 h-auto w-full relative cursor-pointer"
              onClick={
                () => setPreviewUrl(url.url)
              }
            />
          ))}

        {caption && (
          <div className="text-sm text-gray-500 dark:text-gray-400 w-full text-center">
            {caption}
          </div>
        )}
      </motion.div>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Add image button */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="group-hover:grid hidden absolute -top-1 -right-1 w-6 border border-dark-200 h-6 rounded-lg bg-light-200 dark:bg-dark-200 items-center justify-center cursor-pointer hover:bg-transparent"
      >
        <FaPlus />
      </div>
    </BlockWrapper>
  );
}
