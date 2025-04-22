import { motion } from 'framer-motion';

export const FinalCTA = () => {
  return (
    <section className="relative h-screen bg-dark-base z-999 w-full overflow-hidden bg-neuralblack flex items-center justify-center">
      {/* Quantum Data Stream */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(32)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 bg-neonblue/30"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 100}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: Math.random() * 0.5,
            }}
            animate={{
              y: [0, window.innerHeight * 1.5],
              x: [0, (Math.random() - 0.5) * 300],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Holographic Interface */}
      <motion.div
        className="relative z-10 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Neural Activation Prompt */}
        <div className="mb-16 overflow-hidden">
          <motion.div
            className="text-neonpink text-lg md:text-xl font-mono mb-2"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            [SYSTEM PROMPT] MindScribe Core Online
          </motion.div>
          <motion.h2
            className="text-5xl md:text-8xl font-bold leading-none tracking-tighter"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              textShadow: '0 0 20px rgba(110, 231, 255, 0.5)',
            }}
            transition={{ duration: 1.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonblue to-neonpink">
              BEGIN MEMORY SYNTHESIS
            </span>
            <br />
            <span className="text-white">Capture What You Feel</span>
          </motion.h2>

          <p className="mt-6 text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            MindScribe is your personal memory interface — a journal powered by
            subtle intelligence, designed to help you reflect, record, and
            reconnect with yourself. You write. It listens. Together, you
            remember.
          </p>
        </div>

        {/* Neural Data Modules */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div className="text-white/50 text-sm font-mono uppercase tracking-wide mb-4 text-center">
            Active Neural Inputs
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { text: 'Neural patterns', color: 'from-neonblue to-cyangreen' },
              { text: 'Emotional data', color: 'from-neonpink to-purple-400' },
              {
                text: 'Temporal imprints',
                color: 'from-neonyellow to-neonorange',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className={`h-1 mb-4 bg-gradient-to-r ${item.color}`} />
                <div className="text-white/70 font-mono text-sm">{`0${i + 1}`}</div>
                <div className="text-white text-xl font-medium mt-2">
                  {item.text}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Neurographic Capture Button */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-neonblue via-neonpink to-neonyellow rounded-full blur opacity-75" />
            <button className="relative w-full md:w-auto px-12 py-5 bg-black text-white text-lg font-bold rounded-full border border-white/10 hover:border-neonblue/50 transition-all">
              Begin Emotional Encoding
              <span className="absolute top-0 right-4 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonblue opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neonblue" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Data Nodes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-neonblue/20 border border-neonblue/30"
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </section>
  );
};
