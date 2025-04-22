import { motion, AnimatePresence } from 'framer-motion';
import { ImageCardProps } from '../types/sideBar.type';
import { ImageCard } from './ImageCard';
import { FaBook } from 'react-icons/fa';
import { BiPhotoAlbum } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import { useState } from 'react';

interface FullScreenImageModalProps {
  image: ImageCardProps;
  onClose: () => void;
}

export const FullScreenImageModal: React.FC<FullScreenImageModalProps> = ({
  image,
  onClose,
}) => {
  const imageCards: ImageCardProps[] = [
    {
      url: 'https://i.pinimg.com/736x/91/73/81/9173810ba09086fb5a64508539682f89.jpg',
      caption: 'Light through the frame',
      date: '2025-04-17',
      entrieId: 'entry-030',
    },
    {
      url: 'https://i.pinimg.com/736x/57/9c/e5/579ce501b8c6d2a3731b4950cdb60500.jpg',
      caption: 'Architectural still frame',
      date: '2025-04-17',
      entrieId: 'entry-031',
    },
    {
      url: 'https://i.pinimg.com/736x/dd/03/87/dd0387b326ea9870be9818b459f1429f.jpg',
      caption: 'Moody expression frame',
      date: '2025-04-17',
      entrieId: 'entry-032',
    },
    {
      url: 'https://miro.medium.com/v2/resize:fit:596/1*CbqS79EgxBX19ZDuv5g8TA.png',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',

      date: '2025-04-17',
      entrieId: 'entry-033',
    },
    {
      url: 'https://i.pinimg.com/736x/e1/e5/61/e1e56172432d601265eca5897a9b5612.jpg',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',

      date: '2025-04-17',
      entrieId: 'entry-034',
    },
    {
      url: 'https://i.pinimg.com/736x/26/51/e0/2651e0814b8874602dcc80e4d99cccfe.jpg',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',

      date: '2025-04-17',
      entrieId: 'entry-035',
    },
    {
      url: 'https://i.pinimg.com/736x/4b/c8/4d/4bc84d6ab1a54bdb943c69be9a80e479.jpg',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',

      date: '2025-04-17',
      entrieId: 'entry-036',
    },
    {
      url: 'https://i.pinimg.com/236x/d6/46/20/d64620e0802d2a47aff2746b64c5d04a.jpg',
      caption: 'Cozy vibes with soft tones',
      date: '2025-04-17',
      entrieId: 'entry-001',
    },
    {
      url: 'https://i.pinimg.com/736x/c6/e7/59/c6e7598370a4c18f47d634bfa90728fb.jpg',
      caption: 'Abstract interior mood',
      date: '2025-04-17',
      entrieId: 'entry-002',
    },
    {
      url: 'https://i.pinimg.com/564x/2b/6c/5a/2b6c5a40327e37d22edef09fb4d8f6b1.jpg',
      caption: 'Muted colors for calm minds',
      date: '2025-04-17',
      entrieId: 'entry-003',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXFR675N9W8NrLUaq5JCOQIiw79UKmSCtOmg&s',
      caption: 'Gritty grayscale vibes',
      date: '2025-04-17',
      entrieId: 'entry-004',
    },
    {
      url: 'https://i.pinimg.com/736x/1b/23/1d/1b231dad54d12e2ab78f7c1d61f8d082.jpg',
      caption: 'Dreamy windowscape',
      date: '2025-04-17',
      entrieId: 'entry-005',
    },
    {
      url: 'https://i.pinimg.com/236x/2b/a3/02/2ba30260741ec7166aa4e4d6b72e5d80.jpg',
      caption: 'Chill tones, studio setup',
      date: '2025-04-17',
      entrieId: 'entry-006',
    },
    {
      url: 'https://i.pinimg.com/1200x/4f/5c/a8/4f5ca85bd4eca287e8888f83f8928c1d.jpg',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',

      date: '2025-04-17',
      entrieId: 'entry-037',
    },
    {
      url: 'https://i.pinimg.com/736x/55/17/f5/5517f55e57cad053f14d09d4e93bcc55.jpg',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',

      date: '2025-04-17',
      entrieId: 'entry-038',
    },
    {
      url: 'https://i.pinimg.com/564x/ea/c2/4c/eac24c05d1e1bcde2d61b09a68e51bc4.jpg',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',

      date: '2025-04-17',
      entrieId: 'entry-039',
    },
    {
      url: 'https://i1.sndcdn.com/artworks-hHMcACZ5sR4nUVde-5SZb1Q-t1080x1080.jpg',
      caption:
        'Inspiried by the thing i have never done before and the passion i have for it',
      date: '2025-04-17',
      entrieId: 'entry-040',
    },
  ];
  const [selectedImage, setSelectedImage] = useState<null | ImageCardProps>(
    null,
  );
  return (
    <div className="fixed inset-0 top-0 left-0  bg-black/20 backdrop-blur-sm z-999 flex items-center justify-center cursor-zoom-out">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="w-[70%] rounded-3xl relative max-h-screen overflow-hidden dark:bg-dark-base bg-light-base grid place-items-center grid-cols-2"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, y: 0 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 100 }}
          transition={{ duration: 0.1 }}
          className="h-[700px] w-full relative "
        >
          <img
            src={image.url}
            alt={image.entrieId}
            className="w-full h-full object-cover"
            loading="lazy"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-0 flex flex-col justify-end w-full h-full text-white p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="font-semibold">{image.caption}</h2>
            <p className="text-sm opacity-70 self-end">{image.date}</p>
          </div>
        </motion.div>
        <div className="w-full h-full relative flex flex-col place-self-start gap-4 bg-light-base dark:bg-dark-base">
          <div className="flex flex-col gap-2 p-4 py-2">
            <h1 className="text-2xl font-bold flex items-center gap-1 dark:text-dark-950">
              <FaBook />
              Moments of Stillness and Light
            </h1>
            <p className="text-sm text-muted-foreground text-light-500">
              Today unfolded with a quiet beauty — soft light spilling through
              the windows, a calm pace, and the kind of introspection that only
              comes when you slow down enough to notice the little things. I
              found peace in the simplicity of it all.
            </p>
          </div>

          <div className="relative p-4 py-0 h-[550px] overflow-hidden overflow-y-auto rounded-lg">
            <h2 className="font-bold sticky top-0 bg-light-base dark:text-dark-950 dark:bg-dark-base z-99 text-2xl flex items-center gap-1">
              <BiPhotoAlbum />
              Photos from This Day
            </h2>
            <div className="md:columns-3 lg:columns-4 gap-2 overflow-auto space-y-2 py-2 rounded-lg">
              {imageCards.map((img, idx) => (
                <ImageCard
                  index={idx}
                  key={img.url}
                  onClick={() => setSelectedImage(img)}
                  url={img.url}
                  date="Jan 22, 2025"
                  entrieId="jkhkjwhdkjkasj"
                  caption={`Reflection ${idx + 1}: A moment captured — full of color, calm, and quiet emotion.`}
                />
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 w-full h-[100px] bg-gradient-to-t from-light-base dark:from-dark-base  p-4 grid place-items-end">
            <button className="flex items-center gap-2 hover:opacity-45 justify-end text-dark rounded-2xl  transition-all py-1 px-2 cursor-pointer dark:text-light-base text-dark-base">
              Open Full Entry <IoIosArrowForward />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
