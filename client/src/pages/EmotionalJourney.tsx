import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const journeyPhases = [
  { text: 'You hold it in.', color: 'bg-black' },
  { text: 'Then you write.', color: 'bg-gray-900' },
  { text: 'It softens.', color: 'bg-gray-800' },
  { text: 'You feel lighter.', color: 'bg-gray-700' },
  { text: "It’s still yours. Always.", color: 'bg-gray-600' },
];

export const EmotionalJourney = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const total = journeyPhases.length;

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#000000', '#1F1F1F', '#3A3A3A', '#4F4F4F', '#666666']
  );

  const heroScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, -5]);
  const heroY = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-20%', '10%']);

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative h-[600vh] w-full"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: heroScale, rotate: heroRotate, y: heroY }}
          className="absolute w-64 h-64 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl"
        >
          AirPods Placeholder
        </motion.div>

        {journeyPhases.map((phase, index) => {
          const start = index / total;
          const end = (index + 1) / total;

          const opacity = useTransform(scrollYProgress, [start, end - 0.1, end], [0, 1, 0]);
          const y = useTransform(scrollYProgress, [start, end - 0.1, end], ['20%', '0%', '-20%']);
          const scale = useTransform(scrollYProgress, [start, end - 0.1, end], [0.8, 1, 0.8]);

          return (
            <motion.div
              key={index}
              style={{ opacity, y, scale }}
              className="absolute text-white text-3xl sm:text-5xl md:text-6xl font-bold text-center px-6 max-w-3xl"
            >
              {phase.text}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default EmotionalJourney;