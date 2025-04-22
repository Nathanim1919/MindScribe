import { motion } from 'framer-motion';
import { 
  FaBrain, 
  FaShieldAlt, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter,
  FaDiscord,
  FaRegLightbulb 
} from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";

export const FooterPage = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-neuralblack border-t border-white/10">
      {/* **Floating Cyber Orbs** */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-neonblue/10 to-neonpink/10 border border-white/5"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.2,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* **Main Footer Grid** */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* **Neuro-Branding** */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <FaBrain className="text-neonblue text-2xl" />
            <span className="text-2xl font-bold bg-gradient-to-r from-neonblue to-neonpink bg-clip-text text-transparent">
              MindScribe
            </span>
          </div>
          <p className="text-white/60 text-sm">
            The next-gen neurographic journal for memory preservation and cognitive enhancement.
          </p>
          
          {/* **Social Links (Holo-Grid)** */}
          <div className="flex gap-4">
            {[
              { icon: <FaGithub className="text-xl" />, label: "GitHub" },
              { icon: <FaTwitter className="text-xl" />, label: "Twitter" },
              { icon: <FaLinkedin className="text-xl" />, label: "LinkedIn" },
              { icon: <FaDiscord className="text-xl" />, label: "Discord" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 hover:border-neonblue/50 transition-all"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* **Cyber Navigation** */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-6"
        >
          <h3 className="text-white font-bold text-lg tracking-wider">NEURAL PATHS</h3>
          <ul className="space-y-3">
            {['Journal', 'Memories', 'Analytics', 'AI Insights'].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 5 }}
                className="text-white/60 hover:text-neonblue cursor-pointer text-sm flex items-center gap-2 transition-all"
              >
                <span className="w-1 h-1 rounded-full bg-neonblue opacity-0 group-hover:opacity-100" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* **Quantum Features** */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h3 className="text-white font-bold text-lg tracking-wider">COGNITIVE TOOLS</h3>
          <ul className="space-y-3">
            {[
              { icon: <RiAiGenerate className="text-neonpink" />, text: 'AI Reflection' },
              { icon: <FaRegLightbulb className="text-neonyellow" />, text: 'Mind Maps' },
              { icon: <FaShieldAlt className="text-neonblue" />, text: 'Quantum Encryption' },
            ].map((tool, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 5 }}
                className="text-white/60 hover:text-white cursor-pointer text-sm flex items-center gap-3 transition-all"
              >
                <span className="text-lg">{tool.icon}</span>
                {tool.text}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* **Neuro-Newsletter** */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6"
        >
          <h3 className="text-white font-bold text-lg tracking-wider">JOIN THE HIVE</h3>
          <p className="text-white/60 text-sm">
            Subscribe for neural updates and early access to experimental features.
          </p>
          
          <motion.div className="flex gap-2">
            <input
              type="email"
              placeholder="Your neural address"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/80 placeholder-white/30 text-sm focus:outline-none focus:border-neonblue"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 bg-gradient-to-r from-neonblue to-neonpink text-black font-bold rounded-lg text-sm"
            >
              Transmit
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* **Quantum Encryption Badge** */}
      <div className="relative z-10 border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <FaShieldAlt className="text-neonblue" />
            <span>All neural data secured with quantum encryption</span>
          </div>
          <div className="text-white/40 text-sm">
            © {new Date().getFullYear()} MindScribe Neurosystems. A product of the future.
          </div>
        </div>
      </div>
    </footer>
  );
};