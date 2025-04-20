import { motion } from 'framer-motion';

interface ImageCardProps {
  caption: string;
  url: string;
  date: string;
  entrieId: string;
  sentiment?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  caption,
  url,
  date,
  entrieId,
  sentiment = 'Happy',
}) => {
  const formattedDate = date || 'Jan 22, 2025';
  const truncatedCaption =
    caption.length > 50 ? `${caption.slice(0, 50)}...` : caption;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group cursor-pointer rounded-xl shadow-lg overflow-hidden bg-orange-300"
    >
      {/* Image with hover zoom effect */}
      <motion.div
        className="relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={url}
          alt={`Image ${entrieId}`}
          className="w-full h-auto object-cover rounded-xl break-inside-avoid"
          loading="lazy"
        />
      </motion.div>

      {/* Top overlay (sentiment + date) - controlled by parent hover */}
      {/* <div
        className="absolute top-0 left-0 w-full group-hover:translate-y-0 group-hover:opacity-100 p-3 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"
      >
        <div className="flex justify-between items-center text-white text-sm">
          <span className="font-medium capitalize">{sentiment}</span>
          <span className="opacity-90">{formattedDate}</span>
        </div>
      </div> */}

      {/* Bottom overlay (caption) - controlled by parent hover */}
      {/* <div
        className="absolute transform translate-y-[100%] group-hover:translate-0 transition-all duration-200 bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"
      >
        <p className="text-white text-sm font-medium">{truncatedCaption}</p>
      </div> */}
    </motion.div>
  );
};