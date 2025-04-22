// Import your images
import { FaHeart, FaHistory, FaLock } from 'react-icons/fa';
import SafeSpaceImg from '../assets/mission/img1.png';
import HonestWritingImg from '../assets/mission/img2.png';
import TimeCapsuleImg from '../assets/mission/img3.png';
import { motion } from 'motion/react';

export const WhyMindScribeExists = () => {
  const values = [
    {
      icon: <FaLock className="text-blue-500" />,
      title: 'Your Private Safe Space',
      description:
        'A completely secure place just for you, where no one else can peek',
      image: SafeSpaceImg,
      highlights: [
        'No ads, no tracking',
        'Encrypted like a bank',
        'Only you have the key',
      ],
    },
    {
      icon: <FaHeart className="text-pink-500" />,
      title: 'Honest Writing',
      description:
        'Write what you really feel without worrying about likes or shares',
      image: HonestWritingImg,
      highlights: [
        'No perfect photos needed',
        'No pressure to perform',
        'Just your true thoughts',
      ],
    },
    {
      icon: <FaHistory className="text-purple-500" />,
      title: 'Your Personal Time Machine',
      description: "See how you've grown by revisiting past entries",
      image: TimeCapsuleImg,
      highlights: [
        'Watch yourself evolve',
        'Remember special moments',
        'Learn from your past',
      ],
    },
  ];

  return (
    <section className="relative z-999 w-full overflow-hidden bg-gradient-to-b dark:bg-dark-base bg-light-base py-20 px-6">
      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-100/30"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-dark-base dark:text-light-base mb-6">
            Some things are too <span className="text-blue-600">real</span>
            <br />
            for social media
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            MindScribe is where your private thoughts can breathe freely
          </p>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-light-base dark:bg-dark-base rounded-xl overflow-hidden border dark:border-dark-100"
            >
              <div className="h-48 overflow-hidden">
                <motion.img
                  src={value.image}
                  alt={value.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="p-6">
                <div className="w-12 h-12 rounded-full dark:bg-dark-100 flex items-center justify-center mb-4">
                  {value.icon}
                </div>

                <h3 className="text-xl font-bold text-light-950 dark:text-dark-950 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 mb-4">{value.description}</p>

                <ul className="space-y-2">
                  {value.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <svg
                        className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Start Your Private Journal
          </motion.button>
          <p className="text-gray-500 mt-4 text-sm">
            No credit card needed • Your data stays yours
          </p>
        </motion.div>
      </div>
    </section>
  );
};
