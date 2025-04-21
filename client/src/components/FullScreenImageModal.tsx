import { motion, AnimatePresence } from 'framer-motion';
import { ImageCardProps } from '../types/sideBar.type';

interface FullScreenImageModalProps {
  image: ImageCardProps;
  onClose: () => void;
}

export const FullScreenImageModal: React.FC<FullScreenImageModalProps> = ({
  image,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 top-0 left-0 bg-black/40 backdrop-blur-sm z-999 flex items-center justify-center cursor-zoom-out"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 0 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 100 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl h-[90%] rounded-xl relative"
          >
            <img
              src={image.url}
              alt={image.entrieId}
              className="h-[100%] rounded-2xl  overflow-hidden object-contain pointer-events-none"
            />
            <div className="absolute bottom-0 w-full h-full text-white p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
              <h2 className="font-semibold">{image.caption}</h2>
              <p className="text-sm opacity-70">{image.date}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
