import { motion } from 'motion/react';
import { FC, useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

interface FeatureCardProps {
  //   icon: React.ReactNode;
  index: number;
  lightImage?: string;
  darkImage?: string;
  title: string;
  description: string;
}

export const FeatureCard: FC<FeatureCardProps> = ({
  index,
  darkImage,
  lightImage,
  title,
  description,
}) => {
  const { theme } = useContext(ThemeContext);
  const Image = theme === 'light' ? lightImage : darkImage;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.2, duration: 0.2 }}
      className={`"bg-white/5 border border-light-200 dark:border-dark-50 overflow-hidden  w-full h-full grid grid-cols-1 my-10 backdrop-blur-lg rounded-2xl p-6
        before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-b dark:before:to-dark-base before:to-light-50 before:z-999
        `}
    >
      <div className="relative mt-24 z-1000 w-[70%]">
        <h3 className="font-bold text-4xl text-violet-500 mb-2">{title}</h3>
        <p className="text-dark-base dark:text-dark-700">{description}</p>
      </div>
      <div
        className="w-[60%] absolute to-0% right-[0%] 
      before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-b dark:before:to-dark-base before:to-light-50 before:z-999
      "
      >
        <motion.img
          src={Image}
          alt="Feature"
          className={`w-[100%] relative h-auto rounded-2xl transition-all`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.3, duration: 1 }}
        />
      </div>
    </motion.div>
  );
};
