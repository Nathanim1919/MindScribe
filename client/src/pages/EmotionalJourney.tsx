import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const journeyPhases = [
  {
    text: "You carry it quietly.",
    gradient: "from-slate-500 via-indigo-600 to-purple-500",
    bgGradient: "from-slate-900/40 via-indigo-900/20 to-black",
  },
  {
    text: "Then you begin to write.",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    bgGradient: "from-sky-900/30 via-blue-900/20 to-black",
  },
  {
    text: "The weight shifts.",
    gradient: "from-teal-400 via-emerald-500 to-green-600",
    bgGradient: "from-emerald-900/30 via-teal-900/20 to-black",
  },
  {
    text: "A breath you didn’t know you needed.",
    gradient: "from-yellow-400 via-amber-500 to-orange-600",
    bgGradient: "from-amber-900/30 via-yellow-900/20 to-black",
  },
  {
    text: "The page listens without judgment.",
    gradient: "from-rose-400 via-pink-500 to-fuchsia-600",
    bgGradient: "from-rose-900/30 via-pink-900/20 to-black",
  },
  {
    text: "Memories become meaning.",
    gradient: "from-indigo-400 via-cyan-500 to-teal-600",
    bgGradient: "from-cyan-900/30 via-teal-900/20 to-black",
  },
  {
    text: "Emotions find form. Then freedom.",
    gradient: "from-blue-400 via-purple-500 to-pink-600",
    bgGradient: "from-blue-900/30 via-indigo-900/20 to-black",
  },
  {
    text: "A diary that grows with your soul.",
    gradient: "from-fuchsia-400 via-violet-500 to-indigo-600",
    bgGradient: "from-violet-900/30 via-indigo-900/20 to-black",
  },
  {
    text: "Built for healing. Made for humans.",
    gradient: "from-lime-400 via-green-500 to-emerald-600",
    bgGradient: "from-lime-900/30 via-green-900/20 to-black",
  },
  {
    text: "Welcome to MindScribe, the future of your inner world.",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    bgGradient: "from-sky-900/30 via-blue-900/20 to-black",
  }
  
];



export const EmotionalJourney = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % journeyPhases.length);
    }, 3500); // smooth cycle

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden flex items-center justify-center bg-black z-999">
      {/* Cosmic Background Layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${journeyPhases[activeIndex].bgGradient} transition-all duration-1500`} />
        
        {/* Animated Nebula Particles */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          key={activeIndex}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/30 to-transparent blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-gradient-to-l from-cyan-400/30 to-transparent blur-2xl animate-float-medium" />
          <div className="absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-gradient-to-b from-pink-500/20 to-transparent blur-3xl animate-float-fast" />
        </motion.div>
      </div>

      {/* Blur Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative h-screen w-full max-w-4xl mx-auto z-20">
        <AnimatePresence mode="wait">
          {journeyPhases.map((phase, index) =>
            index === activeIndex ? (
              <motion.div
                key={index}
                className="absolute inset-0 flex items-center justify-center text-center px-4"
                initial={{ y: 40, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    ease: [0.33, 1, 0.68, 1],
                    duration: 1.4,
                  },
                }}
                exit={{
                  y: -40,
                  opacity: 0,
                  transition: {
                    ease: [0.65, 0, 0.35, 1],
                    duration: 0.9,
                  },
                }}
              >
                <motion.div className="relative">
                  {/* Cosmic Index Number */}
                  <motion.h2
                    className={`absolute left-1/2 -translate-x-1/2 -top-64 text-[25rem] font-black text-transparent bg-clip-text bg-gradient-to-b ${phase.gradient} opacity-10 select-none pointer-events-none z-0`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: 0.1, 
                      y: 0,
                      transition: { 
                        duration: 1.5, 
                        ease: 'easeOut' 
                      } 
                    }}
                  >
                    0{index + 1}
                  </motion.h2>

                  {/* Main Text */}
                  <motion.h1
                    className="relative z-10 font-extrabold leading-[1.1] tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] text-5xl md:text-8xl"
                    initial={{ scale: 0.97 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                  >
                    {phase.text.split(' ').map((word, wordIndex) => (
                      <motion.span
                        key={wordIndex}
                        className="inline-block whitespace-nowrap"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            delay: wordIndex * 0.07,
                            duration: 0.6,
                            ease: [0.33, 1, 0.68, 1],
                          },
                        }}
                      >
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${phase.gradient}`}>
                          {word}
                        </span>
                        &nbsp;
                      </motion.span>
                    ))}
                  </motion.h1>
                </motion.div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Cosmic Navigation Dots */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center z-30">
        <div className="flex space-x-3">
          {journeyPhases.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="relative w-3 h-3 rounded-full group"
            >
              <div className={`absolute inset-0 rounded-full transition-all duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-30 bg-white'}`} />
              <div 
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${journeyPhases[index].gradient} transition-all duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};