import { motion } from 'framer-motion';

const AnimatedLoader = () => (
  <div className="relative w-24 h-24 mx-auto">
    {/* Outer ring */}
    <motion.div
      className="absolute inset-0 rounded-full border-4 border-blue-100"
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    />
    {/* Middle ring */}
    <motion.div
      className="absolute inset-2 rounded-full border-4 border-transparent border-t-blue-500 border-r-indigo-500"
      animate={{ rotate: -360 }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    />
    {/* Inner ring */}
    <motion.div
      className="absolute inset-5 rounded-full border-4 border-transparent border-t-cyan-400"
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
    />
    {/* Center dot */}
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="w-4 h-4 rounded-full bg-gradient-primary shadow-glow-sm" />
    </motion.div>
  </div>
);

export default AnimatedLoader;
