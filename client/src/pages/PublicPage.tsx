import { CardDecoration } from '../components/publicPageComponents/CardDecoration';
import CoverImage from '../assets/img.png';
import CoverImageForLightMood from '../assets/img2.png';
import { motion } from 'motion/react';
import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import { Link } from '@tanstack/react-router';

export const PublicPage: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const Image = theme === 'dark' ? CoverImage : CoverImageForLightMood;
  return (
    <div
      className="w-full relative h-screen overflow-hidden grid
      after:absolute after:top-[40%] after:-left-[30%] after:rounded-full after:w-[40%] after:h-[30%] dark:after:bg-dark-300 after:bg-light-300 after:z-99
     "
    >
      <div className="backdrop-blur-[5rem] relative z-999">
        <motion.div
          initial={{ opacity: 0, translateX: '100px' }}
          animate={{ opacity: 0.2, translateX: '0' }}
          transition={{ duration: 1 }}
          className="absolute opacity-60 max-w-[300px] bottom-[10%] md:bottom-[40%] left-[5%] transform translate-[-50% -50%]"
        >
          <CardDecoration />
        </motion.div>
        <div
          className="grid items-center justify-start absolute mt-48 left-0 w-full z-999
        
        "
        >
          <div className="flex justify-center w-full md:w-[60%] ml-8 md:ml-32 relative z-999 flex-col p-4 gap-4">
            <motion.h1
              initial={{ opacity: 0, translateX: '-50px' }}
              animate={{ opacity: 1, translateX: '0' }}
              transition={{ duration: 0.5 }}
              className="font-bold text-5xl lg:text-7xl w-[70%] text-light-950 dark:text-dark-950"
            >
              Where your <span className="text-violet-">silence</span>{' '}
              <span className="text-violet-500">speaks</span> volumes.
            </motion.h1>
            <p className="w-[70%] dark:text-dark-500 text-light-700 py-2">
              Your <span className="text-violet-500">thoughts</span> deserve
              more than a passing moment. <br />
              Welcome to the place where they{' '}
              <span className="text-violet-500">breathe</span>.
            </p>

            <Link to={'/register'} className="px-6 py-3 flex items-center gap-2 justify-center rounded-full self-start font-bold cursor-pointer hover:bg-violet-500 bg-violet-600">
              Begin Your First Page
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, translateY: '50px' }}
          animate={{ opacity: 1, translateY: '0' }}
          transition={{ duration: 0.5 }}
          className="absolute
           before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-b dark:before:to-dark-base before:to-light-50 before:z-998 top-20
        md:top-32 right-0 mx-auto w-[95%] md:w-[55%]"
        >
          <img src={Image} alt="" className="w-full relative z-10" />
        </motion.div>
      </div>
    </div>
  );
};
