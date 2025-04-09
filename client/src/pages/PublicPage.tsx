import { CardDecoration } from '../components/publicPageComponents/CardDecoration';
import CoverImage from '../assets/img.png';
import { PiShootingStarThin } from 'react-icons/pi';
import { motion } from 'motion/react';

export const PublicPage: React.FC = () => {
  return (
    <div
      className="w-full relative h-full grid
      before:absolute before:transform before:rotate-12 before:-top-[5%] before:right-[20%] before:rounded-full before:w-[30%] before:h-[70%] before:bg-violet-600 before:z-999
      after:absolute after:top-[20%] after:-left-[30%] after:rounded-full after:w-[40%] after:h-[50%] after:bg-gray-600 after:z-99

     "
    >
      <div className="backdrop-blur-3xl relative z-999">
        <motion.div
          initial={{ opacity: 0, translateX: '100px' }}
          animate={{ opacity: .6, translateX: '0' }}
          transition={{ duration: 1 }}
          className="absolute opacity-60 max-w-[300px] bottom-[50%] left-[5%] transform translate-[-50% -50%]"
        >
          <CardDecoration />
        </motion.div>
        <div
          className="grid items-center justify-start absolute top-0 left-0 w-full h-full z-999
        
        "
        >
          <div className="flex items-center ml-32 relative flex-col -mt-10  p-4 gap-4">
            <motion.h1
              initial={{ opacity: 0, translateX: '-50px' }}
              animate={{ opacity: 1, translateX: '0' }}
              transition={{ duration: 0.5 }}
              className="font-bold text-5xl"
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
            <p className="self-start text-2xl mt-4">
              Your safe <span className="text-violet-600 font-bold">space</span>{' '}
              for daily
              <span className="text-violet-600 font-bold"> reflection.</span>
            </p>
            <button className="bottom-10 left-10 p-3 flex items-center gap-2 justify-center rounded-full w-[50%] self-start font-bold cursor-pointer hover:bg-violet-500 bg-violet-600">
              <PiShootingStarThin className="text-3xl" />
              Start Now
            </button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, translateY: '50px' }}
          animate={{ opacity: 1, translateY: '0' }}
          transition={{ duration: 0.5 }}
          className="absolute
           before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-b before:to-dark-base before:z-999
        top-24 right-0 h-[80%] w-[50%]"
        >
          <img src={CoverImage} alt="" className="w-full relative z-10" />
        </motion.div>
      </div>
    </div>
  );
};
