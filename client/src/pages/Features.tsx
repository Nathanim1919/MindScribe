// sections/FeatureShowcase.tsx
import { FeatureCard } from '../components/FeatureCard';
import darkMoodIllustrationImage from '../assets/feature/darkMoodIllustrationImage.png';
import lightMoodIllustrationImage from '../assets/feature/lightMoodIllustrationImage.png';
import DarkGalleryImage from '../assets/dark-gallery.png';
import LightGalleryImage from '../assets/gallery.png';
import darkBlockPreviewImage from '../assets/feature/darkBlockPreviewImage.png';
import lightBlockPreviewImage from '../assets/feature/lightBlockPreviewImage.png';
import { motion } from 'motion/react';
import ThemeContext from '../contexts/ThemeContext';
import { useContext } from 'react';
import { LuGalleryVerticalEnd } from 'react-icons/lu';

export const FeatureShowcase = () => {
  const { theme } = useContext(ThemeContext);
  const GalleryImage = theme === 'dark' ? DarkGalleryImage : LightGalleryImage;
  const features = [
    {
      lightImage: lightMoodIllustrationImage,
      darkImage: darkMoodIllustrationImage,
      title: 'Smart Entries',
      description:
        'Your thoughts, structured effortlessly. Just write, mindScribe gets you.',
    },
    {
      lightImage: lightMoodIllustrationImage,
      darkImage: darkMoodIllustrationImage,
      title: 'Mood Tracker',
      description:
        'Spot emotional patterns and trends without overthinking it.',
    },
    {
      lightImage: lightMoodIllustrationImage,
      darkImage: darkMoodIllustrationImage,
      title: 'Streak Journal',
      description: 'Consistency counts. Get subtle nudges, not guilt trips.',
    },
    {
      lightImage: lightBlockPreviewImage,
      darkImage: darkBlockPreviewImage,
      title: 'Block-Based Writing',
      description: 'Headers, lists, quotes, dividers. Your page, your flow.',
    },
    // {
    //   lightImage: lightBlockPreviewImage,
    //   darkImage: darkBlockPreviewImage,
    //   title: 'Visual Journaling',
    //   description:
    //     'Enhance entries with images and revisit memories in your private gallery',
    // },
    // {
    //   lightImage: lightMoodIllustrationImage,
    //   darkImage: darkMoodIllustrationImage,
    //   title: 'Private by Default',
    //   description:
    //     'What you write is yours. No likes. No shares. Just expression.',
    // },
  ];

  return (
    <section className="w-[100%] mx-auto py-24 grid grid-cols-1 gap-2 relative backdrop-blur-[3rem] z-100 dark:bg-dark-base bg-light-base">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }}
        className="text-center mb-12 w-[70%] mx-auto"
      >
        <h2 className="text-8xl text-left  font-bold text-light-950 dark:text-dark-950 mb-4">
          What Makes <span className="text-violet-500">mindScribe</span>{' '}
          Different
        </h2>
        <p className="text-light-700  text-left text-2xl dark:text-dark-700 w-[80%]">
          Dive into a space built for you, not your followers. Every feature is
          crafted with care and a touch of the future.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 h-full m-auto sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {features.map((feature, idx) => (
          <FeatureCard index={idx} key={idx} {...feature} />
        ))}
      </div>
      <div
        className="relative mt-16 w-[100%] mx-auto rounded-xl overflow-hidden
               before:absolute before:top-0 before:left-0 before:w-[20%] before:h-full before:bg-gradient-to-r before:from-light-base dark:before:from-dark-base
                              after:absolute after:top-0 after:right-0 after:w-[20%] after:h-full after:bg-gradient-to-l after:from-light-base dark:after:from-dark-base
      "
      >
        <img
          src={GalleryImage}
          alt="Gallery"
          className="w-full h-auto object-cover rounded-xl mt-10"
          loading="lazy"
        />
        <div
          className="absolute bottom-0 py-10 left-0 w-full h-full flex flex-col items-center justify-end rounded-xl
       before:absolute before:bottom-0 before:left-0 before:w-full before:h-[50%] before:bg-gradient-to-t dark:before:from-dark-base before:from-light-base
          after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b dark:after:from-dark-base after:from-light-base
       "
        >
          <h2 className="text-5xl md:text-6xl text-center md:text-left relative z-10 font-bold text-light-950 dark:text-dark-950 mb-4 leading-tight">
            Memories that <span className="text-violet-500">stay</span> just for{' '}
            <span className="text-violet-500">you</span>.
          </h2>
          <p className="text-lg md:text-xl w-[90%] md:w-[60%] text-center md:text-left relative z-10 dark:text-dark-950 text-light-950 mb-6">
            Your private gallery is more than just images — it’s a reflection of
            your moments, frozen in time. Snap, store, and revisit the emotions
            only *you* truly understand.
          </p>

          <motion.button
            // whileHover={{ scale: 1.05 }}
            // whileTap={{ scale: 0.97 }}
            // transition={{ type: 'spring', stiffness: 300 }}
            className="z-10 cursor-pointer flex items-center gap-2 relative px-8 py-3 rounded-full bg-violet-500 text-white font-semibold text-lg  hover:bg-violet-600 transition"
          >
            <LuGalleryVerticalEnd />
            Open My Gallery
          </motion.button>
        </div>
      </div>
    </section>
  );
};
