import { useState } from 'react';
import { IImageBlock } from '../../../types/block.interface';

interface ImageBlockProps {
  block: IImageBlock;
  id: string;
  isFocused: boolean;
  onClick: () => void;
//   onCaptionChange: (caption: string) => void;
//   onRemove: () => void;
//   onReplace: () => void;
}

export const ImageBlock = ({
  block,
  id,
  isFocused,
  onClick,
//   onCaptionChange,
//   onRemove,
//   onReplace,
}: ImageBlockProps) => {
  const [caption, setCaption] = useState(block.caption || '');

  const handleCaptionChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newCaption = (e.target as HTMLDListElement).innerText;
    setCaption(newCaption);
    // onCaptionChange(newCaption);
  };

  return (
    <div
      className={`group relative w-full py-4 ${
        block.meta?.alignment === 'center' ? 'flex justify-center' : ''
      }`}
      onClick={onClick}
      data-focused={isFocused}
    >
      <div className="relative">
        <img
          src={block.url}
          alt="User uploaded"
          className="rounded-lg max-w-full max-h-[500px] object-contain"
          style={{ width: block.meta?.width ?? '100%' }}
        />

        {/* Toolbar */}
        {isFocused && (
          <div className="absolute top-2 right-2 flex gap-2 bg-black/60 text-white rounded-md p-1 z-10">
            <button  className="text-sm hover:underline">
              Replace
            </button>
            <button  className="text-sm hover:underline">
              Remove
            </button>
          </div>
        )}
      </div>
      {/* Caption */}
      <div
        contentEditable
        suppressContentEditableWarning
        onInput={handleCaptionChange}
        className="text-center text-sm text-gray-500 mt-2 focus:outline-none"
        data-placeholder="Add a caption..."
      >
        {caption}
      </div>
    </div>
  );
};
