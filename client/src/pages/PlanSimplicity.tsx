import { motion } from 'framer-motion';
import { AiOutlineExperiment } from 'react-icons/ai';
import { FaBrain, FaShieldAlt } from 'react-icons/fa';

export const Plans = () => {
  return (
    <section className="relative w-[70%] mx-auto bg-dark-base z-999 min-h-screen overflow-hidden bg-neuralblack py-32 px-6">
      {/* Quantum Data Particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(48)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-neonblue/20 border border-neonblue/30"
            style={{
              width: `${Math.random() * 12 + 4}px`,
              height: `${Math.random() * 12 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 200],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Neural Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center mb-20"
        >
          <div className="text-neonpink font-mono text-lg tracking-widest">
            [ NEURAL ACCESS TIERS ]
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonblue to-neonpink">
              Upgrade Your
            </span>
            <br />
            <span>Mind Interface</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Select your cognitive enhancement level. All plans include quantum encryption.
          </p>
        </motion.div>

        {/* Neuro-Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-[70%] mx-auto">
          {/* Free Plan - Neural Basic */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-neuralpanel/50 border border-white/10 rounded-2xl p-4 backdrop-blur-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-neonblue/10 flex items-center justify-center">
                <FaBrain className="text-neonblue text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-white">Neural Basic</h3>
            </div>
            
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">Free</span>
              <span className="text-white/60 ml-2">/ lifetime</span>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                'Core neural recording',
                '2 memory fragments/day',
                'Basic cognitive patterns',
                'Standard encryption',
                'Community support',
                'Basic neuro-themes'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80">
                  <div className="w-5 h-5 rounded-full bg-neonblue/20 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-neonblue" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button className="w-full py-4 border border-white/20 rounded-xl text-white hover:border-neonblue transition-colors">
              Activate Basic Mode
            </button>
          </motion.div>

          {/* Pro Plan - Neuro Enhancer */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden border border-transparent rounded-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neonpink/30 to-neonblue/30 rounded-2xl blur-xl opacity-30" />
            <div className="relative bg-neuralpanel/70 border border-white/10 rounded-2xl p-8 backdrop-blur-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-neonpink/10 flex items-center justify-center">
                    <AiOutlineExperiment className="text-neonpink text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Neuro Enhancer</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-neonpink/10 text-neonpink text-sm">
                  Recommended
                </div>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">$4.99</span>
                <span className="text-white/60 ml-2">/ neural cycle</span>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  'Unlimited memory storage',
                  'Advanced pattern analysis',
                  'Quantum encryption+',
                  'Priority neural processing',
                  'Experimental features',
                  'Custom neuro-themes',
                  'Temporal journaling',
                  'Cognitive boosters'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-white">
                    <div className="w-5 h-5 rounded-full bg-neonpink/20 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-neonpink" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 bg-gradient-to-r border cursor-pointer from-neonpink to-neonblue rounded-xl text-white font-bold hover:shadow-lg hover:shadow-neonpink/20 transition-all">
                Upgrade Neural Capacity
              </button>
            </div>
          </motion.div>
        </div>

        {/* Neural Encryption Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex items-center justify-center gap-3 text-white/50"
        >
          <FaShieldAlt className="text-neonblue" />
          <span className="font-mono text-sm">All plans include end-to-end quantum encryption</span>
        </motion.div>
      </div>
    </section>
  );
};