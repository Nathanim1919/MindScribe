import { motion } from 'framer-motion';
import Image1 from '../assets/mission/img1.png';
import Image2 from '../assets/mission/img2.png';
import Image3 from '../assets/mission/img3.png';

export const WhyMindScribeExists = () => {
  const items = [
    'A place to breathe without being seen.',
    'Not judged. Just heard.',
    'You write it for you, not for likes.',
  ];

  return (
    <section className="w-[70%] mx-auto pt-20 pb-10 relative backdrop-blur-[3rem] z-100 dark:bg-dark-base bg-light-base">
      {/* Heading */}
      <motion.h1
        className="text-8xl font-bold text-light-950 dark:text-dark-950 relative mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Because some{' '}
        <span className="text-violet-500 transition-all hover:text-violet-300">
          things
        </span>{' '}
        are too{' '}
        <span className="text-violet-500 transition-all hover:text-violet-300">
          real
        </span>{' '}
        for social media
      </motion.h1>

      {/* Values with Floating Effect */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 overflow-hidden">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="flex relative flex-col items-center text-center group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.3, duration: 1 }}
          >
            <motion.img
              src={index === 0 ? Image1 : index === 1 ? Image2 : Image3}
              alt={item}
              className="w-full h-auto rounded-2xl shadow-xl transition-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + index * 0.3, duration: 1 }}
            />
            <h3 className="text-3xl p-2 bg-gradient-to-b from-transparent to-white dark:to-black h-[50%] grid place-items-center absolute bottom-0 w-full text-light-950 dark:text-dark-950 font-bold group-hover:text-violet-500">
              {item}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* Background Glow Effect */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-violet-300 to-blue-300 opacity-20 blur-3xl z-[-1]" /> */}
    </section>
  );
};
