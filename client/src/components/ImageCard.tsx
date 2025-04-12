interface ImageCardprops {
  caption: string;
  url: string;
  date: string;
  entrieId: string;
  sentiment?: string;
}

export const ImageCard: React.FC<ImageCardprops> = ({
  caption,
  url,
  date,
  entrieId,
  sentiment,
}) => {
  return (
    <div className="bg-orange-300 relative group">
      <div className="absolute  top-0 left-0 w-full flex items-center justify-between p-4 bg-gradient-to-b from-black to- text-white">
        <span>{sentiment ?? 'Happy'}</span>
        <span>{date ?? 'Jan 22, 2025'}</span>
      </div>
      <img
        src={url}
        alt={`Image ${url}`}
        className="w-full rounded-lg shadow-md break-inside-avoid"
      />
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-between p-4 bg-gradient-to-t from-black to- text-white">
        <p>{caption.slice(0, 100)}...</p>
      </div>
    </div>
  );
};
