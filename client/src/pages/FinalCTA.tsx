import { motion } from 'framer-motion';

export const FinalCTA = () => {
  return (
    <section className="w-[70%] mx-auto grid place-items-center dark:bg-dark-base backdrop-blur-2xl relative z-999 py-28 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative z-999">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="text-3xl md:text-6xl font-bold text-light-900 dark:text-dark-950 mb-10 leading-snug"
        >
          You deserve to be <span className="text-violet-500">heard</span> even
          if it’s just by <span className="text-violet-500">you</span>.
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="bg-white text-dark-base text-lg md:text-xl px-8 py-3 font-bold cursor-pointer rounded-full shadow-lg hover:shadow-2xl transition duration-300"
        >
          Start Writing
        </motion.button>
      </div>
      <motion.div className="absolute opacity-55 w-[800px] h-[800px] top-0 grid place-items-center rounded-full bg-violet-500/20 dark:bg-violet-500/10">
        <motion.div className="w-[85%] h-[85%] rounded-full  dark:bg-violet-400/15 grid place-items-center bg-violet-400/50">
          <motion.div className="w-[85%] h-[85%]  rounded-full dark:bg-violet-300/20 grid place-items-center bg-violet-300/50">
            <motion.div className="w-[85%] h-[85%]  rounded-full dark:bg-violet-200/25 grid place-items-center bg-violet-200/50">
              <motion.div className="w-[85%] h-[85%]  rounded-full dark:bg-violet-100/25 grid place-items-center bg-violet-100/50">
                <motion.div className="w-[85%] h-[85%]  rounded-full dark:bg-violet-50/30 grid place-items-center bg-violet-50/50"></motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
