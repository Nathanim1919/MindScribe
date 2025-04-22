import { motion } from 'framer-motion';
import { 
  FaBrain, 
  FaHeartbeat,
  FaFire,
  FaLayerGroup,
  FaHistory
} from 'react-icons/fa';
import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

export const MindCore = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const mindFeatures = [
    {
      icon: <FaBrain />,
      title: "Thought Stream",
      description: "Continuous capture of your consciousness flow",
      highlights: ["Zero-input logging", "Context-aware", "Always private"]
    },
    {
      icon: <FaHeartbeat />,
      title: "Emotion Waves",
      description: "Visualize your emotional patterns over time",
      highlights: ["Biometric sync", "Non-judgmental", "Growth tracking"]
    },
    {
      icon: <FaFire />,
      title: "Focus Chains",
      description: "Build consistency without pressure",
      highlights: ["Adaptive reminders", "Process-focused", "Guilt-free"]
    },
    {
      icon: <FaLayerGroup />,
      title: "Modular Thoughts",
      description: "Organize ideas in dynamic blocks",
      highlights: ["Fluid reorganization", "Multi-dimensional", "Self-sorting"]
    }
  ];

  return (
    <section className={`relative w-full overflow-hidden dark:bg-dark-base z-999 bg-light-base py-32 px-6 transition-colors duration-500`}>
      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${isDark ? 'border-white/5' : 'border-black/5'}`}
            style={{
              width: `${Math.random() * 100 + 50}%`,
              height: "1px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
              transform: `rotate(${Math.random() * 10 - 5}deg)`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.div 
            className={`inline-block mb-6 px-4 py-1 ${isDark ? 'text-white/60' : 'text-black/60'} font-mono text-sm border ${isDark ? 'border-white/20' : 'border-black/20'} rounded-full`}
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
          >
            COGNITIVE ARCHITECTURE
          </motion.div>
          
          <h1 className={`text-5xl md:text-7xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-6 leading-tight`}>
            The mind's <br />
            <span className={`${isDark ? 'text-white' : 'text-black'} underline underline-offset-8 decoration-4 ${isDark ? 'decoration-blue-400' : 'decoration-blue-600'}`}>
              operating system
            </span>
          </h1>
          
          <p className={`${isDark ? 'text-white/60' : 'text-black/60'} max-w-3xl text-xl`}>
            Not another app. A fundamental layer for how your consciousness interacts with itself.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mindFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                borderColor: isDark ? 'rgba(100, 200, 255, 0.3)' : 'rgba(0, 100, 255, 0.3)'
              }}
              className={`border rounded-xl p-8 transition-all duration-300 ${isDark ? 'border-white/10 bg-black/50' : 'border-black/10 bg-white/50'} backdrop-blur-lg`}
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className={`p-3 rounded-full ${isDark ? 'bg-white/5 text-blue-300' : 'bg-black/5 text-blue-600'}`}
                  animate={{
                    rotate: [0, 5, -5, 0],
                    transition: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  {feature.title}
                </h3>
              </div>
              
              <p className={`mb-6 ${isDark ? 'text-white/70' : 'text-black/70'}`}>
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.highlights.map((spec, i) => (
                  <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
                    {spec}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Memory Core */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`mt-32 p-12 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-black/5'} border ${isDark ? 'border-white/10' : 'border-black/10'} backdrop-blur-lg`}
        >
          <div className="max-w-3xl">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              Your <span className={`${isDark ? 'text-blue-300' : 'text-blue-600'}`}>entire mind</span>, <br />
              perfectly preserved
            </h2>
            
            <p className={`text-lg mb-8 ${isDark ? 'text-white/70' : 'text-black/70'}`}>
              Unlike social media that distorts memories into performances, 
              MindScribe maintains your consciousness in its pure state - 
              private, unfiltered, and evolving.
            </p>
            
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: isDark ? "0 0 20px rgba(100, 200, 255, 0.2)" : "0 0 20px rgba(0, 100, 255, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              className={`px-8 py-4 rounded-full font-bold flex items-center gap-3 ${isDark ? 'bg-blue-400 text-black' : 'bg-blue-600 text-white'}`}
            >
              <FaHistory />
              Begin Consciousness Log
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};