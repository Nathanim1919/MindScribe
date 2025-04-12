import { useState } from "react";

type ImageBlockProps = {
  imageUrl: string;
  caption?: string;
  onReplace?: () => void;
  onCaptionChange?: (newCaption: string) => void;
};

export function ImageBlock({
  imageUrl,
  caption = "",
  onReplace,
  onCaptionChange,
}: ImageBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentCaption, setCurrentCaption] = useState(caption);

  const handleBlur = () => {
    setIsEditing(false);
    if (currentCaption !== caption) {
      onCaptionChange?.(currentCaption);
    }
  };

  return (
    <div className="group relative flex flex-col items-center">
      <img
        src={imageUrl}
        alt="Image block"
        className="rounded-lg max-w-full"
      />
      {onReplace && (
        <button
          onClick={onReplace}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-white/80 hover:bg-white text-sm px-2 py-1 rounded shadow transition"
        >
          Replace
        </button>
      )}

      <div className="mt-2 w-full text-center">
        {isEditing ? (
          <input
            type="text"
            value={currentCaption}
            autoFocus
            onBlur={handleBlur}
            onChange={(e) => setCurrentCaption(e.target.value)}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black text-sm p-1 bg-transparent"
          />
        ) : (
          <p
            onClick={() => setIsEditing(true)}
            className="text-sm text-gray-500 cursor-text hover:underline"
          >
            {caption || "Add a caption..."}
          </p>
        )}
      </div>
    </div>
  );
}
