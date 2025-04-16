import { CardDecoration } from '../components/publicPageComponents/CardDecoration';
import CoverImage from '../assets/img.png';
import CoverImageForLightMood from '../assets/img2.png';
import { PiShootingStarThin } from 'react-icons/pi';
import { motion } from 'motion/react';
import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

export const PublicPage: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const Image = theme === 'dark' ? CoverImage : CoverImageForLightMood;
  return (
    <div
      className="w-full relative h-full grid
      after:absolute after:top-[40%] after:-left-[30%] after:rounded-full after:w-[40%] after:h-[30%] dark:after:bg-dark-300 after:bg-light-300 after:z-99
     "
    >
      <div className="backdrop-blur-[5rem] relative z-999">
        <motion.div
          initial={{ opacity: 0, translateX: '100px' }}
          animate={{ opacity: 0.2, translateX: '0' }}
          transition={{ duration: 1 }}
          className="absolute opacity-60 max-w-[300px] bottom-[40%] left-[5%] transform translate-[-50% -50%]"
        >
          <CardDecoration />
        </motion.div>
        <div
          className="grid items-center justify-start absolute top-0 left-0 w-full h-full z-999
        
        "
        >
          <div className="flex items-center ml-32 bg-gradient-to-r from-transparent dark:to-black to-white relative flex-col mt-10  p-4 gap-4">
            <motion.h1
              initial={{ opacity: 0, translateX: '-50px' }}
              animate={{ opacity: 1, translateX: '0' }}
              transition={{ duration: 0.5 }}
              className="font-bold text-5xl text-light-950 dark:text-dark-950"
            >
              DROP EVERY <br />{' '}
              <span className="text-[5rem] ml-[5rem] text-violet-500 ">
                THOUGHT
              </span>
              <br />
              U CAN’T SAY
              <br />{' '}
              <motion.span
                initial={{ opacity: 0, translateY: '10px' }}
                animate={{ opacity: 1, translateY: '0' }}
                transition={{ duration: 1 }}
                className="text-[5rem] ml-[5rem] text-violet-500"
              >
                OUT LOUD
              </motion.span>
            </motion.h1>
            <p className="self-start text-2xl mt-4 dark:text-dark-950 text-light-950 font-bold">
              Your safe <span className="text-violet-600 font-bold">space</span>{' '}
              for daily
              <span className="text-violet-600 font-bold"> reflection.</span>
            </p>

            <button className="bottom-10 left-10 p-3 flex items-center gap-2 justify-center rounded-full w-[50%] self-start font-bold cursor-pointer hover:bg-violet-500 bg-violet-600">
              <PiShootingStarThin className="text-3xl" />
              Join the waitlist
            </button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, translateY: '50px' }}
          animate={{ opacity: 1, translateY: '0' }}
          transition={{ duration: 0.5 }}
          className="absolute
           before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-b dark:before:to-dark-base before:to-light-50 before:z-999
        top-32 right-0 h-[80%] w-[50%]"
        >
          <img src={Image} alt="" className="w-full relative z-10" />
        </motion.div>
      </div>
    </div>
  );
};
